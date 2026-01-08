import { useTranslation } from "react-i18next";
import { Star, Award, ArrowRight, GraduationCap } from "lucide-react";
import { cn } from "../../../utils/cn";
import { getMockInstructors } from "../../../data/mockData";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "../../atoms/Button";
import { Card } from "../../atoms/Card";

export const TopInstructors = () => {
  const { t, i18n } = useTranslation();

  const instructors = useMemo(
    () => getMockInstructors(i18n.language).slice(0, 4),
    [i18n.language]
  );

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: i18n.language === "ar" ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={cn(
              "max-w-2xl",
              i18n.language === "ar" ? "text-right" : "text-left"
            )}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <GraduationCap className="w-4 h-4" />
              <span className="text-sm font-bold tracking-wide uppercase">
                {t("home.instructors_badge") || "Expert Instructors"}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              {t("home.top_instructors")}
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t("home.learn_from_best")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Button
              variant="outline"
              size="lg"
              className="rounded-full group glass"
            >
              {t("home.view_all_instructors") || "View All Instructors"}
              <ArrowRight
                className={cn(
                  "w-4 h-4 transition-transform group-hover:translate-x-1",
                  i18n.language === "ar" &&
                    "rotate-180 group-hover:-translate-x-1"
                )}
              />
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {instructors.map((ins, i) => (
            <motion.div
              key={ins.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Card className="group relative p-8 text-center glass border-2 border-transparent hover:border-primary/20 transition-all duration-500 rounded-[2.5rem] overflow-hidden">
                {/* Hover Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="relative mb-8 inline-block">
                    {/* Image Container with animated border */}
                    <div className="relative w-40 h-40 mx-auto">
                      <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30 animate-[spin_10s_linear_infinite] group-hover:border-primary/60 transition-colors" />
                      <div className="absolute inset-2 rounded-full overflow-hidden border-4 border-background shadow-2xl transition-transform duration-500 group-hover:scale-105">
                        <img
                          src={ins.image}
                          alt={ins.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>

                    {/* Badge */}
                    <div className="absolute -bottom-2 right-1/2 translate-x-1/2 px-4 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-black shadow-lg">
                      {ins.specialty.toUpperCase()}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-black group-hover:text-primary transition-colors">
                        {ins.name}
                      </h3>
                      <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                        {ins.role}
                      </p>
                    </div>

                    <div className="flex items-center justify-center gap-6 pt-4 border-t border-primary/5">
                      <div className="text-center">
                        <div className="flex items-center gap-1 text-yellow-500 font-black">
                          <Star className="w-4 h-4 fill-yellow-500" />
                          <span>{ins.rating}</span>
                        </div>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase">
                          {t("home.rating")}
                        </p>
                      </div>
                      <div className="w-px h-8 bg-primary/5" />
                      <div className="text-center">
                        <div className="text-foreground font-black">
                          {ins.studentsCount}
                        </div>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase">
                          {t("home.students")}
                        </p>
                      </div>
                    </div>

                    <div className="pt-6">
                      <Button
                        variant="ghost"
                        className="w-full rounded-2xl group/btn hover:bg-primary hover:text-primary-foreground font-bold"
                      >
                        {t("home.view_profile") || "View Profile"}
                        <Award className="ml-2 w-4 h-4 transition-transform group-hover/btn:scale-125" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
