use std::mem::size_of;
use anchor_lang::prelude::*;
use anchor_spl::{
    token::{self, Token, TokenAccount, Mint, Transfer},
    associated_token::AssociatedToken,
};
use amm_anchor::SwapBaseIn;

use crate::{states::*, error::*, constants::*};

#[derive(Accounts)]
#[instruction(index: u16)]
pub struct BondToken<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        mut,
        seeds = [GLOBAL_STATE_SEED, global_state.authority.as_ref()],
        bump,
        constraint = global_state.is_initialized == true,
    )]
    pub global_state: Account<'info, GlobalState>,

    #[account(
        mut,
        seeds = [VAULT_SEED],
        bump,
    )]
    pub vault_state: Account<'info, VaultState>,

    /// CHECK: We're reading data from this chainlink feed account
    pub quote_token_mint: Account<'info, Mint>,

    #[account(
        mut,
        seeds = [QUOTE_STATE_SEED, quote_token_mint.key().as_ref()],
        bump,
        constraint = quote_token_state.allowed == true
    )]
    pub quote_token_state: Account<'info, QuoteTokenState>,

    #[account(
        mut,
        associated_token::mint = quote_token_mint,
        associated_token::authority = user,
    )]
    pub user_quote_token_account: Account<'info, TokenAccount>,

    #[account(
        init_if_needed,
        payer = user,
        token::mint = quote_token_mint,
        token::authority = vault_state,
    )]
    pub vault_quote_token_account: Account<'info, TokenAccount>,

    #[account(
        init_if_needed,
        seeds = [USER_STATE_SEED, user.key().as_ref()],
        bump,
        payer = user,
        space = 8 + size_of::<UserState>(),
    )]
    pub user_state: Account<'info, UserState>,

    #[account(
        init,
        seeds = [BOND_STATE_SEED, user.key().as_ref(), &index.to_le_bytes()],
        bump,
        payer = user,
        space = 8 + size_of::<BondState>(),
    )]
    pub bond_state: Account<'info, BondState>,

    /// CHECK: We're reading data from this chainlink feed account
    pub wsol_token_mint: Account<'info, Mint>,

    #[account(
        init_if_needed,
        payer = user,
        token::mint = wsol_token_mint,
        token::authority = vault_state,
    )]
    pub vault_wsol_account: Box<Account<'info, TokenAccount>>, 

    /// CHECK: We're reading data from this chainlink feed account
    pub pool_id: AccountInfo<'info>,    // SOL-LFG raydium pool

    #[account(mut)]
    pub pool_base_vault_account: Account<'info, TokenAccount>,

    #[account(mut)]
    pub pool_quote_vault_account: Account<'info, TokenAccount>,

    #[account(
        mut,
        address = global_state.price_feed,
    )]
    /// CHECK: We're reading data from this chainlink feed account
    pub pyth_account: AccountInfo<'info>,

    // Raydium Swap Accounts
    /// CHECK: Safe. amm program
    pub amm_program: AccountInfo<'info>,
    /// CHECK: Safe. amm Account
    #[account(mut)]
    pub amm: AccountInfo<'info>,
    /// CHECK: Safe. Amm authority Account
    #[account(
        seeds = [b"amm authority"],
        bump,
    )]
    pub amm_authority: AccountInfo<'info>,
    /// CHECK: Safe. amm open_orders Account
    #[account(mut)]
    pub amm_open_orders: AccountInfo<'info>,
    /// CHECK: Safe. amm_coin_vault Amm Account to swap FROM or To,
    #[account(mut)]
    pub amm_coin_vault: AccountInfo<'info>,
    /// CHECK: Safe. amm_pc_vault Amm Account to swap FROM or To,
    #[account(mut)]
    pub amm_pc_vault: AccountInfo<'info>,
    /// CHECK: Safe.OpenBook program id
    pub market_program: AccountInfo<'info>,
    /// CHECK: Safe. OpenBook market Account. OpenBook program is the owner.
    #[account(mut)]
    pub market: AccountInfo<'info>,
    /// CHECK: Safe. bids Account
    #[account(mut)]
    pub market_bids: AccountInfo<'info>,
    /// CHECK: Safe. asks Account
    #[account(mut)]
    pub market_asks: AccountInfo<'info>,
    /// CHECK: Safe. event_q Account
    #[account(mut)]
    pub market_event_queue: AccountInfo<'info>,
    /// CHECK: Safe. coin_vault Account
    #[account(mut)]
    pub market_coin_vault: AccountInfo<'info>,
    /// CHECK: Safe. pc_vault Account
    #[account(mut)]
    pub market_pc_vault: AccountInfo<'info>,
    /// CHECK: Safe. vault_signer Account
    #[account(mut)]
    pub market_vault_signer: AccountInfo<'info>,

    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

