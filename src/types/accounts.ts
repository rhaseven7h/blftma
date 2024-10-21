export type Account = {
  id: number;
  name: string;
};

export type Accounts = Account[];

export type AccountFormValues = Omit<Account, 'id'>;

export type GetAccountQueryArgs = Pick<Account, 'id'>;

export type CreateAccountMutationArgs = Omit<Account, 'id'>;

export type UpdateAccountMutationArgs = Account;

export type DeleteAccountMutationArgs = Pick<Account, 'id'>;
