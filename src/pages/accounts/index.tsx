import AccountCreate from '@/components/accounts/create';
import AccountsList from '@/components/accounts/list';
import DefaultLayout from '@/layouts/default';

const AccountsPage = () => {
  return (
    <DefaultLayout>
      <div className={'flex flex-row flex-nowrap gap-4'}>
        <div className={'grow-0 w-[28em] border p-4 rounded'}>
          <AccountCreate />
        </div>
        <div className={'grow flex flex-col gap-4 border p-4 rounded'}>
          <AccountsList />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AccountsPage;
