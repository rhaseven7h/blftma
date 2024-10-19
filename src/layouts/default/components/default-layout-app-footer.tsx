import { Footer } from 'flowbite-react';
import { useTranslation } from 'next-i18next';
import { twMerge } from 'tailwind-merge';

export type DefaultLayoutAppFooterProps = {
  className?: string;
};

const DefaultLayoutAppFooter = ({ className }: DefaultLayoutAppFooterProps) => {
  const { t } = useTranslation('common');
  return (
    <Footer
      className={twMerge('border-t fixed bottom-0 w-full', className)}
      container>
      <Footer.Copyright
        href='#'
        by={t('general.copyright')}
        year={new Date().getFullYear()}
      />
      <Footer.LinkGroup>
        <Footer.Link href='/public'>Home</Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  );
};

export default DefaultLayoutAppFooter;
