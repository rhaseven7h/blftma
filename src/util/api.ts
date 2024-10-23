import { Prisma } from '@prisma/client';

export const getErrorMessage = (error: unknown): string => {
  switch (true) {
    case error instanceof Prisma.PrismaClientKnownRequestError:
      const e1 = error as Prisma.PrismaClientKnownRequestError;
      return `known request error ${e1.code}: ${e1.meta?.['code']}  ${e1.meta?.['message']}`;
    case error instanceof Prisma.PrismaClientInitializationError:
      const e2 = error as Prisma.PrismaClientInitializationError;
      return `initialization error ${e2.errorCode}: ${e2.message}`;
    case error instanceof Prisma.PrismaClientRustPanicError:
    case error instanceof Prisma.PrismaClientValidationError:
    case error instanceof Prisma.PrismaClientUnknownRequestError:
    case error instanceof Error:
      return error.message;
    default:
      return JSON.stringify(error);
  }
};

export const getApiListRequestArgs = (q: string | undefined, page: number, size: number) => {
  const where = {
    where: {
      name: {
        contains: q
      }
    }
  };
  const paging = {
    take: size,
    skip: (page - 1) * size
  };
  return {
    list: {
      ...where,
      ...paging
    },
    count: where
  };
};
