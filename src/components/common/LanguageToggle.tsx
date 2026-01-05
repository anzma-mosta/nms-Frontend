import { useTranslation } from "react-i18next";
import { Languages } from "lucide-react";
import { Button } from "../ui/Button";

export const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-2"
      title={i18n.language === "ar" ? "English" : "العربية"}
    >
      <Languages className="w-5 h-5" />
      <span className="text-xs font-bold uppercase">
        {i18n.language === "ar" ? "EN" : "AR"}
      </span>
    </Button>
  );
};
