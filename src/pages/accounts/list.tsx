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
      <div className={'w-full'}>
        <AccountsList />
      </div>
    </DefaultLayout>
  );
};

export default AccountsListPage;
