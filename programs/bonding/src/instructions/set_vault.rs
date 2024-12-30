use anchor_lang::prelude::*;

use crate::{states::*, constants::*};

#[derive(Accounts)]
pub struct SetVault<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        mut,
        seeds = [GLOBAL_STATE_SEED, authority.key().as_ref()],
        bump,
        has_one = authority,
        constraint = global_state.is_initialized == true,
    )]
    pub global_state: Account<'info, GlobalState>,

    #[account(
        mut,
        seeds = [VAULT_SEED],
        bump,
    )]
    pub vault_state: Account<'info, VaultState>,

    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

pub fn handle(ctx: Context<SetVault>, locked: bool) -> Result<()> {
    let accts = ctx.accounts;
    
    accts.vault_state.locked = locked;

    Ok(())
}