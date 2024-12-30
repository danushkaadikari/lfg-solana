use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token::{transfer, Mint, Token, TokenAccount, Transfer},
};

use crate::{states::*, constants::*};

#[derive(Accounts)]
#[instruction(index: u16)]
pub struct DepositBaseToken<'info> {
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
        associated_token::authority = user,
    )]
    pub user_base_token_account: Box<Account<'info, TokenAccount>>,

    #[account(
        init_if_needed,
        payer = user,
        associated_token::mint = base_token_mint,
        associated_token::authority = vault_state,
    )]
    pub vault_base_token_account: Box<Account<'info, TokenAccount>>,

    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

pub fn handle(ctx: Context<DepositBaseToken>, amount: u64) -> Result<()> {
    let accts = ctx.accounts;
    
    msg!("Transferring base tokens to vault ...");
    transfer(
        CpiContext::new(
            accts.token_program.to_account_info(),
            Transfer {
                from: accts.user_base_token_account.to_account_info(),
                to: accts.vault_base_token_account.to_account_info(),
                authority: accts.user.to_account_info(),
            },
        ),
        amount,
    )?;

    msg!("Deposited base tokens successfully.");

    Ok(())
}