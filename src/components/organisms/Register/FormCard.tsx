import { useTranslation } from "react-i18next";
import { Reveal } from "../../atoms/Reveal";
import { RegisterForm } from "../../../features/auth/components/RegisterForm";

export const RegisterFormCard = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  return (
    <Reveal delay={0.3}>
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-[3rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
        <div className="relative bg-card glass border-2 border-white/10 rounded-[3rem] p-10 md:p-16 shadow-2xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black mb-4">
              {isAr ? "إنشاء حساب" : "Create Account"}
            </h2>
            <p className="text-muted-foreground font-medium">
              {isAr
                ? "أدخل بياناتك للانضمام إلى المنصة"
                : "Enter your details to join the platform"}
            </p>
          </div>
          <RegisterForm />
        </div>
      </div>
    </Reveal>
  );
};
