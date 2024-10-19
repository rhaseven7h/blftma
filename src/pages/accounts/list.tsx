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

const AccountsListPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSelectedMenuItem(NavbarMenuItems.ACCOUNTS));
  }, [dispatch]);
  return (
    <DefaultLayout>
      <div className={'flex flex-col flex-nowrap gap-4 w-full'}>
        <div className={'grow p-4 w-full'}>
          <AccountsList />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AccountsListPage;
