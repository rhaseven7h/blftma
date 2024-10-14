import { Prisma, PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

type Account = {
  id: number;
  name: string;
};

type Accounts = Account[];

const prisma = new PrismaClient();

const getAccounts = async (req: NextApiRequest, res: NextApiResponse<Accounts | Error>) => {
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

  try {
    const accounts = await prisma.accounts.findMany({
      where: {
        name: {
          contains: validatedParams.data.q,
          mode: 'insensitive'
        }
      },
      skip: (validatedParams.data.page - 1) * validatedParams.data.size,
      take: validatedParams.data.size
    });
    res.status(200).json(accounts);
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

export default async function handler(req: NextApiRequest, res: NextApiResponse<Accounts | Account | Error>) {
  switch (req.method) {
    case 'GET':
      return getAccounts(req, res);
    case 'POST':
      return createAccount(req, res);
    default:
      res.status(405).json({
        name: 'method-not-allowed',
        message: 'Method Not Allowed'
      });
  }
}
