import ProjectsList from '@/components/projects';
import DefaultLayout from '@/layouts/default';
import { setSelectedMenuItem } from '@/store/features/applicationSlice';
import NavbarMenuItems from '@/types/application';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common']))
    }
  };
}

const ProjectsListPage = () => {
  const dispatch = useDispatch();
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
