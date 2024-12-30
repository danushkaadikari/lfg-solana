use anchor_lang::prelude::*;

pub mod constants;
pub mod states;
pub mod instructions;
pub mod error;

use instructions::*;

declare_id!("H2xY4yJwNUyePDCNNxFvNgPjCmdqRWVsD775qSZxL3tG");

#[program]
pub mod solana_lfg {
    use super::*;

    pub fn initialize(
        ctx: Context<Initialize>,
        percent: u16,
        vesting_time: u32
    ) -> Result<()> {
        initialize::handle(ctx, percent, vesting_time)
    }

    pub fn set_authority(ctx: Context<SetAuthority>) -> Result<()> {
        set_authority::handle(ctx)
    }

    pub fn set_base_token(ctx: Context<SetBaseToken>) -> Result<()> {
        set_base_token::handle(ctx)
    }

    pub fn set_percent(ctx: Context<SetPercent>, new_percent: u16) -> Result<()> {
        set_percent::handle(ctx, new_percent)
    }

    pub fn set_vesting_time(ctx: Context<SetVestingTime>, new_vesting_time: u32) -> Result<()> {
        set_vesting_time::handle(ctx, new_vesting_time)
    }

    pub fn set_price_feed(ctx: Context<SetPriceFeed>) -> Result<()> {
        set_price_feed::handle(ctx)
    }

    pub fn set_vault(ctx: Context<SetVault>, locked: bool) -> Result<()> {
        set_vault::handle(ctx, locked)
    }

    pub fn set_quote_token(ctx: Context<SetQuoteToken>, allowed: bool) -> Result<()> {
        set_quote_token::handle(ctx, allowed)
    }

    pub fn recover_token(ctx: Context<RecoverToken>, amount: u64) -> Result<()> {
        recover_token::handle(ctx, amount)
    }

    pub fn recover_sol(ctx: Context<RecoverSol>, amount: u64) -> Result<()> {
        recover_sol::handle(ctx, amount)
    }

    pub fn bond_sol(ctx: Context<BondSol>, index: u16, amount: u64) -> Result<()> {
        bond_sol::handle(ctx, index, amount)
    }

    pub fn bond_token(ctx: Context<BondToken>, index: u16, amount: u64) -> Result<()> {
        bond_token::handle(ctx, index, amount)
    }

    pub fn redeem(ctx: Context<Redeem>, index: u16) -> Result<()> {
        redeem::handle(ctx, index)
    }

    pub fn deposit_base_token(ctx: Context<DepositBaseToken>, amount: u64) -> Result<()> {
        deposit_base_token::handle(ctx, amount)
    }
}
