import { MainLayout } from "../../components/templates/MainLayout";
import { useTranslation } from "react-i18next";
import { cn } from "../../utils/cn";
import { RegisterHero } from "../../components/organisms/Register/Hero";
import { RegisterBenefits } from "../../components/organisms/Register/Benefits";
import { RegisterFormCard } from "../../components/organisms/Register/FormCard";

const RegisterPage = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  return (
    <MainLayout>
      <div className="min-h-screen relative flex items-center justify-center py-20 overflow-hidden bg-[#0F172A]">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(white,transparent)] opacity-10" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div
              className={cn(
                "hidden lg:block space-y-10",
                isAr ? "text-right" : "text-left"
              )}
            >
              <RegisterHero />
              <RegisterBenefits />
            </div>

            <RegisterFormCard />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default RegisterPage;
