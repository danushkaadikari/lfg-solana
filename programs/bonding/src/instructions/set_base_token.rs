use anchor_lang::prelude::*;

use crate::{states::*, constants::*};

#[derive(Accounts)]
pub struct SetBaseToken<'info> {
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

    /// CHECK: We're reading data from this chainlink feed account
    pub base_token_mint: AccountInfo<'info>,

    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

pub fn handle(ctx: Context<SetBaseToken>) -> Result<()> {
    let accts = ctx.accounts;

    accts.global_state.base_token = accts.base_token_mint.key();

    Ok(())
}