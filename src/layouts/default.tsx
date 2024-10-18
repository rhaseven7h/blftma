import { RootState } from '@/store/store';
import NavbarMenuItems from '@/types/application';
import { Navbar, theme } from 'flowbite-react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { PropsWithChildren } from 'react';
import { TbBinaryTree2 } from 'react-icons/tb';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { twMerge } from 'tailwind-merge';

import 'react-toastify/dist/ReactToastify.css';

interface DefaultLayoutProps {
  className?: string;
  mainClassName?: string;
  footerClassName?: string;
}

const DefaultLayout = ({
  children,
  className,
  mainClassName,
  footerClassName,
}: PropsWithChildren<DefaultLayoutProps>) => {
  const navbarSelectedMenuItem = useSelector((state: RootState) => state.application.selectedMenuItem);
  const { t } = useTranslation('common');
  const navbarTheme = {
    root: {
      base: twMerge(theme.navbar.root.base, 'bg-neutral-50 shadow-md border-b border-b-neutral-200'),
    },
    link: {
      base: twMerge(theme.navbar.link.base, 'text-base uppercase'),
    },
  };
  return (
    <>
      <ToastContainer />
      <Navbar
        border
        theme={navbarTheme}>
        <Navbar.Brand
          as={Link}
          href={'/'}>
          <div className={'flex flex-row flex-nowrap items-center'}>
            <TbBinaryTree2 className={'text-4xl rotate-[225deg] text-red-500'} />
            <div className={'flex flex-row gap-8 ml-4 items-center'}>
              <span className='text-4xl font-black text-red-700'>BLF/TMA</span>
              <div className={'flex flex-col justify-start text-[0.5em] italic text-neutral-500'}>
                <span className=''>Technical Maturity Assessments Management Application</span>
                <span className=''>Part of Wizeline&apos;s Business Logic Framework</span>
              </div>
            </div>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className={''}>
          <Navbar.Link
            as={Link}
            href='/'
            active={navbarSelectedMenuItem === NavbarMenuItems.HOME}>
            Home
          </Navbar.Link>
          <Navbar.Link
            as={Link}
            href='/accounts'
            active={navbarSelectedMenuItem === NavbarMenuItems.ACCOUNTS}>
            Accounts
          </Navbar.Link>
          <Navbar.Link
            as={Link}
            href='/projects'
            active={navbarSelectedMenuItem === NavbarMenuItems.PROJECTS}>
            Projects
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
      <div className={twMerge('container mx-auto flex flex-col flex-nowrap gap-4 my-8', className)}>
        <main className={twMerge('flex flex-col flex-nowrap gap-4', mainClassName)}>{children}</main>
        <footer className={twMerge('border-t border-t-neutral-200 py-4 mt-4', footerClassName)}>
          <span
            className={'text-sm text-neutral-500 italic'}
            dangerouslySetInnerHTML={{
              __html: t('general.copyright'),
            }}
          />
        </footer>
      </div>
    </>
  );
};

export default DefaultLayout;
