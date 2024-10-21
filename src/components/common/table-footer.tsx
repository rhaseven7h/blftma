import { PropsWithChildren } from 'react';

export const Table_Foot = ({ children }: PropsWithChildren) => (
  <tfoot className={'group/foot text-xs uppercase text-gray-700 dark:text-gray-400'}>{children}</tfoot>
);

export const Table_FootRow = ({ children }: PropsWithChildren) => <tr>{children}</tr>;

export const Table_FootCell = ({ children }: PropsWithChildren) => (
  <th
    className={
      'bg-gray-50 px-6 py-3 group-first/head:first:rounded-bl-lg group-first/head:last:rounded-br-lg dark:bg-gray-700'
    }>
    {children}
  </th>
);
