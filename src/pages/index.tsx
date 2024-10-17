import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default function Index() {
  const { t } = useTranslation();
  return (
    <div className={"container mx-auto my-8"}>
      <div className={"prose max-w-none"}>
        <h1>{t("index.title")}</h1>
        <p>{t("index.description")}</p>
      </div>
    </div>
  );
}
