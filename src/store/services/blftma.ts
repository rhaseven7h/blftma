import { Account, AccountsResult, GetAccountsQueryArgs } from '@/types/accounts';
import { createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
const blftmaApi = createApi({
  reducerPath: 'blftmaApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Account'],
  endpoints: (builder) => ({
    getAccounts: builder.query<AccountsResult, GetAccountsQueryArgs>({
      query: (queryParams: GetAccountsQueryArgs) => {
        return {
          url: `/accounts`,
          params: queryParams,
          method: 'GET'
        } as FetchArgs;
      },
      providesTags: ['Account']
    }),

    createAccount: builder.mutation<Account, Omit<Account, 'id'>>({
      query: (body) => ({
        url: `/accounts`,
        method: 'POST',
        body
      }),
      invalidatesTags: ['Account']
    })
  })
});

export default blftmaApi;
