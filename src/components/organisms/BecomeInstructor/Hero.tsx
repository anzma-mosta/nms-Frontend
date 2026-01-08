import { Reveal } from "../../atoms/Reveal";
import { Button } from "../../atoms/Button";
import { Sparkles, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "../../../utils/cn";
import { type TFunction } from "i18next";

interface BecomeInstructorHeroProps {
  isAr: boolean;
  t: TFunction;
}

export const BecomeInstructorHero = ({
  isAr,
  t,
}: BecomeInstructorHeroProps) => {
  return (
    <section className="relative bg-[#0F172A] pt-32 pb-48 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(white,transparent)] opacity-10" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className={cn("space-y-8", isAr ? "text-right" : "text-left")}>
              <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-black uppercase tracking-widest backdrop-blur-md mb-4">
                <Sparkles className="w-4 h-4" />
                {isAr ? "انضم إلى نخبة المدربين" : "Join Elite Instructors"}
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-white leading-[1.1]">
                {t("become_instructor.hero.title")}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400 block mt-2">
                  {t("become_instructor.hero.title_highlight")}
                </span>
              </h1>
              <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-xl">
                {t("become_instructor.hero.description")}
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button
                  size="lg"
                  className="rounded-2xl px-10 h-16 text-lg font-black shadow-xl shadow-primary/20 group"
                  onClick={() =>
                    document
                      .getElementById("apply-form")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  {t("become_instructor.hero.cta")}
                  {isAr ? (
                    <ArrowLeft className="mr-3 w-6 h-6 group-hover:-translate-x-2 transition-transform" />
                  ) : (
                    <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  )}
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 to-blue-500/30 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative rounded-[3rem] overflow-hidden border-2 border-white/10 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80"
                  alt="Instructor"
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div
                  className={cn(
                    "absolute bottom-8 left-8 right-8 p-6 glass rounded-2xl border border-white/10",
                    isAr ? "text-right" : "text-left"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-white font-black">
                        {isAr
                          ? "انضم لأكثر من 1000 مدرب"
                          : "Join 1000+ Instructors"}
                      </p>
                      <p className="text-white/70 text-sm font-medium">
                        {isAr
                          ? "في جميع أنحاء الوطن العربي"
                          : "Across the Arab World"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
