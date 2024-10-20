import { Project } from '@/types/projects';
import { createColumnHelper } from '@tanstack/react-table';
import { Button } from 'flowbite-react';
import Link from 'next/link';

const columnHelper = createColumnHelper<Project>();

export const projectListColumns = [
  columnHelper.accessor('account.name', {
    id: 'account.name',
    cell: (info) => <strong>{info.getValue()}</strong>,
    header: 'Account',
    footer: 'Account'
  }),
  columnHelper.accessor('name', {
    id: 'name',
    cell: (info) => <strong>{info.getValue()}</strong>,
    header: 'Name',
    footer: 'Name'
  }),
  columnHelper.accessor('owner_name', {
    id: 'owner_name',
    cell: (info) => <strong>{info.getValue()}</strong>,
    header: 'Owner Name',
    footer: 'Owner Name'
  }),
  columnHelper.accessor('owner_email', {
    id: 'owner_email',
    cell: (info) => <Link href={'mailto:' + info.getValue()}>{info.getValue()}</Link>,
    header: 'Owner Email',
    footer: 'Owner Email'
  }),
  columnHelper.display({
    id: 'actions',
    cell: (info) => (
      <div className={'flex flex-row flex-nowrap gap-2'}>
        <Button
          size={'xs'}
          color={'info'}
          onClick={() => console.log(`Edit project ${info.row.original.id}`)}>
          Edit
        </Button>
        <Button
          size={'xs'}
          color={'failure'}
          onClick={() => console.log(`Delete project ${info.row.original.id}`)}>
          Delete
        </Button>
      </div>
    ),
    header: 'Actions',
    footer: 'Actions'
  })
];
