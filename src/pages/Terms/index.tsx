import { MainLayout } from "../../components/templates/MainLayout";
import { useTranslation } from "react-i18next";
import { Reveal } from "../../components/atoms/Reveal";

const Terms = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <Reveal>
          <h1 className="text-4xl font-bold mb-8">
            {isAr ? "الشروط والأحكام" : "Terms & Conditions"}
          </h1>
        </Reveal>
        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          <Reveal delay={0.1}>
            <section>
              <h2 className="text-2xl font-bold mb-4">
                {isAr ? "1. قبول الشروط" : "1. Acceptance of Terms"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {isAr
                  ? "باستخدامك لهذه المنصة، فإنك توافق على الالتزام بالشروط والأحكام التالية..."
                  : "By using this platform, you agree to be bound by the following terms and conditions..."}
              </p>
            </section>
          </Reveal>
          <Reveal delay={0.2}>
            <section>
              <h2 className="text-2xl font-bold mb-4">
                {isAr ? "2. حساب المستخدم" : "2. User Account"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {isAr
                  ? "يجب عليك الحفاظ على سرية معلومات حسابك وأنت مسؤول عن جميع الأنشطة التي تحدث تحت حسابك."
                  : "You must maintain the confidentiality of your account information and are responsible for all activities that occur under your account."}
              </p>
            </section>
          </Reveal>
          {/* Add more sections as needed */}
        </div>
      </div>
    </MainLayout>
  );
};

export default Terms;
