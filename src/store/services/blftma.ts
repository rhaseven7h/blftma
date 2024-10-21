import { axiosBaseQuery } from '@/store/services/base-query';
import {
  Account,
  AccountsResult,
  DeleteAccountMutationArgs,
  GetAccountQueryArgs,
  GetAccountsQueryArgs,
  UpdateAccountMutationArgs
} from '@/types/accounts';
import { BaseQueryArgs } from '@/types/base-query';
import { GetProjectsQueryArgs, Projects, ProjectsResult } from '@/types/projects';
import { createApi } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
const blftmaApi = createApi({
  reducerPath: 'blftmaApi',
  baseQuery: axiosBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Accounts', 'Projects', 'Projects2'],
  endpoints: (builder) => ({
    getAccounts: builder.query<AccountsResult, GetAccountsQueryArgs>({
      query: ({ q, page, size }: GetAccountsQueryArgs) =>
        ({
          url: `/accounts`,
          params: { q, page, size },
          method: 'GET'
        }) as BaseQueryArgs,
      providesTags: ['Accounts']
    }),

    createAccount: builder.mutation<Account, Omit<Account, 'id'>>({
      query: (body) => ({
        url: `/accounts`,
        method: 'POST',
        data: body
      }),
      invalidatesTags: ['Accounts']
    }),

    getAccount: builder.query<AccountsResult, GetAccountQueryArgs>({
      query: ({ id }: GetAccountQueryArgs) =>
        ({
          url: `/accounts/${id}`,
          method: 'GET'
        }) as BaseQueryArgs
    }),

    updateAccount: builder.mutation<Account, UpdateAccountMutationArgs>({
      query: ({ id, name }: UpdateAccountMutationArgs) => ({
        url: `/accounts/${id}`,
        method: 'PATCH',
        data: {
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
    }),

    getProjects: builder.query<ProjectsResult, GetProjectsQueryArgs>({
      query: ({ q, page, size }: GetProjectsQueryArgs) =>
        ({
          url: `/projects`,
          params: { q, page, size },
          method: 'GET'
        }) as BaseQueryArgs,
      providesTags: ['Projects']
    }),

    getProjects2: builder.query<Projects, void>({
      query: () =>
        ({
          url: `/projects`,
          method: 'GET'
        }) as BaseQueryArgs,
      providesTags: ['Projects2']
    })
  })
});

export default blftmaApi;
