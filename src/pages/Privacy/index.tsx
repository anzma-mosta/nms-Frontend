import { MainLayout } from "../../components/templates/MainLayout";
import { useTranslation } from "react-i18next";
import { Reveal } from "../../components/atoms/Reveal";

const Privacy = () => {
  const { t } = useTranslation();

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <Reveal>
          <h1 className="text-4xl font-bold mb-8">{t("privacy.title")}</h1>
        </Reveal>
        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          <Reveal delay={0.1}>
            <section>
              <h2 className="text-2xl font-bold mb-4">
                {t("privacy.sections.collection.title")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("privacy.sections.collection.content")}
              </p>
            </section>
          </Reveal>
          <Reveal delay={0.2}>
            <section>
              <h2 className="text-2xl font-bold mb-4">
                {t("privacy.sections.usage.title")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("privacy.sections.usage.content")}
              </p>
            </section>
          </Reveal>
        </div>
      </div>
    </MainLayout>
  );
};

export default Privacy;
