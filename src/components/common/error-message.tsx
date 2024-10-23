import { BaseQueryError } from '@/types/base-query';
import { getErrorMessage } from '@/util/api';
import { SerializedError } from '@reduxjs/toolkit';

export const ErrorMessage = ({ error }: { error: BaseQueryError | SerializedError }) => {
  return (
    <div className={'flex flex-col flex-nowrap gap-4'}>
      <div className={'prose max-w-none'}>
        <h1>Error occurred</h1>
        <p>{getErrorMessage(error)}</p>
      </div>
    </div>
  );
};
