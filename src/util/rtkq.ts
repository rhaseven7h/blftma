import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { toast } from 'react-toastify';

const getSerializedErrorInnerMessage = (
  sError: SerializedError,
): {
  name: string;
  message: string;
} => {
  return {
    name: sError.name ?? 'Error',
    message: sError.message ?? 'Unknown error',
  };
};

const getFetchBaseQueryErrorInnerMessage = (
  fbqError: FetchBaseQueryError,
): {
  status: string;
  message: string;
} => {
  switch (fbqError.status) {
    case 'FETCH_ERROR':
    case 'PARSING_ERROR':
    case 'TIMEOUT_ERROR':
    case 'CUSTOM_ERROR':
      return { status: fbqError.status, message: fbqError.error };
    default:
      const { name: customName, message: customMessage } = fbqError.data as {
        name: string;
        message: string;
      };
      return {
        status: fbqError.status.toString(),
        message: `(${customName}) ${customMessage}`,
      };
  }
};

export const toastRTKQResponse = (
  successMessage: string,
  failureMessage: string,
  error?: SerializedError | FetchBaseQueryError,
) => {
  if (!error) {
    toast(successMessage, { type: 'success' });
  } else {
    const errorDetails = getRTKQErrorMessage(error, failureMessage);
    const errorMessage = `${failureMessage} ${errorDetails}`;
    toast(errorMessage, { type: 'error' });
  }
};

export const toastGenericError = (baseMessage: string, error: unknown) => {
  toast(`${baseMessage} ${JSON.stringify(error)}.`, {
    type: 'error',
  });
};

export const getRTKQErrorMessage = (error: SerializedError | FetchBaseQueryError, baseMsg: string): string => {
  const fbqError = error as FetchBaseQueryError;
  const sError = error as SerializedError;
  if (fbqError.status) {
    const { status, message } = getFetchBaseQueryErrorInnerMessage(fbqError);
    return `${baseMsg} (${status}) ${message}.`;
  } else if (sError.message) {
    const { name, message } = getSerializedErrorInnerMessage(sError);
    return `${baseMsg} ${name}: ${message}.`;
  } else {
    return `${baseMsg} Unknown error.`;
  }
};
