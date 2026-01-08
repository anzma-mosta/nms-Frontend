import { Reveal } from "../../atoms/Reveal";
import { CourseCard } from "../../molecules/CourseCard";
import { type Course } from "../../../types";
import { useTranslation } from "react-i18next";

interface RelatedCoursesProps {
  courses: Course[];
}

export const RelatedCourses = ({ courses }: RelatedCoursesProps) => {
  const { t } = useTranslation();

  if (courses.length === 0) return null;

  return (
    <div className="container mx-auto px-4 py-32 border-t border-white/5">
      <Reveal>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
            <h2 className="text-5xl font-black">
              {t("course_details.related_courses")}
            </h2>
            <p className="text-slate-400 text-xl font-medium max-w-2xl leading-relaxed">
              {t("course_details.related_courses_desc")}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {courses.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.1}>
              <CourseCard course={c} />
            </Reveal>
          ))}
        </div>
      </Reveal>
    </div>
  );
};
