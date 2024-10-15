import { Account, Accounts, AccountsResponse } from '@/types/accounts';
import { Prisma, PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

const prisma = new PrismaClient();

const getAccounts = async (req: NextApiRequest, res: NextApiResponse<AccountsResponse>) => {
  const getAccountsSchema = z.object({
    q: z.string().min(3).max(100).optional(),
    page: z.coerce.number().min(1).default(1),
    size: z.coerce.number().min(1).max(1000).default(10)
  });
  const validatedParams = getAccountsSchema.safeParse(req.query);

  if (!validatedParams.success) {
    res.status(400).json({
      name: 'invalid-parameters',
      message: validatedParams.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join(', ')
    });
    return;
  }

  let accounts: Accounts = [];
  let total: number = -1;

  try {
    accounts = await prisma.accounts.findMany({
      where: {
        name: {
          contains: validatedParams.data.q,
          mode: 'insensitive'
        }
      },
      orderBy: {
        name: 'asc'
      },
      skip: (validatedParams.data.page - 1) * validatedParams.data.size,
      take: validatedParams.data.size
    });

    total = await prisma.accounts.count({
      where: {
        name: {
          contains: validatedParams.data.q,
          mode: 'insensitive'
        }
      }
    });

    const result = {
      accounts,
      total,
      page: validatedParams.data.page,
      size: validatedParams.data.size
    };

    res.status(200).json(result);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      switch (e.code) {
        default:
          res.status(500).json({
            name: 'prisma-error',
            message: `${e.code}: ${e.message}`
          });
          break;
      }
    } else {
      res.status(500).json({
        name: 'internal-server-error',
        message: 'An unexpected error occurred'
      });
    }
  }
};

const createAccount = async (req: NextApiRequest, res: NextApiResponse<Account | Error>) => {
  const createAccountSchema = z.object({
    name: z.string().min(1).max(128).trim()
  });
  const validatedBody = createAccountSchema.safeParse(req.body);

  if (!validatedBody.success) {
    res.status(400).json({
      name: 'invalid-parameters',
      message: validatedBody.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join(', ')
    });
    return;
  }

  try {
    const account = await prisma.accounts.create({
      data: {
        name: validatedBody.data.name
      }
    });
    res.status(201).json(account);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      switch (e.code) {
        case 'P2002':
          res.status(400).json({
            name: 'already-exists',
            message: 'An account with the same name already exists'
          });
          break;
        default:
          res.status(500).json({
            name: 'prisma-error',
            message: `${e.code}: ${e.message}`
          });
          break;
      }
    } else {
      res.status(500).json({
        name: 'internal-server-error',
        message: 'An unexpected error occurred'
      });
    }
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<AccountsResponse | Account>) {
  switch (req.method) {
    case 'GET':
      await getAccounts(req, res);
      break;
    case 'POST':
      await createAccount(req, res);
      break;
    default:
      res.status(405).json({
        name: 'method-not-allowed',
        message: 'Method Not Allowed'
      });
  }
}
