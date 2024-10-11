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
  dummy_related?: DummyRelatedRecord[];
}

interface DummyRelatedRecord {
  id: number;
  dummy_table_id: number;
  nickname: string;
  dummy_table?: DummyTableRecord;
}

export const getServerSideProps = (async () => {
  const prisma = new PrismaClient();
  const dummyTableRecords: DummyTableRecord[] = await prisma.dummy_table.findMany({
    include: { dummy_related: true }
  });
  const dummyRelatedRecord: DummyRelatedRecord | null = await prisma.dummy_related.findFirst({
    include: { dummy_table: true }
  });
  return { props: { records: dummyTableRecords, related: dummyRelatedRecord } };
}) satisfies GetServerSideProps<{ records: DummyTableRecord[]; related: DummyRelatedRecord | null }>;

export default function Index({ records, related }: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
          <div className={'p-4 border border-blue-300 rounded-lg bg-white shadow-lg mb-8'}>
            <p>
              {related ? (
                <>
                  {related.nickname} &apos; s real name is {related?.dummy_table?.name}.
                </>
              ) : (
                <>No related records found.</>
              )}
            </p>
          </div>
          {records.map((record) => (
            <div key={record.id} className={'p-4 border border-blue-300 rounded-lg bg-white shadow-lg'}>
              <h2 className={'my-0'}>Customer: </h2>
              <ul className={'list-disc list-inside'}>
                <li>
                  <strong>Name: </strong>
                  {record.name}
                </li>
                <li>
                  <strong>Age: </strong>
                  {record.age}
                </li>
                <div>
                  <h3 className={'my-0'}>Nicknames: </h3>
                  <ul>
                    {record?.dummy_related?.map((related) => (
                      <li key={related.id}>
                        <strong>Nickname: </strong>
                        {related.nickname}
                      </li>
                    ))}
                  </ul>
                </div>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
