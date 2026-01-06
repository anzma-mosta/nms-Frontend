import { useTranslation } from "react-i18next";
import { ArrowLeft } from "lucide-react";
import { Button } from "../../atoms/Button";
import { cn } from "../../../utils/cn";

export const FinalCTA = () => {
  const { t, i18n } = useTranslation();

  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-3xl bg-primary px-8 py-16 overflow-hidden text-center">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>

        <div className="relative z-10 max-w-2xl mx-auto space-y-8">
          <h2 className="text-4xl font-black text-white leading-tight">
            {t("home.final_cta_title")}
          </h2>
          <p className="text-primary-foreground/80 text-lg">
            {t("home.final_cta_desc")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              variant="secondary"
              className="h-14 px-10 text-lg font-bold gap-2"
            >
              <span>{t("home.join_now")}</span>
              <ArrowLeft
                className={cn(
                  "w-5 h-5",
                  i18n.language === "en" && "rotate-180"
                )}
              />
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="h-14 px-10 text-lg font-bold border-white "
            >
              {t("home.browse_courses")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
