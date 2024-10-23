import { ApiError } from '@/types/application';
import { BaseQueryError } from '@/types/base-query';
import { SerializedError } from '@reduxjs/toolkit';

interface SomeEntity<T> {
  data: T;
}

interface SomeApiError {
  error: SerializedError | BaseQueryError;
}

export type ApiErrorEntityPassthrough<T> = {
  entity?: T;
  error?: ApiError;
  passthrough?: unknown;
};

export const getApiErrorEntityPassthrough = <T>(
  result: SomeEntity<T> | SomeApiError | unknown
): ApiErrorEntityPassthrough<T> => {
  const asSomeEntity = result as SomeEntity<T>;
  const asSomeApiError = result as SomeApiError;
  if (!result || typeof result !== 'object') {
    return { passthrough: result };
  } else if ('data' in (asSomeEntity ?? {})) {
    return { entity: asSomeEntity.data as T };
  } else if ('code' in (asSomeApiError.error ?? {}) && 'message' in (asSomeApiError.error ?? {})) {
    return { error: asSomeApiError.error as ApiError };
  } else {
    return { passthrough: result };
  }
};
