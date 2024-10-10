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

export default function Index() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} font-[family-name:var(--font-geist-sans)] container mx-auto h-full`}
    >
      <div
        className={
          'bg-neutral-50 border-x border-x-neutral-300 container mx-auto p-4 overflow-auto !h-full !min-h-full'
        }
      >
        <div>
          <h1>Hello World!</h1>
        </div>
      </div>
    </div>
  );
}
