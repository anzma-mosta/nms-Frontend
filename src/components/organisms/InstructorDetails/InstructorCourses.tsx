import { useTranslation } from "react-i18next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../../atoms/Button";
import { CourseCard } from "../../molecules/CourseCard";
import { ROUTES } from "../../../constants/routes";
import type { Course } from "../../../types";

interface InstructorCoursesProps {
  instructorName: string;
  courses: Course[];
}

export const InstructorCourses = ({
  instructorName,
  courses,
}: InstructorCoursesProps) => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  return (
    <section className="space-y-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-3 h-10 bg-primary rounded-full" />
          <h2 className="text-4xl font-black tracking-tight">
            {t("instructor.courses_by", { name: instructorName })}
          </h2>
        </div>
        <Link to={ROUTES.COURSES}>
          <Button
            variant="ghost"
            className="rounded-2xl font-black hover:bg-primary/5 group"
          >
            {t("instructor.view_all_courses")}
            {isAr ? (
              <ArrowLeft className="w-5 h-5 mr-3 group-hover:-translate-x-2 transition-transform" />
            ) : (
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform" />
            )}
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={{
              ...course,
              students:
                typeof course.students === "number" ? course.students : 0,
            }}
          />
        ))}
      </div>
    </section>
  );
};
