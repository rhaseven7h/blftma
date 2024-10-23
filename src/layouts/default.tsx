import { PropsWithChildren } from 'react';

const DefaultLayout = ({ children }: PropsWithChildren) => {
  return <div className={'container mx-auto my-8'}>{children}</div>;
};

export default DefaultLayout;
