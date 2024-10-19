import DefaultLayoutAppFooter from '@/layouts/default/components/default-layout-app-footer';
import DefaultLayoutAppNavBar from '@/layouts/default/components/default-layout-app-navbar';
import DefaultLayoutAppSidebar from '@/layouts/default/components/default-layout-app-sidebar';
import { RootState } from '@/store/store';
import { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { twMerge } from 'tailwind-merge';

import 'react-toastify/dist/ReactToastify.css';

interface DefaultLayoutProps {
  className?: string;
  sidebarClassName?: string;
  mainClassName?: string;
  footerClassName?: string;
}

const DefaultLayout = ({
  children,
  className,
  sidebarClassName,
  mainClassName,
  footerClassName,
}: PropsWithChildren<DefaultLayoutProps>) => {
  const navbarSelectedMenuItem = useSelector((state: RootState) => state.application.selectedMenuItem);
  return (
    <>
      <ToastContainer />
      <DefaultLayoutAppNavBar
        navbarSelectedMenuItem={navbarSelectedMenuItem}
        className={sidebarClassName}
      />
      <div className={twMerge('flex flex-row flex-nowrap gap-4', className)}>
        <DefaultLayoutAppSidebar />
        <main className={twMerge('ml-[320px] mt-[82px] mb-[69px] w-full overflow-auto p-4', mainClassName)}>
          {children}
        </main>
      </div>
      <DefaultLayoutAppFooter className={footerClassName} />
    </>
  );
};

export default DefaultLayout;
