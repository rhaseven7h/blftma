import { ApiError } from '@/types/application';
import { BaseQueryError } from '@/types/base-query';
import { Prisma } from '@prisma/client';
import { SerializedError } from '@reduxjs/toolkit';

export const getApiErrorElements = (error: unknown): { name: string; message: string } => {
  switch (true) {
    case error instanceof Prisma.PrismaClientKnownRequestError:
      return { name: 'service known error', message: error.message };
    case error instanceof Prisma.PrismaClientInitializationError:
      return { name: 'service initialization error', message: error.message };
    case error instanceof Prisma.PrismaClientValidationError:
      return { name: 'service validation error', message: error.message };
    case error instanceof Prisma.PrismaClientRustPanicError:
      return { name: 'service rust panic error', message: error.message };
    case error instanceof Prisma.PrismaClientUnknownRequestError:
      return { name: 'service unknown request error', message: error.message };
    case error instanceof Error:
      return { name: 'service error', message: error.message };
    default:
      return { name: 'internal server error', message: JSON.stringify(error) };
  }
};

interface getApiListRequestArgsProps {
  q: string | undefined;
  page: number;
  size: number;
  sort?: string[];
  include: { [key: string]: boolean };
}

export const getApiListRequestArgs = ({ q, page, size, sort, include }: getApiListRequestArgsProps) => {
  const orderBy = (sort ?? []).map((s) => {
    const [field, order] = s.split(':');
    if (field.includes('.')) {
      const [relation, subField] = field.split('.');
      return {
        [relation]: {
          [subField]: order
        }
      };
    } else {
      return {
        [field]: order
      };
    }
  });
  const count = {
    where: {
      name: {
        contains: q
      }
    }
  };
  const list = {
    ...count,
    orderBy,
    include,
    take: size,
    skip: (page - 1) * size
  };
  return {
    list,
    count
  };
};

export const getApiErrorMessage = (error: BaseQueryError | SerializedError): string => {
  if ('status' in error) {
    return (error.data as ApiError).message;
  } else if ('name' in error) {
    return (error as SerializedError).message ?? 'empty error message';
  } else {
    return `unindentified error: ${JSON.stringify(error)}`;
  }
};
