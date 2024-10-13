import { decrement, increment } from '@/store/features/counterSlice';
import blftmaApi from '@/store/services/blftma';
import pokemonApi from '@/store/services/pokemon';
import type { RootState } from '@/store/store';
import { Button } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';

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
    return <div>Loading...</div>;
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

  console.log('accountsResult.data', accountsResult.data);

  return (
    <div className={'container mx-auto my-8'}>
      <div className={'prose max-w-none'}>
        <h1 className={'border-b pb-4 border-b-blue-300 text-blue-700'}>Accounts</h1>
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
          <div className={'grow p-2 border-green-900 border-2 rounded-lg bg-green-700 overflow-auto m-0'}>
            <pre className={'overflow-scroll m-0 p-4 max-h-[18em] bg-green-900 text-green-400'}>
              {JSON.stringify(pokemonResult.data, null, 2).slice(0, 1024)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountsPage;
