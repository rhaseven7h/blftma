import { ApiError } from '@/types/application';
import { ProjectsResponse } from '@/types/projects';
import { getApiErrorElements, getApiListRequestArgs } from '@/util/api';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

const prisma = new PrismaClient();

const projectsListHandler = async (req: NextApiRequest, res: NextApiResponse<ProjectsResponse>) => {
  // Parameters validation
  const params = z
    .object({
      q: z.string().min(3).max(100).optional(),
      page: z.coerce.number().min(1).default(1),
      size: z.coerce.number().min(1).max(1000).default(10)
    })
    .safeParse(req.query);
  if (!params.success) {
    res.status(400).json({
      code: '0f38d537-1d77-405b-ae25-9e5da8eaaeb9',
      name: 'invalid parameters',
      message: params.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join(', ')
    } as ApiError);
    return;
  }
  const { q, page, size } = params.data;

  try {
    // Fetch data
    const { list, count } = getApiListRequestArgs(q, page, size);
    const total = await prisma.projects.count(count);
    const projects = await prisma.projects.findMany({
      ...list,
      include: {
        account: true
      }
    });
    // Return data
    res.status(200).json({ projects, page, size, total } as ProjectsResponse);
  } catch (error) {
    // Handle errors
    const { name, message } = getApiErrorElements(error);
    res.status(500).json({ code: '73e2eb92-a295-49c9-9c35-2d28c274021e', name, message } as ApiError);
  }
};

const handler = (req: NextApiRequest, res: NextApiResponse<ProjectsResponse>) => {
  switch (req.method) {
    case 'GET':
      return projectsListHandler(req, res);
    default:
      return res.status(405).end();
  }
};

export default handler;