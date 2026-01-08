import { useTranslation } from "react-i18next";
import { Reveal } from "../../atoms/Reveal";
import { CheckCircle2, XCircle } from "lucide-react";

export const StatusHeader = ({ isSuccess }: { isSuccess: boolean }) => {
  const { t } = useTranslation();

  return (
    <Reveal direction="up">
      <div className="text-center mb-12">
        {isSuccess ? (
          <>
            <div className="w-24 h-24 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              {t("order_success.title")}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto">
              {t("order_success.desc")}
            </p>
          </>
        ) : (
          <>
            <div className="w-24 h-24 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-8">
              <XCircle className="w-12 h-12" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              {t("order_success.failed_title")}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto">
              {t("order_success.failed_desc")}
            </p>
          </>
        )}
      </div>
    </Reveal>
  );
};
