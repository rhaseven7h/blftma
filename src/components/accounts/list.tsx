import blftmaApi from '@/store/services/blftma';
import { Button, Pagination, Table, theme } from 'flowbite-react';
import { useState } from 'react';
import { TbEdit, TbTrash } from 'react-icons/tb';
import { twMerge } from 'tailwind-merge';

const PAGE_SIZE = 3;

const AccountsList = () => {
  const [page, setPage] = useState(1);
  const accountsResult = blftmaApi.useGetAccountsQuery({ page: page, size: PAGE_SIZE });

  if (accountsResult.isLoading || accountsResult.isUninitialized || accountsResult.isFetching) {
    return <div className={'container mx-auto py-16 bold text-center uppercase'}>Loading...</div>;
  }

  if (accountsResult.error) {
    return <div>Accounts Error: {accountsResult.error.toString()}</div>;
  }

  if (!accountsResult.data) {
    return <div>No Accounts data</div>;
  }

  const totalPages = Math.ceil(accountsResult.data.total / PAGE_SIZE);
  const currentPage = accountsResult.data.page;

  const accountsTableTheme = {
    ...theme.table,
    root: {
      ...theme.table.root,
      wrapper: twMerge(theme.table.root.wrapper, 'border border-neutral-300 rounded-lg pb-2')
    },
    head: {
      ...theme.table.head,
      base: twMerge(theme.table.head.base, 'text-base'),
      cell: {
        ...theme.table.head.cell,
        base: twMerge(theme.table.head.cell.base, 'bg-neutral-200')
      }
    }
  };

  const onPageChangeHandler = (page: number) => {
    setPage(page);
  };

  return (
    <>
      <h2 className={'text-lg font-bold pb-4'}>Accounts</h2>
      <Table striped hoverable theme={accountsTableTheme}>
        <Table.Head>
          <Table.HeadCell>Account Name</Table.HeadCell>
          <Table.HeadCell className={'text-right'}>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {accountsResult.data.accounts.map((account) => (
            <Table.Row key={account.id}>
              <Table.Cell className={''}>{account.name}</Table.Cell>
              <Table.Cell className={'flex flex-row flex-nowrap gap-2 justify-end'}>
                <Button color={'info'} size={'xs'} onClick={() => console.log('Edit Account.')}>
                  <div className={'flex flex-row flex-nowrap gap-1 items-center'}>
                    <TbEdit />
                    <span>Edit</span>
                  </div>
                </Button>
                <Button color={'failure'} size={'xs'} onClick={() => console.log('Delete Account.')}>
                  <div className={'flex flex-row flex-nowrap gap-1 items-center'}>
                    <TbTrash />
                    <span>Delete</span>
                  </div>
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <div className={'flex flex-row justify-center'}>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChangeHandler} />
      </div>
    </>
  );
};

export default AccountsList;
