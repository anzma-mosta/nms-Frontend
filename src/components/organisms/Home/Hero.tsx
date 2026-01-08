import { useTranslation, Trans } from "react-i18next";
import {
  Star,
  PlayCircle,
  CheckCircle2,
  Trophy,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Button } from "../../atoms/Button";
import { cn } from "../../../utils/cn";
import { motion } from "framer-motion";

export const Hero = () => {
  const { t, i18n } = useTranslation();

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden pt-20 pb-20 bg-background">
      {/* Background Decorations - Simplified to CSS only, no background-image */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 opacity-50"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] translate-y-1/2 opacity-50"></div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div
            className={cn(
              "space-y-8",
              i18n.language === "ar" ? "text-right" : "text-left"
            )}
          >
            {/* Reduced animation for faster LCP */}
            <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-2xl bg-primary/10 text-primary border border-primary/20 shadow-lg shadow-primary/5">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-black uppercase tracking-[0.2em]">
                {t("home.hero_badge")}
              </span>
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tighter text-foreground">
                <Trans i18nKey="home.hero_title">
                  Learn <span className="text-gradient">Future</span> Skills
                  Today
                </Trans>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed font-bold opacity-90">
                {t("home.hero_desc")}
              </p>
            </div>

            <div
              className={cn(
                "flex flex-col sm:flex-row gap-4",
                i18n.language === "ar" ? "justify-start" : "justify-start"
              )}
            >
              <Button
                size="lg"
                className="h-14 px-10 text-base font-black rounded-2xl gap-4 shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 group"
              >
                <span>{t("home.start_now")}</span>
                <ArrowRight
                  className={cn(
                    "w-5 h-5 transition-transform group-hover:translate-x-2",
                    i18n.language === "ar" &&
                      "rotate-180 group-hover:-translate-x-2"
                  )}
                />
              </Button>
              <Button
                variant="glass"
                size="lg"
                className="h-14 px-10 text-base font-black rounded-2xl gap-4 border-2 border-border/50"
              >
                <PlayCircle className="w-6 h-6 text-primary" />
                <span>{t("home.how_it_works")}</span>
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-10 pt-4">
              <div className="flex flex-col gap-3">
                <div className="flex -space-x-4 rtl:space-x-reverse">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-4 border-background overflow-hidden bg-muted"
                    >
                      <img
                        src={`https://i.pravatar.cc/80?img=${i + 10}`}
                        alt="User"
                        width={40}
                        height={40}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-500">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    10k+ Students
                  </span>
                </div>
              </div>

              <div className="h-10 w-px bg-border/50 hidden sm:block"></div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 group-hover:scale-110 transition-transform">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-black leading-none mb-1">
                    Top Rated
                  </p>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    Best Academy 2024
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="relative lg:block hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-[3rem] blur-2xl -z-10 animate-pulse"></div>
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop"
              alt="Students Learning"
              width={800}
              height={1000}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="rounded-[3rem] shadow-2xl border-8 border-white/10 dark:border-white/5 object-cover aspect-[4/5]"
            />
            
            {/* Floating Badges - Simplified */}
            <div className="absolute -bottom-6 -left-6 bg-card p-5 rounded-3xl shadow-2xl border border-border/50 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-lg font-black leading-none mb-1">2.5k+</p>
                  <p className="text-xs font-bold text-muted-foreground uppercase">
                    Courses
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
