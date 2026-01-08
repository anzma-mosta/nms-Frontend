import { useTranslation } from "react-i18next";
import { Search } from "lucide-react";
import { Button } from "../../atoms/Button";
import { Reveal } from "../../atoms/Reveal";

interface InstructorsEmptyStateProps {
  onReset: () => void;
}

export const InstructorsEmptyState = ({
  onReset,
}: InstructorsEmptyStateProps) => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  return (
    <Reveal>
      <div className="text-center py-40 bg-card/40 glass border-2 border-dashed border-primary/10 rounded-[4rem] relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 animate-pulse" />
        <div className="relative z-10">
          <div className="w-40 h-40 bg-primary/5 rounded-[3rem] flex items-center justify-center mx-auto mb-10">
            <Search className="w-20 h-20 text-primary/30" />
          </div>
          <h3 className="text-4xl font-black mb-6">
            {t("instructor.no_results_title")}
          </h3>
          <p className="text-2xl text-muted-foreground font-medium max-w-md mx-auto mb-12 leading-relaxed">
            {t("instructor.no_results_desc")}
          </p>
          <Button
            onClick={onReset}
            className="h-16 px-12 rounded-2xl font-black text-lg shadow-2xl shadow-primary/20"
          >
            {isAr ? "إعادة ضبط الفلاتر" : "Reset Filters"}
          </Button>
        </div>
      </div>
    </Reveal>
  );
};
