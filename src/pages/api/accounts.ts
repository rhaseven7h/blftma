import { PrismaClient } from '@prisma/client';
import { noop } from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next';

type Account = {
  id: number;
  name: string;
};

type Accounts = Account[];

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse<Accounts>) {
  noop(req);
  const accounts = await prisma.accounts.findMany();
  res.status(200).json(accounts);
}
