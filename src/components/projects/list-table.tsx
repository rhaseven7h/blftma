import { ErrorMessage } from '@/components/common/error-message';
import { Loading } from '@/components/common/loading';
import { Table_Foot, Table_FootCell, Table_FootRow } from '@/components/common/table-footer';
import { projectsListColumnsDefinitions } from '@/components/projects/column-definitions';
import { DEFAULT_PAGE_SIZE } from '@/constants/common';
import blftmaApi from '@/store/services/blftma';
import { Project } from '@/types/projects';
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';
import cn from 'classnames';
import { Pagination, Select, Table } from 'flowbite-react';
import { range } from 'lodash';
import { TbSortAscending, TbSortDescending } from 'react-icons/tb';

const ProjectsListTable = () => {
  const projectsResult = blftmaApi.useGetProjectsQuery();
  const table = useReactTable<Project>({
    columns: projectsListColumnsDefinitions,
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

  return (
    <>
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
          <Select
            value={table.getState().pagination.pageIndex}
            onChange={(e) => {
              table.setPageIndex(parseInt(e.target.value));
            }}>
            {range(table.getPageCount()).map((page) => (
              <option
                key={page}
                value={page}>
                {page + 1}
              </option>
            ))}
          </Select>
        </div>
      </div>
    </>
  );
};

export default ProjectsListTable;
