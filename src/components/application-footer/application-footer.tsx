import { Footer } from 'flowbite-react';

export function ApplicationFooter() {
  return (
    <Footer
      container
      className={'bg-neutral-50 rounded-none border-t shadow'}>
      <Footer.Copyright
        href='#'
        by='Flowbite™'
        year={2022}
      />
      <Footer.LinkGroup>
        <Footer.Link href='#'>About</Footer.Link>
        <Footer.Link href='#'>Privacy Policy</Footer.Link>
        <Footer.Link href='#'>Licensing</Footer.Link>
        <Footer.Link href='#'>Contact</Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  );
}
