import DefaultLayout from '@/layouts/default';
import { setSelectedMenuItem } from '@/store/features/applicationSlice';
import NavbarMenuItems from '@/types/application';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default function Index() {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const t = i18n.getFixedT(null, null, 'pages.index');
  useEffect(() => {
    dispatch(setSelectedMenuItem(NavbarMenuItems.HOME));
  }, [dispatch]);
  return (
    <DefaultLayout>
      <div className={'container mx-auto p-4'}>
        <div className={'prose max-w-none'}>
          <h1>{t('title')}</h1>
          <p>{t('description')}</p>
          <p>Pages Links</p>
          <ul>
            <li>
              <Link
                href={'/accounts'}
                className={'text-teal-700'}>
                Go to Accounts management
              </Link>
            </li>
            <li>
              <Link
                href={'/projects'}
                className={'text-teal-700'}>
                Go to Projects management
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </DefaultLayout>
  );
}
