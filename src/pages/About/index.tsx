import { MainLayout } from "../../layouts/MainLayout";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-8">{t("nav.about")}</h1>
        <p className="text-muted-foreground">{t("home.about.description")}</p>
      </div>
    </MainLayout>
  );
};

export default About;
