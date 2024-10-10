import localFont from 'next/font/local';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
});

export default function Home() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} font-[family-name:var(--font-geist-sans)] container mx-auto !min-h-screen !h-screen`}
    >
      <div className={'bg-teal-50 container mx-auto my-8 border rounded-l p-4 !h-full !min-h-full'}>
        <h1>Hello World!</h1>
      </div>
    </div>
  );
}
