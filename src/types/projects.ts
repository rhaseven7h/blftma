import { Account } from '@/types/accounts';

export type Project = {
  id: number;
  account: Account;
  account_id: number;
  name: string;
  owner_name: string;
  owner_email: string;
};

export type Projects = Project[];

export type ProjectFormValues = Omit<Project, 'id' | 'account'>;

export type GetProjectQueryArgs = Pick<Project, 'id'>;

export type CreateProjectMutationArgs = Omit<Project, 'id' | 'account'>;

export type UpdateProjectMutationArgs = Omit<Project, 'account'>;

export type DeleteProjectMutationArgs = Pick<Project, 'id'>;
