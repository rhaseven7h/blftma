import DefaultLayout from "@/layouts/default";
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
  const { i18n } = useTranslation();
  const t = i18n.getFixedT(null, null, "pages.index");
  return (
    <DefaultLayout>
      <div className={"container mx-auto my-8"}>
        <div className={"prose max-w-none"}>
          <h1>{t("title")}</h1>
          <p>{t("description")}</p>
        </div>
      </div>
    </DefaultLayout>
  );
}
