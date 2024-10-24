import ApplicationLayout from '@/layouts/application';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common']))
    }
  };
}

export default function Index() {
  return (
    <ApplicationLayout>
      <div className={'prose max-w-none'}>
        <h1>Business Leads Framework</h1>
        <h2>Technical Maturity Assessment</h2>
        <p>Assessments Tracking &amp; Management application.</p>
        <p>
          Introducing the TMA Tracker – your ultimate solution for managing Technical Maturity Assessments (TMA). This
          app is designed to streamline the tracking of assessments, follow-up actions, and generate valuable business
          leads. With TMA Tracker, you can ensure that every assessment is meticulously recorded, actions are
          efficiently managed, and new business opportunities are identified and pursued. Elevate your assessment
          management process and drive business growth with TMA Tracker.
        </p>
      </div>
    </ApplicationLayout>
  );
}
