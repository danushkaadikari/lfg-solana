use std::mem::size_of;
use anchor_lang::prelude::*;

use crate::{states::*, constants::*};

#[derive(Accounts)]
pub struct SetQuoteToken<'info> {
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
    pub quote_token_mint: AccountInfo<'info>,

    #[account(
        init_if_needed,
        seeds = [QUOTE_STATE_SEED, quote_token_mint.key().as_ref()],
        bump,
        payer = authority,
        space = 8 + size_of::<QuoteTokenState>(),
    )]
    pub quote_token_state: Account<'info, QuoteTokenState>,

    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

pub fn handle(ctx: Context<SetQuoteToken>, allowed: bool) -> Result<()> {
    let accts = ctx.accounts;

    accts.quote_token_state.quote_token = accts.quote_token_mint.key();
    accts.quote_token_state.allowed = allowed;

    Ok(())
}