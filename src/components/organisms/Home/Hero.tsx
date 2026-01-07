import { useTranslation, Trans } from "react-i18next";
import {
  Star,
  ArrowLeft,
  PlayCircle,
  CheckCircle2,
  Trophy,
} from "lucide-react";
import { Button } from "../../atoms/Button";
import { cn } from "../../../utils/cn";

export const Hero = () => {
  const { t, i18n } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-transparent pt-16 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div
            className={cn(
              "space-y-8",
              i18n.language === "ar" ? "text-right" : "text-left"
            )}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Star className="w-4 h-4 fill-current" />
              <span>{t("home.hero_badge")}</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-black leading-tight text-foreground">
              <Trans i18nKey="home.hero_title">
                تعلم مهارات <span className="text-primary">المستقبل</span> اليوم
              </Trans>
            </h1>
            <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
              {t("home.hero_desc")}
            </p>
            <div
              className={cn(
                "flex flex-wrap gap-4",
                i18n.language === "ar" ? "justify-start" : "justify-start"
              )}
            >
              <Button size="lg" className="h-14 px-8 text-lg gap-2">
                <span>{t("home.start_now")}</span>
                <ArrowLeft
                  className={cn(
                    "w-5 h-5",
                    i18n.language === "en" && "rotate-180"
                  )}
                />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-14 px-8 text-lg gap-2"
              >
                <PlayCircle className="w-5 h-5" />
                <span>{t("home.how_it_works")}</span>
              </Button>
            </div>
            <div className="flex items-center gap-8 pt-4">
              <div
                className={cn(
                  "flex",
                  i18n.language === "ar"
                    ? "-space-x-3 space-x-reverse"
                    : "-space-x-3"
                )}
              >
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-full border-4 border-background bg-secondary flex items-center justify-center overflow-hidden"
                  >
                    <img
                      src={`https://i.pravatar.cc/150?u=${i}`}
                      alt="student"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <p className="font-bold text-foreground">
                  50k+ {t("home.active_students")}
                </p>
                <p className="text-muted-foreground">{t("home.trust_us")}</p>
              </div>
            </div>
          </div>
          <div className="relative lg:block hidden">
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"></div>
            <div
              className={cn(
                "relative bg-card border rounded-3xl p-4 shadow-2xl transition-transform hover:rotate-0 duration-500",
                i18n.language === "ar" ? "rotate-3" : "-rotate-3"
              )}
            >
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
                alt="Students learning"
                className="rounded-2xl w-full h-auto"
                fetchPriority="high"
                loading="eager"
              />
              <div
                className={cn(
                  "absolute -bottom-6 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-xl border flex items-center gap-4",
                  i18n.language === "ar" ? "-left-6" : "-right-6"
                )}
              >
                <div className="bg-green-500/10 p-2 rounded-lg text-green-500">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold">
                    {t("home.certified_certificates")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t("home.after_completion")}
                  </p>
                </div>
              </div>
              <div
                className={cn(
                  "absolute -top-6 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-xl border flex items-center gap-4",
                  i18n.language === "ar" ? "-right-6" : "-left-6"
                )}
              >
                <div className="bg-orange-500/10 p-2 rounded-lg text-orange-500">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold">
                    {t("home.premium_content")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t("home.highest_quality")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
