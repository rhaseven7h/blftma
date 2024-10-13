import type { NextApiRequest, NextApiResponse } from 'next';

type Account = {
  id: number;
  name: string;
};

type Accounts = Account[];

export default function handler(req: NextApiRequest, res: NextApiResponse<Accounts>) {
  res.status(200).json([]);
}
