import { MainLayout } from "../../components/templates/MainLayout";
import { useTranslation } from "react-i18next";
import { Reveal } from "../../components/atoms/Reveal";

const Privacy = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <Reveal>
          <h1 className="text-4xl font-bold mb-8">{isAr ? "سياسة الخصوصية" : "Privacy Policy"}</h1>
        </Reveal>
        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          <Reveal delay={0.1}>
            <section>
              <h2 className="text-2xl font-bold mb-4">{isAr ? "1. جمع المعلومات" : "1. Information Collection"}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {isAr 
                  ? "نقوم بجمع المعلومات التي تقدمها لنا مباشرة عند التسجيل في المنصة..." 
                  : "We collect information you provide directly to us when registering on the platform..."}
              </p>
            </section>
          </Reveal>
          <Reveal delay={0.2}>
            <section>
              <h2 className="text-2xl font-bold mb-4">{isAr ? "2. استخدام المعلومات" : "2. Use of Information"}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {isAr 
                  ? "نستخدم المعلومات التي نجمعها لتوفير الخدمات وتحسينها والتواصل معك..." 
                  : "We use the information we collect to provide, improve services, and communicate with you..."}
              </p>
            </section>
          </Reveal>
        </div>
      </div>
    </MainLayout>
  );
};

export default Privacy;
