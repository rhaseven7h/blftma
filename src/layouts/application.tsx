import { ApplicationFooter } from '@/components/application-footer/application-footer';
import ApplicationNavbar from '@/components/application-navbar/application-navbar';
import ApplicationSidebar from '@/components/application-sidebar/application-sidebar';
import { PropsWithChildren } from 'react';

const ApplicationLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className={'flex h-full w-full flex-col flex-nowrap'}>
      <div className={''}>
        <ApplicationNavbar />
      </div>
      <div className={'flex grow flex-row flex-nowrap items-start gap-0'}>
        <div className={'h-full w-min min-w-min shrink-0 overflow-y-auto overflow-x-clip border-r ring-neutral-50'}>
          <ApplicationSidebar />
        </div>
        <div className={'h-full grow overflow-y-auto overflow-x-clip p-2'}>{children}</div>
      </div>
      <div className={''}>
        <ApplicationFooter />
      </div>
    </div>
  );
};

export default ApplicationLayout;
