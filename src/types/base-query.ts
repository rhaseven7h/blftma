import { AxiosRequestConfig } from 'axios';

export interface BaseQueryArgs {
  url: string;
  method: AxiosRequestConfig['method'];
  data?: AxiosRequestConfig['data'];
  params?: AxiosRequestConfig['params'];
  headers?: AxiosRequestConfig['headers'];
  responseType?: AxiosRequestConfig['responseType'];
}

export interface BaseQueryError {
  status?: number;
  data: unknown;
}
