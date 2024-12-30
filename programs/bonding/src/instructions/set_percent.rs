use anchor_lang::prelude::*;

use crate::{states::*, error::*, constants::*};

#[derive(Accounts)]
pub struct SetPercent<'info> {
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

    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

pub fn handle(ctx: Context<SetPercent>, new_percent: u16) -> Result<()> {
    let accts = ctx.accounts;
    require!(new_percent <= 10000, BondingError::OverDiscountPercent);

    accts.global_state.percent = new_percent;

    Ok(())
}