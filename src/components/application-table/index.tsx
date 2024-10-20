import { CustomTable, customTableTheme } from '@/components/custom-table';
import { flexRender, Table as TanStackTable } from '@tanstack/react-table';
import { Table } from 'flowbite-react';

export type ApplicationTableProps<T> = {
  table: TanStackTable<T>;
};

const ApplicationTable = <T,>({ table }: ApplicationTableProps<T>) => {
  return (
    <Table
      theme={customTableTheme}
      hoverable
      striped>
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
      <Table.Body>
        {table.getRowModel().rows.map((row) => (
          <Table.Row key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <Table.Cell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
      <CustomTable.Foot>
        {table.getFooterGroups().map((footerGroup) => (
          <CustomTable.FootRow key={footerGroup.id}>
            {footerGroup.headers.map((header) => (
              <CustomTable.FootCell key={header.id}>
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.footer, header.getContext())}
              </CustomTable.FootCell>
            ))}
          </CustomTable.FootRow>
        ))}
      </CustomTable.Foot>
    </Table>
  );
};

export default ApplicationTable;
