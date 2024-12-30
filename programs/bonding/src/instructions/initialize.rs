use std::mem::size_of;
use anchor_lang::prelude::*;

use crate::{states::*, error::*, constants::*};

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        init,
        seeds = [GLOBAL_STATE_SEED, authority.key().as_ref()],
        bump,
        payer = authority,
        space = 8 + size_of::<GlobalState>(),
    )]
    pub global_state: Account<'info, GlobalState>,

    #[account(
        init,
        seeds = [VAULT_SEED],
        bump,
        payer = authority,
        space = 8 + size_of::<VaultState>(),
    )]
    pub vault_state: Account<'info, VaultState>,

    /// CHECK: this should be checked with address in global_state
    pub base_token_mint: AccountInfo<'info>, // LFG

    /// CHECK: We're reading data from this chainlink feed account
    pub pyth_account: AccountInfo<'info>,

    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

pub fn handle(
    ctx: Context<Initialize>,
    percent: u16,
    vesting_time: u32
) -> Result<()> {
    let accts = ctx.accounts;
    require!(percent <= 10000, BondingError::OverDiscountPercent);

    accts.global_state.authority = accts.authority.key();
    accts.global_state.is_initialized = true;
    accts.global_state.base_token = accts.base_token_mint.key();
    accts.global_state.percent = percent;
    accts.global_state.vesting_time = vesting_time;
    accts.global_state.price_feed = accts.pyth_account.key();

    accts.vault_state.locked = false;

    msg!("Initializzed successfully.");

    Ok(())
}