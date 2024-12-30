use anchor_lang::prelude::*;
use solana_program::{program::invoke_signed, system_instruction};

use crate::{states::*, constants::*};

#[derive(Accounts)]
pub struct RecoverSol<'info> {
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
        constraint = vault_state.locked == false,
    )]
    pub vault_state: Account<'info, VaultState>,

    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

pub fn handle(ctx: Context<RecoverSol>, amount: u64) -> Result<()> {
    let accts = ctx.accounts;
    
    msg!("Transferring SOL to authority ...");

    let signer_seeds = [VAULT_SEED, &[ctx.bumps.vault_state]];
    invoke_signed(
        &system_instruction::transfer(
            &accts.vault_state.key(),
            &accts.authority.key(), 
            amount
        ),
        &[
            accts.vault_state.to_account_info().clone(),
            accts.authority.to_account_info().clone(),
            accts.system_program.to_account_info().clone(),
        ],
        &[&signer_seeds[..]],
    )?;

    msg!("SOL transferred successfully.");

    Ok(())
}