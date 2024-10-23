import { MAX_FETCH_LIST_LIMIT } from '@/constants/common';
import { ApiError } from '@/types/application';
import { Projects } from '@/types/projects';
import { getErrorMessage } from '@/util/api';
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
    res.status(200).json(projects as Projects);
  } catch (error) {
    const message = getErrorMessage(error);
    res.status(500).json({ code: 'bcd92ebd-142d-47db-b660-7e4e1f6215ff', message });
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
        code: '27ea6c98-7fc5-4009-8329-53d5ebae6dec',
        message: `Method ${req.method} Not Allowed`
      });
  }
};

export default handler;
