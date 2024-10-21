import { axiosBaseQuery } from '@/store/services/base-query';
import {
  Account,
  Accounts,
  CreateAccountMutationArgs,
  DeleteAccountMutationArgs,
  GetAccountQueryArgs,
  UpdateAccountMutationArgs
} from '@/types/accounts';
import { ApiError } from '@/types/application';
import { BaseQueryArgs } from '@/types/base-query';
import { Projects } from '@/types/projects';
import { createApi } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
const blftmaApi = createApi({
  reducerPath: 'blftmaApi',
  baseQuery: axiosBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Accounts', 'Projects', 'Projects2'],
  endpoints: (builder) => ({
    getAccounts: builder.query<Accounts | ApiError, void>({
      query: () =>
        ({
          url: `/accounts`,
          method: 'GET'
        }) as BaseQueryArgs,
      providesTags: ['Accounts']
    }),

    getAccount: builder.query<Account | ApiError, GetAccountQueryArgs>({
      query: ({ id }: GetAccountQueryArgs) =>
        ({
          url: `/accounts/${id}`,
          method: 'GET'
        }) as BaseQueryArgs
    }),

    createAccount: builder.mutation<Account | ApiError, CreateAccountMutationArgs>({
      query: (body) => ({
        url: `/accounts`,
        method: 'POST',
        data: body
      }),
      invalidatesTags: ['Accounts']
    }),

    updateAccount: builder.mutation<Account | ApiError, UpdateAccountMutationArgs>({
      query: ({ id, name }: UpdateAccountMutationArgs) => ({
        url: `/accounts/${id}`,
        method: 'PATCH',
        data: {
          name
        }
      }),
      invalidatesTags: ['Accounts']
    }),

    deleteAccount: builder.mutation<ApiError | void, DeleteAccountMutationArgs>({
      query: ({ id }: DeleteAccountMutationArgs) => ({
        url: `/accounts/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Accounts']
    }),

    getProjects: builder.query<Projects | ApiError, void>({
      query: () =>
        ({
          url: `/projects`,
          method: 'GET'
        }) as BaseQueryArgs,
      providesTags: ['Projects']
    })
  })
});

export default blftmaApi;
