import { useTranslation } from "react-i18next";
import { Button } from "../../atoms/Button";
import { cn } from "../../../utils/cn";
import { CourseCard } from "../../molecules/CourseCard";
import { getMockCourses } from "../../../data/mockData";
import { useMemo } from "react";

export const FeaturedCourses = () => {
  const { t, i18n } = useTranslation();

  const featuredCourses = useMemo(
    () => getMockCourses(i18n.language).slice(0, 3),
    [i18n.language]
  );

  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-end mb-12">
        <div
          className={cn(
            "space-y-4",
            i18n.language === "ar" ? "text-right" : "text-left"
          )}
        >
          <h2 className="text-3xl font-bold">{t("home.latest_courses")}</h2>
          <p className="text-muted-foreground">{t("home.explore_best")}</p>
        </div>
        <Button variant="outline">{t("home.view_all")}</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredCourses.map((course, i) => (
          <CourseCard key={i} course={course} />
        ))}
      </div>
    </section>
  );
};
