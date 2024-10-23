import { MAX_FETCH_LIST_LIMIT } from '@/constants/common';
import { ApiError } from '@/types/application';
import { Projects } from '@/types/projects';
import { getApiErrorElements } from '@/util/api';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const getProjectsHandler = async (_req: NextApiRequest, res: NextApiResponse<Projects | ApiError>) => {
  try {
    const projects = await prisma.projects.findMany({
      take: MAX_FETCH_LIST_LIMIT,
      include: {
        account: true
      }
    });
    // res.status(200).json(projects as Projects);
    res.status(404).json({ code: 'someErrorData', name: 'someErrorName', message: 'someErrorMessage' } as ApiError);
  } catch (error) {
    const { name, message } = getApiErrorElements(error);
    res.status(500).json({ code: 'b760cd19-bd7d-4b33-bb26-561bf7b642d0', name, message } as ApiError);
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Projects | ApiError>) => {
  switch (req.method) {
    case 'GET':
      await getProjectsHandler(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).json({
        code: '304bc181-37b7-4450-afbd-6b717a3b2656',
        name: 'method-not-allowed',
        message: `Method ${req.method} Not Allowed`
      });
  }
};

export default handler;
