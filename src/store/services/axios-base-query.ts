import { axiosInstance } from '@/store/services/axios-instance';
import { BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { AxiosError, AxiosRequestConfig } from 'axios';

export const axiosBaseQuery = ({
  baseUrl
}: {
  baseUrl: string;
}): BaseQueryFn<AxiosRequestConfig, unknown, AxiosError> => {
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
        error: err
      };
    }
  };
};
