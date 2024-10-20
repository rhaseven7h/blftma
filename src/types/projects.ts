import { Account } from '@/types/accounts';
import { ApiError } from '@/types/application';

export type Project = {
  id: number;
  account: Account;
  account_id: number;
  name: string;
  owner_name: string;
  owner_email: string;
};

export type Projects = Project[];

export type ProjectsResult = {
  projects: Projects;
  total: number;
  page: number;
  size: number;
};

export type ProjectsResponse = ProjectsResult | ApiError;

export interface GetProjectsQueryArgs {
  q?: string;
  page?: number;
  size?: number;
}

export type ProjectAddFormValues = {
  name: string;
  account_id: number;
  owner_name: string;
  owner_email: string;
};
