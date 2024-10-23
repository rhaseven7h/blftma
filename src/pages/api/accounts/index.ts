import { MAX_FETCH_LIST_LIMIT } from '@/constants/common';
import { Account, Accounts } from '@/types/accounts';
import { ApiError } from '@/types/application';
import { getErrorMessage } from '@/util/api';
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

const prisma = new PrismaClient();

const getAccountsHandler = async (_req: NextApiRequest, res: NextApiResponse<Accounts | ApiError>) => {
  try {
    const accounts = await prisma.accounts.findMany({
      take: MAX_FETCH_LIST_LIMIT
    });
    res.status(200).json(accounts);
  } catch (error) {
    const message = getErrorMessage(error);
    res.status(500).json({ code: 'b323ae3d-9874-4675-b292-56b58871849f', message } as ApiError);
  }
};

const createAccountHandler = async (req: NextApiRequest, res: NextApiResponse<Account | ApiError>) => {
  const createAccountSchema = z.object({
    name: z.string().min(1).max(128).trim()
  });
  const validatedBody = createAccountSchema.safeParse(req.body);

  if (!validatedBody.success) {
    res.status(400).json({
      code: '2902c293-9b62-4964-8791-3ba6042c042a',
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
  } catch (error) {
    const message = getErrorMessage(error);
    res.status(500).json({ code: '577cb235-63dd-42c1-aef3-54551c96c687', message } as ApiError);
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Accounts | Account | ApiError>) => {
  switch (req.method) {
    case 'GET':
      await getAccountsHandler(req, res);
      break;
    case 'POST':
      await createAccountHandler(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({
        code: '45d2c1fa-9516-4486-8280-caf0cacf7c9e',
        name: 'method-not-allowed',
        message: `Method ${req.method} Not Allowed`
      });
  }
};

export default handler;
