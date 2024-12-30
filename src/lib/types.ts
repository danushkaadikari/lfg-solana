export interface APRLength {
  length?: string;
  value: string;
}

export interface BondPrice {
  title: string;
  value: string;
}

export interface StakingPoolProps {
  id: string;
  title: string;
  description: string;
  aprLengths: APRLength[];
  userStakedBalance: string;
}
