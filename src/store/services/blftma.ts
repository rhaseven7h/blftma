import { axiosBaseQuery } from '@/store/services/axios-base-query';
import { createApi } from '@reduxjs/toolkit/query/react';
import { noop } from 'lodash';

const urlPrefix = process.env.NODE_ENV === 'test' ? 'http://localhost:3000' : '';

const blftmaApi = createApi({
  reducerPath: 'blftmaApi',
  baseQuery: axiosBaseQuery({ baseUrl: urlPrefix + '/api' }),
  tagTypes: ['Accounts', 'Projects'],
  endpoints: (builder) => {
    noop(builder);
    return {};
  }
});

export default blftmaApi;
