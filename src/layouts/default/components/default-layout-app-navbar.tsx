import NavbarMenuItems, { NavbarMenuItem } from '@/types/application';
import { Navbar, theme } from 'flowbite-react';
import Link from 'next/link';
import { TbBinaryTree2 } from 'react-icons/tb';
import { twMerge } from 'tailwind-merge';

export type DefaultLayoutAppNavBarProps = {
  navbarSelectedMenuItem: NavbarMenuItem;
  className?: string;
};

const DefaultLayoutAppNavBar = ({ navbarSelectedMenuItem, className }: DefaultLayoutAppNavBarProps) => {
  const navbarTheme = {
    root: {
      base: twMerge(theme.navbar.root.base, 'bg-neutral-50 border-b border-b-neutral-200'),
    },
    link: {
      base: twMerge(theme.navbar.link.base, 'text-base uppercase'),
    },
  };

  return (
    <Navbar
      border
      className={twMerge('fixed top-0 w-full z-50', className)}
      theme={navbarTheme}>
      <Navbar.Brand
        as={Link}
        href={'/'}>
        <div className={'flex flex-row flex-nowrap items-center'}>
          <TbBinaryTree2 className={'text-6xl rotate-[225deg] text-red-500'} />
          <div className={'flex flex-row gap-8 ml-4 items-center'}>
            <span className='text-6xl font-black text-red-700'>BLF/TMA</span>
            <div className={'flex flex-col justify-start text-[0.81em] italic text-neutral-500'}>
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
          href='/public'
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
  );
};

export default DefaultLayoutAppNavBar;
