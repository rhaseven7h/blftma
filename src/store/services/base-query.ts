import axiosInstance from '@/store/services/axios-instance';
import { BaseQueryArgs, BaseQueryError } from '@/types/base-query';
import { BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { AxiosError, AxiosRequestConfig } from 'axios';

export const axiosBaseQuery = (
  { baseUrl }: { baseUrl: string }
): BaseQueryFn<BaseQueryArgs, unknown, BaseQueryError> => {
  return async ({ url, method, data, params, headers }: AxiosRequestConfig) => {
    try {
      const result = await axiosInstance.request({
        url: baseUrl + url,
        method,
        data,
        params,
        headers
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message
        }
      };
    }
  };
};
