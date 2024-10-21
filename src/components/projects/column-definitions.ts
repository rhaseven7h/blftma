import { Project } from '@/types/projects';
import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper<Project>();

export const projectsListColumnsDefinitions = [
  columnHelper.accessor('account.name', {
    header: 'Account',
    cell: (cell) => cell.getValue(),
    footer: 'Account',
    sortingFn: 'alphanumeric',
    sortUndefined: 'first',
    enableSorting: true
  }),
  columnHelper.accessor('name', {
    header: 'Project Name',
    cell: (cell) => cell.getValue(),
    footer: 'Project Name',
    sortingFn: 'alphanumeric',
    sortUndefined: 'first',
    enableSorting: true
  }),
  columnHelper.accessor('owner_name', {
    header: 'Owner Name',
    cell: (cell) => cell.getValue(),
    footer: 'Owner Name',
    sortingFn: 'alphanumeric',
    sortUndefined: 'first',
    enableSorting: true
  }),
  columnHelper.accessor('owner_email', {
    header: 'Owner Email',
    cell: (cell) => cell.getValue(),
    footer: 'Owner Email',
    sortingFn: 'alphanumeric',
    sortUndefined: 'first',
    enableSorting: true
  })
];
