import { useTranslation } from "react-i18next";
import { Button } from "../../atoms/Button";
import { cn } from "../../../utils/cn";
import { CourseCard } from "../../molecules/CourseCard";
import { getMockCourses } from "../../../data/mockData";
import { useMemo } from "react";
import { ArrowRight, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export const FeaturedCourses = () => {
  const { t, i18n } = useTranslation();

  const featuredCourses = useMemo(
    () =>
      getMockCourses(i18n.language)
        .slice(0, 3)
        .map((course) => ({
          ...course,
          students: Number(course.students),
        })),
    [i18n.language]
  );

  return (
    <section className="py-32 relative overflow-hidden bg-background">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-10 mb-20">
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
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-bold tracking-wide uppercase">
                {t("home.featured_badge") || "Trending Now"}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6">
              {t("home.latest_courses")}
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
              {t("home.explore_best")}
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
              className="rounded-full h-14 px-10 group glass border-2"
            >
              <span className="font-bold">{t("home.view_all")}</span>
              <ArrowRight
                className={cn(
                  "w-5 h-5 transition-transform group-hover:translate-x-1",
                  i18n.language === "ar" &&
                    "rotate-180 group-hover:-translate-x-1"
                )}
              />
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featuredCourses.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <CourseCard course={course} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
