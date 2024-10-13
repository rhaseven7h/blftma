import { decrement, increment } from '@/store/features/counterSlice';
import blftmaApi from '@/store/services/blftma';
import pokemonApi from '@/store/services/pokemon';
import type { RootState } from '@/store/store';
import { Button, Table } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';

const EditIcon = () => (
  <svg
    className='w-[16px] h-[16px]'
    aria-hidden='true'
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    fill='currentColor'
    viewBox='0 0 24 24'
  >
    <path
      fill-rule='evenodd'
      d='M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z'
      clip-rule='evenodd'
    />
    <path
      fill-rule='evenodd'
      d='M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z'
      clip-rule='evenodd'
    />
  </svg>
);

const TrashIcon = () => (
  <svg
    className='w-[16px] h-[16px]'
    aria-hidden='true'
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    fill='currentColor'
    viewBox='0 0 24 24'
  >
    <path
      fill-rule='evenodd'
      d='M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z'
      clip-rule='evenodd'
    />
  </svg>
);

const AccountsPage = () => {
  const pokemonResult = pokemonApi.useGetPokemonByNameQuery('pikachu');
  const accountsResult = blftmaApi.useGetAccountsQuery();
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  if (
    pokemonResult.isLoading ||
    pokemonResult.isUninitialized ||
    pokemonResult.isFetching ||
    accountsResult.isLoading ||
    accountsResult.isUninitialized ||
    accountsResult.isFetching
  ) {
    return <div className={'container mx-auto py-16 bold text-center uppercase'}>Loading...</div>;
  }

  if (pokemonResult.error) {
    return <div>Pokemon Error: {pokemonResult.error.toString()}</div>;
  }

  if (accountsResult.error) {
    return <div>Accounts Error: {accountsResult.error.toString()}</div>;
  }

  if (!pokemonResult.data) {
    return <div>No Pokemon data</div>;
  }

  if (!accountsResult.data) {
    return <div>No Accounts data</div>;
  }

  return (
    <div className={'container mx-auto my-8'}>
      <div>
        <div className='prose max-w-none'>
          <h1 className={'mt-8 border-b pb-4 border-b-blue-300 text-blue-700 mb-4'}>Accounts</h1>
        </div>
        <div className={'grid grid-cols-2 gap-4'}>
          <Table striped hoverable className={'[&_th]:!text-base'}>
            <Table.Head>
              <Table.HeadCell>Account Name</Table.HeadCell>
              <Table.HeadCell className={'text-right'}>Actions</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {accountsResult.data.map((account) => (
                <Table.Row key={account.id}>
                  <Table.Cell className={''}>
                    {account.name} ({account.id})
                  </Table.Cell>
                  <Table.Cell className={'flex flex-row flex-nowrap gap-2 justify-end'}>
                    <Button color={'info'} size={'xs'} onClick={() => console.log('Edit Account.')}>
                      <div className={'flex flex-row flex-nowrap gap-1 items-center'}>
                        <EditIcon />
                        <span>Edit</span>
                      </div>
                    </Button>
                    <Button color={'failure'} size={'xs'} onClick={() => console.log('Delete Account.')}>
                      <div className={'flex flex-row flex-nowrap gap-1 items-center'}>
                        <TrashIcon />
                        <span>Delete</span>
                      </div>
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <div className={'grow p-2 border-green-900 border-2 rounded-lg bg-green-700 overflow-auto m-0'}>
            <pre className={'overflow-scroll m-0 p-4 max-h-[18em] bg-green-900 text-green-400'}>
              {JSON.stringify(pokemonResult.data, null, 2).slice(0, 1024)}
            </pre>
          </div>
        </div>
      </div>
      <div className={'prose max-w-none'}>
        <h1 className={'mt-8 border-b pb-4 border-b-blue-300 text-blue-700'}>React Toolkit Support</h1>
        <div className={'flex flex-row flex-nowrap gap-8'}>
          <div className={'grow'}>
            <div
              className={
                'text-center py-4 mb-4 border border-blue-500 rounded-xl bg-blue-50 text-xl font-bold text-blue-700'
              }
            >
              Count: {count}
            </div>
            <div className={'flex flex-row flex-nowrap gap-8 w-full'}>
              <Button className={'grow'} color={'success'} size={'xl'} onClick={() => dispatch(increment())}>
                Increment
              </Button>
              <Button className={'grow'} color={'failure'} size={'xl'} onClick={() => dispatch(decrement())}>
                Increment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountsPage;
