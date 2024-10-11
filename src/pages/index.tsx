import { PrismaClient } from '@prisma/client';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
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

interface DummyTableRecord {
  id: number;
  name: string;
  age: number;
}

export const getServerSideProps = (async () => {
  const prisma = new PrismaClient();
  const dummyTableRecords: DummyTableRecord[] = await prisma.dummy_table.findMany();
  return { props: { records: dummyTableRecords } };
}) satisfies GetServerSideProps<{ records: DummyTableRecord[] }>;

export default function Index({ records }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log('Records:', records);
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} font-[family-name:var(--font-geist-sans)] container mx-auto h-full`}
    >
      <div
        className={
          'bg-neutral-50 border-x border-x-neutral-300 container mx-auto p-4 overflow-auto !h-full !min-h-full'
        }
      >
        <div className={'prose max-w-none'}>
          <h1>Hello World!</h1>
          {records.map((record) => (
            <ul key={record.id} className={'p-4 border border-blue-300 rounded-lg'}>
              <li>
                <strong>Nombre: </strong>
                {record.name}
              </li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
