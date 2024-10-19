import ProjectsList from '@/components/projects/list';
import DefaultLayout from '@/layouts/default';
import { setSelectedMenuItem } from '@/store/features/applicationSlice';
import NavbarMenuItems from '@/types/application';
import { useTranslation } from 'next-i18next';
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

const ProjectsListPage = () => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const t = i18n.getFixedT(null, null, 'pages.projects.list');
  useEffect(() => {
    dispatch(setSelectedMenuItem(NavbarMenuItems.PROJECTS));
  }, [dispatch]);

  return (
    <DefaultLayout>
      <div className={'w-full'}>
        <ProjectsList />
      </div>
    </DefaultLayout>
  );
};

export default ProjectsListPage;
