import AccountCreate from '@/components/accounts/create';
import AccountsList from '@/components/accounts/list';
import DefaultLayout from '@/layouts/default';

const AccountsPage = () => {
  return (
    <DefaultLayout>
      <div className={'flex flex-row flex-nowrap gap-4'}>
        <AccountCreate />
        <AccountsList />
      </div>
    </DefaultLayout>
  );
};

export default AccountsPage;
