import { Account } from '@/types/accounts';
import { Prisma, PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

const prisma = new PrismaClient();

const getAccountHandler = async (req: NextApiRequest, res: NextApiResponse<Account | Error>) => {
  // noinspection DuplicatedCode
  const params = z
    .object({
      id: z.coerce.number().int().min(1)
    })
    .safeParse(req.query);
  if (!params.success) {
    res.status(400).json({
      name: 'invalid-parameters',
      message: params.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join(', ')
    });
    return;
  }
  const { id } = params.data;

  try {
    const account = await prisma.accounts.findUnique({
      where: {
        id
      }
    });
    if (!account) {
      res.status(404).json({
        name: 'not-found',
        message: 'Account not found'
      });
      return;
    }
    res.status(200).json(account);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(500).json({
        name: 'prisma-error',
        message: `${e.code}: ${e.message}`
      });
    } else {
      res.status(500).json({
        name: 'internal-server-error',
        message: 'An unexpected error occurred: ' + JSON.stringify(e)
      });
    }
  }
};

const updateAccountHandler = async (req: NextApiRequest, res: NextApiResponse<Account | Error>) => {
  // noinspection DuplicatedCode
  const params = z
    .object({
      id: z.coerce.number().int().min(1)
    })
    .safeParse(req.query);
  if (!params.success) {
    res.status(400).json({
      name: 'invalid-parameters',
      message: params.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join(', ')
    });
    return;
  }
  const { id } = params.data;

  const payload = z
    .object({
      name: z.string().min(3).max(128)
    })
    .safeParse(req.body);
  if (!payload.success) {
    res.status(400).json({
      name: 'invalid-payload',
      message: payload.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join(', ')
    });
    return;
  }
  const { name } = payload.data;

  try {
    const updatedAccount = await prisma.accounts.update({
      where: {
        id
      },
      data: {
        name
      }
    });
    res.status(200).json(updatedAccount);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(500).json({
        name: 'prisma-error',
        message: `${e.code}: ${e.message}`
      });
    } else {
      res.status(500).json({
        name: 'internal-server-error',
        message: 'An unexpected error occurred: ' + JSON.stringify(e)
      });
    }
  }
};

const deleteAccountHandler = async (req: NextApiRequest, res: NextApiResponse<Account | Error>) => {
  // noinspection DuplicatedCode
  const params = z
    .object({
      id: z.coerce.number().int().min(1)
    })
    .safeParse(req.query);
  if (!params.success) {
    res.status(400).json({
      name: 'invalid-parameters',
      message: params.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join(', ')
    });
    return;
  }

  const { id } = params.data;

  try {
    await prisma.accounts.delete({
      where: {
        id
      }
    });
    res.status(200).end();
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(500).json({
        name: 'prisma-error',
        message: `${e.code}: ${e.message}`
      });
    } else {
      res.status(500).json({
        name: 'internal-server-error',
        message: 'An unexpected error occurred: ' + JSON.stringify(e)
      });
    }
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Account | Error>) {
  switch (req.method) {
    case 'GET':
      await getAccountHandler(req, res);
      break;
    case 'PATCH':
      await updateAccountHandler(req, res);
      break;
    case 'DELETE':
      await deleteAccountHandler(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'PATCH', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
