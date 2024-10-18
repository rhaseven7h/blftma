import AccountCreate from '@/components/accounts/create';
import AccountsList from '@/components/accounts/list';
import DefaultLayout from '@/layouts/default';
import { setSelectedMenuItem } from '@/store/features/applicationSlice';
import NavbarMenuItems from '@/types/application';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

const AccountsPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSelectedMenuItem(NavbarMenuItems.ACCOUNTS));
  }, [dispatch]);
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
