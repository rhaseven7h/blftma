export type Account = {
  id: number;
  name: string;
};

export type Accounts = Account[];

export type AccountsResult = {
  accounts: Accounts;
  total: number;
  page: number;
  size: number;
};

export type AccountsResponse = AccountsResult | Error;

export interface GetAccountsQueryArgs {
  q?: string;
  page?: number;
  size?: number;
}
