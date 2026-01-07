import { MainLayout } from "../../components/templates/MainLayout";
import { ContactUs } from "../../components/organisms/Home/ContactUs";
import { SEO } from "../../components/atoms/SEO";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();

  return (
    <MainLayout>
      <SEO
        title={t("home.contact.title")}
        description={t("home.contact.description")}
      />
      <div className="py-20">
        <ContactUs />
      </div>
    </MainLayout>
  );
};

export default Contact;