pub fn handle(ctx: Context<BondToken>, index: u16, amount: u64) -> Result<()> {
    let accts = ctx.accounts;
    require!(index == accts.user_state.total_bonded, BondingError::InvalidBondIndex);
    
    msg!("Transferring quote token to vault ...");
    token::transfer(
        CpiContext::new(
            accts.token_program.to_account_info(),
            Transfer {
                from: accts.user_quote_token_account.to_account_info(),
                to: accts.vault_quote_token_account.to_account_info(),
                authority: accts.user.to_account_info(),
            },
        ),
        amount,
    )?;

    let pyth_price_info = &accts.pyth_account;
    let pyth_price_data = &pyth_price_info.try_borrow_data()?;
    let pyth_price = pyth_client::cast::<pyth_client::Price>(pyth_price_data);
    let agg_price = pyth_price.agg.price as u64;
    msg!("sol price = {}", agg_price);
    let sol_amount;
    if accts.quote_token_mint.key() == Pubkey::try_from(USDC_ADDRESS).unwrap() || accts.quote_token_mint.key() == Pubkey::try_from(USDT_ADDRESS).unwrap() {
        sol_amount = (amount as u128)
            .checked_mul((10 as u128).pow(PRICE_FEED_DECIMAL)).unwrap()
            .checked_mul((10 as u128).pow(SOL_DECIMAL)).unwrap()
            .checked_div((10 as u128).pow(USDC_DECIMAL)).unwrap()
            .checked_div(agg_price as u128).unwrap() as u64;
    } else {
        let wsol_balance_before = accts.vault_wsol_account.amount;    
        let swap_base_in_accounts = SwapBaseIn {
            amm: accts.amm.clone(),
            amm_authority: accts.amm_authority.clone(),
            amm_open_orders: accts.amm_open_orders.clone(),
            amm_coin_vault: accts.amm_coin_vault.clone(),
            amm_pc_vault: accts.amm_pc_vault.clone(),
            market_program: accts.market_program.clone(),
            market: accts.market.clone(),
            market_bids: accts.market_bids.clone(),
            market_asks: accts.market_asks.clone(),
            market_event_queue: accts.market_event_queue.clone(),
            market_coin_vault: accts.market_coin_vault.clone(),
            market_pc_vault: accts.market_pc_vault.clone(),
            market_vault_signer: accts.market_vault_signer.clone(),
            user_token_source: accts.vault_quote_token_account.to_account_info(),
            user_token_destination: accts.vault_wsol_account.to_account_info(),
            user_source_owner: accts.user.clone(),
            token_program: accts.token_program.clone(),
        };

        // Specify the program for the CPI call
        let swap_base_in_program = accts.amm_program.clone();

        // Create a CpiContext with the specified accounts and program
        let cpi_ctx = CpiContext::new(swap_base_in_program, swap_base_in_accounts);
        let _ = amm_anchor::swap_base_in(cpi_ctx, amount, 1);

        sol_amount = accts.vault_wsol_account.amount - wsol_balance_before;
    }

    let pool_data = &**accts.pool_id.try_borrow_data().unwrap();
    let pool_info = decode_pool_info(pool_data);
    require!(
        pool_info.base_mint == accts.global_state.base_token || 
        pool_info.quote_mint == accts.global_state.base_token,
        BondingError::InvalidPoolId
    );
    require!(pool_info.base_vault == accts.pool_base_vault_account.key(), BondingError::InvalidBaseVault);
    require!(pool_info.quote_vault == accts.pool_quote_vault_account.key(), BondingError::InvalidQuoteVault);
    
    let token_amount_from_pool = if pool_info.base_mint == accts.global_state.base_token {   // LFG
        (sol_amount as u128)
            .checked_mul(accts.pool_base_vault_account.amount as u128).unwrap()
            .checked_div(
                accts.pool_quote_vault_account.amount.checked_add(sol_amount).unwrap() as u128
            ).unwrap() as u64
    } else {
        (sol_amount as u128)
            .checked_mul(accts.pool_quote_vault_account.amount as u128).unwrap()
            .checked_div(
                accts.pool_base_vault_account.amount.checked_add(sol_amount).unwrap() as u128
            ).unwrap() as u64
    };
    let base_token_amount = token_amount_from_pool
        .checked_add(
            token_amount_from_pool
                .checked_mul(accts.global_state.percent as u64).unwrap()
                .checked_div(10000).unwrap()
        ).unwrap();

    // amount in usd
    let quote_amount_in_usd = (sol_amount as u128)
        .checked_mul(agg_price as u128).unwrap()
        .checked_div((10 as u128).pow(PRICE_FEED_DECIMAL)).unwrap() as u64;   // sol decimal

    accts.global_state.bonded_tokens += base_token_amount;

    accts.user_state.user = accts.user.key();
    accts.user_state.total_bonded += 1;
    accts.user_state.total_quote_amount_in_usd += quote_amount_in_usd;
    accts.user_state.total_payout += base_token_amount;

    let cur_timestamp = Clock::get()?.unix_timestamp as u32;
    accts.bond_state.user = accts.user.key();
    accts.bond_state.index = index;
    accts.bond_state.quote_token = accts.quote_token_mint.key();
    accts.bond_state.quote_amount = amount;
    accts.bond_state.quote_amount_in_usd = quote_amount_in_usd;
    accts.bond_state.payout = base_token_amount;
    accts.bond_state.vesting = accts.global_state.vesting_time;
    accts.bond_state.last_time = cur_timestamp;
    
    msg!("Bonding is done successfully!");
    
    Ok(())
}