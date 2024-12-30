use std::mem::size_of;
use anchor_lang::prelude::*;
use solana_program::{program::invoke, system_instruction};
use anchor_spl::{
    associated_token::AssociatedToken,
    token::{Token, TokenAccount},
};

use crate::{states::*, error::*, constants::*};

#[derive(Accounts)]
#[instruction(index: u16)]
pub struct BondSol<'info> {
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
    pub pool_id: AccountInfo<'info>,    // SOL-LFG raydium pool

    #[account(mut)]
    pub base_vault_account: Account<'info, TokenAccount>,

    #[account(mut)]
    pub quote_vault_account: Account<'info, TokenAccount>,

    #[account(
        mut,
        address = global_state.price_feed,
    )]
    /// CHECK: We're reading data from this chainlink feed account
    pub pyth_account: AccountInfo<'info>,

    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

pub fn handle(ctx: Context<BondSol>, index: u16, amount: u64) -> Result<()> {
    let accts = ctx.accounts;
    require!(index == accts.user_state.total_bonded, BondingError::InvalidBondIndex);
    
    msg!("Transferring SOL to vault ...");
    invoke(
        &system_instruction::transfer(
            &accts.user.key(),
            &accts.vault_state.key(),
            amount),
        &[
            accts.user.to_account_info().clone(),
            accts.vault_state.to_account_info().clone(),
            accts.system_program.to_account_info().clone(),
        ],
    )?;

    let pool_data = &**accts.pool_id.try_borrow_data().unwrap();
    let pool_info = decode_pool_info(pool_data);
    require!(
        pool_info.base_mint == accts.global_state.base_token || 
        pool_info.quote_mint == accts.global_state.base_token,
        BondingError::InvalidPoolId
    );
    require!(pool_info.base_vault == accts.base_vault_account.key(), BondingError::InvalidBaseVault);
    require!(pool_info.quote_vault == accts.quote_vault_account.key(), BondingError::InvalidQuoteVault);
    
    let token_amount_from_pool = if pool_info.base_mint == accts.global_state.base_token {   // LFG
        (amount as u128)
            .checked_mul(accts.base_vault_account.amount as u128).unwrap()
            .checked_div(
                accts.quote_vault_account.amount.checked_add(amount).unwrap() as u128
            ).unwrap() as u64
    } else {
        (amount as u128)
            .checked_mul(accts.quote_vault_account.amount as u128).unwrap()
            .checked_div(
                accts.base_vault_account.amount.checked_add(amount).unwrap() as u128
            ).unwrap() as u64
    };
    let base_token_amount = token_amount_from_pool
        .checked_add(
            token_amount_from_pool
                .checked_mul(accts.global_state.percent as u64).unwrap()
                .checked_div(10000).unwrap()
        ).unwrap();

    // amount in usd
    let pyth_price_info = &accts.pyth_account;
    let pyth_price_data = &pyth_price_info.try_borrow_data()?;
    let pyth_price = pyth_client::cast::<pyth_client::Price>(pyth_price_data);
    let agg_price = pyth_price.agg.price as u64;
    msg!("sol price = {}", agg_price);
    let quote_amount_in_usd = (amount as u128)
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
    accts.bond_state.quote_token = Pubkey::default();
    accts.bond_state.quote_amount = amount;
    accts.bond_state.quote_amount_in_usd = quote_amount_in_usd;
    accts.bond_state.payout = base_token_amount;
    accts.bond_state.vesting = accts.global_state.vesting_time;
    accts.bond_state.last_time = cur_timestamp;
    
    msg!("Bonding is done successfully!");
    
    Ok(())
}