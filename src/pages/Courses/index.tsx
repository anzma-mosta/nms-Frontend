import { MainLayout } from "../../components/templates/MainLayout";
import { useTranslation } from "react-i18next";
import { CourseCard } from "../../components/molecules/CourseCard";
import { Search, Filter } from "lucide-react";
import { Input } from "../../components/atoms/Input";
import { Button } from "../../components/atoms/Button";
import { SEO } from "../../components/atoms/SEO";

import { getMockCourses } from "../../data/mockData";
import { useMemo } from "react";

const Courses = () => {
  const { t, i18n } = useTranslation();

  const courses = useMemo(() => getMockCourses(i18n.language), [i18n.language]);

  return (
    <MainLayout>
      <SEO
        title={t("courses.title")}
        description={t("courses.description")}
      />
      <div className="bg-primary/5 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">{t("courses.title")}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("courses.description")}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-6 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              className="pl-10"
              placeholder={t("courses.search_placeholder")}
            />
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              {t("courses.filter")}
            </Button>
            <select className="bg-background border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary/20">
              <option>{t("courses.sort_by")}</option>
              <option>{t("courses.sort_newest")}</option>
              <option>{t("courses.sort_best_selling")}</option>
              <option>{t("courses.sort_highest_rated")}</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={{
                id: String(course.id),
                title: course.title,
                instructor: course.instructor,
                rating: course.rating,
                students:
                  typeof course.students === "string"
                    ? parseInt(course.students.replace(/,/g, ""), 10) || 0
                    : course.students,
                price: course.price,
                image: course.image,
                category: course.category || "Uncategorized",
              }}
            />
          ))}
        </div>

        <div className="mt-16 flex justify-center gap-2">
          <Button variant="outline" disabled>
            1
          </Button>
          <Button variant="ghost">2</Button>
          <Button variant="ghost">3</Button>
          <span className="flex items-end px-2">...</span>
          <Button variant="ghost">10</Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Courses;
