import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type Account = {
  id: number;
  name: string;
};

type Accounts = Account[];

// Define a service using a base URL and expected endpoints
const blftmaApi = createApi({
  reducerPath: 'blftmaApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getAccounts: builder.query<Accounts, void>({
      query: () => `/accounts`
    })
  })
});

export default blftmaApi;
