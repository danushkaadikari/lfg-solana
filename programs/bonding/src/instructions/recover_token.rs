use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token::{transfer, Mint, Token, TokenAccount, Transfer},
};

use crate::{states::*, constants::*};

#[derive(Accounts)]
pub struct RecoverToken<'info> {
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

    /// CHECK: We're reading data from this chainlink feed account
    pub token_mint: Box<Account<'info, Mint>>,

    #[account(
        mut,
        associated_token::mint = token_mint,
        associated_token::authority = vault_state,
    )]
    pub vault_token_account: Box<Account<'info, TokenAccount>>,

    #[account(
        init_if_needed,
        payer = authority,
        associated_token::mint = token_mint,
        associated_token::authority = authority,
    )]
    pub authority_token_account: Box<Account<'info, TokenAccount>>,

    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

pub fn handle(ctx: Context<RecoverToken>, amount: u64) -> Result<()> {
    let accts = ctx.accounts;
    
    msg!("Transferring spl tokens to authority ...");

    let signer_seeds = [VAULT_SEED, &[ctx.bumps.vault_state]];
    transfer(
        CpiContext::new_with_signer(
            accts.token_program.to_account_info(),
            Transfer {
                from: accts.vault_token_account.to_account_info(),
                to: accts.authority_token_account.to_account_info(),
                authority: accts.vault_state.to_account_info(),
            },
            &[&signer_seeds[..]],
        ),
        amount,
    )?;

    msg!("Spl tokens transferred successfully.");

    Ok(())
}