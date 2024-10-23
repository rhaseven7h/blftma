import { Account } from '@/types/accounts';
import { ApiError } from '@/types/application';
import { getErrorMessage } from '@/util/api';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

const prisma = new PrismaClient();

const getAccountHandler = async (req: NextApiRequest, res: NextApiResponse<Account | ApiError>) => {
  const params = z
    .object({
      id: z.coerce.number().int().min(1)
    })
    .safeParse(req.query);
  if (!params.success) {
    res.status(400).json({
      code: '7a298849-a05d-4f80-b475-cc7c018a5573',
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
        code: '350d8a87-233d-4dd6-aa72-372f72458138',
        message: 'Account not found'
      });
      return;
    }
    res.status(200).json(account);
  } catch (error) {
    const message = getErrorMessage(error);
    res.status(500).json({ code: '1cb2bea8-1c28-4edb-9b89-ed2f091bbfea', message } as ApiError);
  }
};

const updateAccountHandler = async (req: NextApiRequest, res: NextApiResponse<Account | ApiError>) => {
  const params = z
    .object({
      id: z.coerce.number().int().min(1)
    })
    .safeParse(req.query);
  if (!params.success) {
    res.status(400).json({
      code: 'bba630c5-c859-408e-889f-c4c6a0854b79',
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
      code: '20e4842f-7d49-491e-9a07-9407297937ed',
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
  } catch (error) {
    const message = getErrorMessage(error);
    res.status(500).json({ code: '0259fea2-5f3d-48c9-9900-fbd3d49f986f', message } as ApiError);
  }
};

const deleteAccountHandler = async (req: NextApiRequest, res: NextApiResponse<Account | ApiError>) => {
  const params = z
    .object({
      id: z.coerce.number().int().min(1)
    })
    .safeParse(req.query);
  if (!params.success) {
    res.status(400).json({
      code: '4ddbc4be-7690-4045-9ad6-052c58c5f4b6',
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
  } catch (error) {
    const message = getErrorMessage(error);
    res.status(500).json({ code: '7f53fc80-b1e9-4da8-977b-d8f803625bd0', message } as ApiError);
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Account | ApiError>) {
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
      res.status(405).json({
        code: '2ae41a55-521d-47e8-8c27-7ab35df979ba',
        name: 'method-not-allowed',
        message: `Method ${req.method} Not Allowed`
      });
  }
}
