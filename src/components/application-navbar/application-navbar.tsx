import blftmaLogo from '@/assets/images/blftma-logo.svg';
import { Navbar } from 'flowbite-react';
import Link from 'next/link';

const ApplicationNavbar = () => {
  return (
    <Navbar
      className={'bg-neutral-50 dark:bg-neutral-900 rounded-none border-b shadow-sm'}
      fluid
      rounded>
      <Navbar.Brand
        as={Link}
        href='https://flowbite-react.com'>
        <img
          src={blftmaLogo}
          className='mr-3 h-6 rounded sm:h-9'
          alt='Flowbite React Logo'
        />
        <span className='self-center whitespace-nowrap text-xl font-semibold dark:text-white'>BLF/TMA Management</span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link
          href='#'
          active>
          Home
        </Navbar.Link>
        <Navbar.Link
          as={Link}
          href='#'>
          About
        </Navbar.Link>
        <Navbar.Link href='#'>Services</Navbar.Link>
        <Navbar.Link href='#'>Pricing</Navbar.Link>
        <Navbar.Link href='#'>Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default ApplicationNavbar;
