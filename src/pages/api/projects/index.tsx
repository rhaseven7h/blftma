import { ApiError } from '@/types/application';
import { Projects, ProjectsResponse } from '@/types/projects';
import { getApiErrorElements } from '@/util/api';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const projectsListHandler = async (_req: NextApiRequest, res: NextApiResponse<Projects | ApiError>) => {
  try {
    const accounts = await prisma.projects.findMany({
      take: 1000,
      include: {
        account: true
      }
    });
    res.status(200).json(accounts as Projects);
  } catch (error) {
    const { name, message } = getApiErrorElements(error);
    res.status(500).json({ code: 'b760cd19-bd7d-4b33-bb26-561bf7b642d0', name, message } as ApiError);
  }
};

const handler = (req: NextApiRequest, res: NextApiResponse<ProjectsResponse | Projects>) => {
  switch (req.method) {
    case 'GET':
      return projectsListHandler(req, res);
    default:
      return res.status(405).end();
  }
};

export default handler;
