import { MainLayout } from "../../components/templates/MainLayout";
import { ContactUs } from "../../components/organisms/Home/ContactUs";
import { SEO } from "../../components/atoms/SEO";
import { useTranslation } from "react-i18next";
import { ContactHero } from "../../components/organisms/Contact/Hero";
import { ContactSupport } from "../../components/organisms/Contact/Support";

const Contact = () => {
  const { i18n, t } = useTranslation();
  const isAr = i18n.language === "ar";

  return (
    <MainLayout>
      <SEO
        title={t("home.contact.title")}
        description={t("home.contact.description")}
      />

      <ContactHero isAr={isAr} />

      <div className="-mt-32 relative z-20 pb-32">
        <ContactUs />
      </div>

      <ContactSupport isAr={isAr} />
    </MainLayout>
  );
};

export default Contact;
