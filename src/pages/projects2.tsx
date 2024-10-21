import { ErrorMessage } from '@/components/common/error-message';
import { Loading } from '@/components/common/loading';
import { DEFAULT_PAGE_SIZE } from '@/constants/common';
import DefaultLayout from '@/layouts/default';
import blftmaApi from '@/store/services/blftma';
import { Project } from '@/types/projects';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';
import cn from 'classnames';
import { Dropdown, Pagination, Table } from 'flowbite-react';
import { range } from 'lodash';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { PropsWithChildren } from 'react';
import { TbSortAscending, TbSortDescending } from 'react-icons/tb';

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common']))
    }
  };
}

const Projects2Page = () => {
  const columnHelper = createColumnHelper<Project>();
  const projectsResult = blftmaApi.useGetProjects2Query();
  const table = useReactTable<Project>({
    columns: [
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
    ],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    data: projectsResult.data ?? [],
    rowCount: projectsResult.data?.length ?? 0,
    enableSorting: true,
    initialState: {
      pagination: {
        pageSize: DEFAULT_PAGE_SIZE,
        pageIndex: 0
      },
      sorting: []
    }
  });

  if (projectsResult.isLoading || projectsResult.isFetching || projectsResult.isUninitialized) {
    return <Loading />;
  }

  if (projectsResult.error) {
    return <ErrorMessage error={projectsResult.error} />;
  }

  const Table_Foot = ({ children }: PropsWithChildren) => (
    <tfoot className={'group/foot text-xs uppercase text-gray-700 dark:text-gray-400'}>{children}</tfoot>
  );

  const Table_FootRow = ({ children }: PropsWithChildren) => <tr>{children}</tr>;

  const Table_FootCell = ({ children }: PropsWithChildren) => (
    <th
      className={
        'bg-gray-50 px-6 py-3 group-first/head:first:rounded-bl-lg group-first/head:last:rounded-br-lg dark:bg-gray-700'
      }>
      {children}
    </th>
  );

  // noinspection DuplicatedCode
  return (
    <DefaultLayout>
      <div className={'prose max-w-none w-full'}>
        <div className={'flex flex-col flex-nowrap gap-4'}>
          <h1>Projects Page - Full Data Loading - Automatic Table</h1>
          <Table
            striped
            hoverable>
            <Table.Head>
              {table.getHeaderGroups().map((headerGroup) =>
                headerGroup.headers.map((header) => (
                  <Table.HeadCell key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={cn(
                          header.column.getCanSort() ? 'cursor-pointer select-none' : '',
                          'flex flex-row flex-nowrap gap-2 items-center'
                        )}
                        onClick={header.column.getToggleSortingHandler()}
                        title={
                          header.column.getCanSort()
                            ? header.column.getNextSortingOrder() === 'asc'
                              ? 'Sort ascending'
                              : header.column.getNextSortingOrder() === 'desc'
                                ? 'Sort descending'
                                : 'Clear sort'
                            : undefined
                        }>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: <TbSortAscending />,
                          desc: <TbSortDescending />
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </Table.HeadCell>
                ))
              )}
            </Table.Head>
            <Table.Body>
              {table.getRowModel().rows.map((row) => (
                <Table.Row key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <Table.Cell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
            <Table_Foot>
              {table.getFooterGroups().map((footerGroup) => (
                <Table_FootRow key={footerGroup.id}>
                  {footerGroup.headers.map((header) => (
                    <Table_FootCell key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.footer, header.getContext())}
                    </Table_FootCell>
                  ))}
                </Table_FootRow>
              ))}
            </Table_Foot>
          </Table>
          <div className={'not-prose flex flex-col gap-2 flex-nowrap items-center'}>
            <Pagination
              showIcons
              currentPage={table.getState().pagination.pageIndex + 1}
              totalPages={table.getPageCount()}
              onPageChange={(page: number) => table.setPageIndex(page - 1)}
            />
            <div>
              <span>Showing Projects </span>
              <span className={'font-bold'}>{table.getState().pagination.pageIndex * DEFAULT_PAGE_SIZE + 1}&nbsp;</span>
              <span> to </span>
              <span className={'font-bold'}>
                {Math.min(
                  table.getState().pagination.pageIndex * DEFAULT_PAGE_SIZE + DEFAULT_PAGE_SIZE,
                  table.getRowCount()
                )}
              </span>
            </div>
            <div className={'flex flex-row flex-nowrap gap-2 items-center'}>
              <span>Go to page</span>
              <Dropdown
                label={<span className={'font-bold'}>{table.getState().pagination.pageIndex + 1}</span>}
                dismissOnClick
                inline>
                {range(1, table.getPageCount() + 1).map((page) => (
                  <Dropdown.Item
                    key={page}
                    onClick={() => table.setPageIndex(page - 1)}>
                    {page}
                  </Dropdown.Item>
                ))}
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Projects2Page;
