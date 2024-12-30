use anchor_lang::prelude::*;

use crate::{states::*, constants::*};

#[derive(Accounts)]
pub struct SetVestingTime<'info> {
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

pub fn handle(ctx: Context<SetVestingTime>, new_vesting_time: u32) -> Result<()> {
    let accts = ctx.accounts;
    
    accts.global_state.vesting_time = new_vesting_time;

    Ok(())
}