import { createColumnHelper, flexRender, getCoreRowModel, TableOptions, useReactTable } from '@tanstack/react-table';
import { Table } from 'flowbite-react';
import { useMemo, useState } from 'react';

type User = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
  status: string;
};

const sourceData: User[] = [
  {
    firstName: 'Tanner',
    lastName: 'Linsley',
    age: 33,
    visits: 100,
    progress: 50,
    status: 'Married'
  },
  {
    firstName: 'Kevin',
    lastName: 'Vandy',
    age: 27,
    visits: 200,
    progress: 100,
    status: 'Single'
  }
];

const columnHelper = createColumnHelper<User>();

const sourceColumns = [
  columnHelper.accessor('firstName', {
    id: 'firstName',
    cell: (info) => info.getValue(),
    header: 'First Name',
    footer: 'First Name'
  }),
  columnHelper.accessor('lastName', {
    id: 'lastName',
    cell: (info) => info.getValue(),
    header: 'Last Name',
    footer: 'Last Name'
  }),
  columnHelper.accessor('age', {
    id: 'age',
    cell: (info) => info.getValue(),
    header: 'Age',
    footer: 'Age'
  }),
  columnHelper.accessor('visits', {
    id: 'visits',
    cell: (info) => info.getValue(),
    header: 'Visits',
    footer: 'Visits'
  }),
  columnHelper.accessor('progress', {
    id: 'progress',
    cell: (info) => info.getValue(),
    header: 'Progress',
    footer: 'Progress'
  }),
  columnHelper.accessor('status', {
    id: 'status',
    cell: (info) => info.getValue(),
    header: 'Status',
    footer: 'Status'
  })
];

const ProjectsList = () => {
  const columns = useMemo(() => sourceColumns, []);
  const [data] = useState<User[]>(sourceData);
  const coreRowModel = getCoreRowModel<User>();
  const options: TableOptions<User> = {
    columns,
    data,
    getCoreRowModel: coreRowModel
  };
  const table = useReactTable(options);

  return (
    <div className={'w-full max-w-none prose'}>
      <h1>Projects List</h1>
      <Table>
        <Table.Head>
          {table
            .getHeaderGroups()
            .map((headerGroup) =>
              headerGroup.headers.map((header) => (
                <Table.HeadCell key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </Table.HeadCell>
              ))
            )}
        </Table.Head>
      </Table>
    </div>
  );
};

export default ProjectsList;
