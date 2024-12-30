use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token::{transfer, Mint, Token, TokenAccount, Transfer},
};

use crate::{states::*, constants::*};

#[derive(Accounts)]
#[instruction(index: u16)]
pub struct Redeem<'info> {
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
        mut,
        address = global_state.base_token,
    )]
    pub base_token_mint: Box<Account<'info, Mint>>,

    #[account(
        mut,
        associated_token::mint = base_token_mint,
        associated_token::authority = vault_state,
    )]
    pub vault_base_token_account: Box<Account<'info, TokenAccount>>,
    
    #[account(
        init_if_needed,
        payer = user,
        associated_token::mint = base_token_mint,
        associated_token::authority = user,
    )]
    pub user_base_token_account: Box<Account<'info, TokenAccount>>,

    #[account(
        mut,
        seeds = [USER_STATE_SEED, user.key().as_ref()],
        bump,
        constraint = index < user_state.total_bonded,
    )]
    pub user_state: Account<'info, UserState>,

    #[account(
        mut,
        seeds = [BOND_STATE_SEED, user.key().as_ref(), &index.to_le_bytes()],
        bump,
    )]
    pub bond_state: Account<'info, BondState>,

    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

pub fn handle(ctx: Context<Redeem>, index: u16) -> Result<()> {
    let accts = ctx.accounts;
    let cur_timestamp = Clock::get()?.unix_timestamp as u32;
    
    // calculate percent vested for
    let seconds_since_last = cur_timestamp - accts.bond_state.last_time;
    let percent_vested = if accts.bond_state.vesting > 0 {
        seconds_since_last.checked_mul(10000).unwrap().checked_div(accts.bond_state.vesting).unwrap()
    } else {
        0
    };

    // update payout
    let mut payout = accts.bond_state.payout;
    if percent_vested >= 10000 {    // if fully vested
        accts.bond_state.vesting = 0;
    } else {
        payout = payout.checked_mul(percent_vested as u64).unwrap().checked_div(10000).unwrap();
        accts.bond_state.vesting -= seconds_since_last;
    }
    accts.bond_state.payout -= payout;
    accts.bond_state.last_time = cur_timestamp;

    msg!("Transferring base tokens to user ...");
    let signer_seeds = [VAULT_SEED, &[ctx.bumps.vault_state]];
    transfer(
        CpiContext::new_with_signer(
            accts.token_program.to_account_info(),
            Transfer {
                from: accts.vault_base_token_account.to_account_info(),
                to: accts.user_base_token_account.to_account_info(),
                authority: accts.vault_state.to_account_info(),
            },
            &[&signer_seeds[..]],
        ),
        payout,
    )?;

    msg!("Redeemed base tokens successfully.");

    Ok(())
}