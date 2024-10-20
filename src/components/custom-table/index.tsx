import { theme } from 'flowbite-react';
import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

// noinspection JSUnusedGlobalSymbols
export const CustomTable = {
  Foot: ({ children }: PropsWithChildren) => (
    <tfoot className={'text-xs uppercase text-gray-700 dark:text-gray-400 bg-blue-50'}>{children}</tfoot>
  ),
  FootRow: ({ children }: PropsWithChildren) => <tr className={''}>{children}</tr>,
  FootCell: ({ children, head }: PropsWithChildren<{ head?: boolean }>) =>
    head ? (
      <th
        scope='row'
        className='px-6 py-3 group-first/head:first:rounded-bl-lg group-first/head:last:rounded-br-lg dark:bg-gray-700'>
        {children}
      </th>
    ) : (
      <td
        className={
          'px-6 py-3 group-first/head:first:rounded-bl-lg group-first/head:last:rounded-br-lg dark:bg-gray-700'
        }>
        {children}
      </td>
    )
};

export const customTableTheme = {
  head: {
    cell: {
      base: twMerge(theme.table.head.cell.base, 'bg-blue-50')
    }
  },
  row: {
    hovered: twMerge(theme.table.row.hovered, 'hover:bg-teal-50 dark:hover:bg-teal-800'),
    striped: twMerge(theme.table.row.striped, 'odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700')
  }
};
