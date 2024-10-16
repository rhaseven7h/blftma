import {
  Account,
  AccountsResult,
  DeleteAccountMutationArgs,
  GetAccountQueryArgs,
  GetAccountsQueryArgs,
  UpdateAccountMutationArgs
} from '@/types/accounts';
import { createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
const blftmaApi = createApi({
  reducerPath: 'blftmaApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Accounts'],
  endpoints: (builder) => ({
    getAccounts: builder.query<AccountsResult, GetAccountsQueryArgs>({
      query: ({ q, page, size }: GetAccountsQueryArgs) =>
        ({
          url: `/accounts`,
          params: { q, page, size },
          method: 'GET'
        }) as FetchArgs,
      providesTags: ['Accounts']
    }),

    createAccount: builder.mutation<Account, Omit<Account, 'id'>>({
      query: (body) => ({
        url: `/accounts`,
        method: 'POST',
        body
      }),
      invalidatesTags: ['Accounts']
    }),

    getAccount: builder.query<AccountsResult, GetAccountQueryArgs>({
      query: ({ id }: GetAccountQueryArgs) =>
        ({
          url: `/accounts/${id}`,
          method: 'GET'
        }) as FetchArgs
    }),

    updateAccount: builder.mutation<Account, UpdateAccountMutationArgs>({
      query: ({ id, name }: UpdateAccountMutationArgs) => ({
        url: `/accounts/${id}`,
        method: 'PATCH',
        body: {
          name
        }
      }),
      invalidatesTags: ['Accounts']
    }),

    deleteAccount: builder.mutation<Account, DeleteAccountMutationArgs>({
      query: ({ id }: DeleteAccountMutationArgs) => ({
        url: `/accounts/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Accounts']
    })
  })
});

export default blftmaApi;
