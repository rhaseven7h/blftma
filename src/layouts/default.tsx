import { PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';
import { twMerge } from 'tailwind-merge';

import 'react-toastify/dist/ReactToastify.css';

interface DefaultLayoutProps {
  className?: string;
  headerClassName?: string;
  mainClassName?: string;
  footerClassName?: string;
}

const DefaultLayout = ({
  children,
  className,
  headerClassName,
  mainClassName,
  footerClassName
}: PropsWithChildren<DefaultLayoutProps>) => {
  return (
    <>
      <ToastContainer />
      <div className={twMerge('container mx-auto flex flex-col flex-nowrap gap-4 my-8', className)}>
        <header className={twMerge('p-8 border-b mb-4', headerClassName)}>
          <h1 className={'text-2xl font-bold uppercase'}>Business Leads Framework</h1>
          <p className={'text-sm italic text-neutral-500'}>Technical Maturity Assessments</p>
        </header>
        <main className={twMerge('flex flex-col flex-nowrap gap-4', mainClassName)}>{children}</main>
        <footer className={twMerge('border-t border-t-neutral-200 py-4 mt-4', footerClassName)}>
          <span className={'text-sm text-neutral-500 italic'}>
            Copyright &copy; 2024 Gabriel Medina. All rights reserved.
          </span>
        </footer>
      </div>
    </>
  );
};

export default DefaultLayout;