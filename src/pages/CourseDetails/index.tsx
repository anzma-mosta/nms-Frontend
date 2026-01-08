import { useParams } from "react-router-dom";
import { MainLayout } from "../../components/templates/MainLayout";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { useScroll, useTransform } from "framer-motion";
import { getMockCourses } from "../../data/mockData";
import { type Course } from "../../types";

// Sub-components
import { CourseHero } from "../../components/organisms/CourseDetails/Hero";
import { CourseStats } from "../../components/organisms/CourseDetails/Stats";
import { LearningOutcomes } from "../../components/organisms/CourseDetails/LearningOutcomes";
import { Curriculum } from "../../components/organisms/CourseDetails/Curriculum";
import { InstructorInfo } from "../../components/organisms/CourseDetails/InstructorInfo";
import { CourseFAQ } from "../../components/organisms/CourseDetails/FAQ";
import { CourseSidebar } from "../../components/organisms/CourseDetails/Sidebar";
import { RelatedCourses } from "../../components/organisms/CourseDetails/RelatedCourses";

const CourseDetails = () => {
  const { id } = useParams();
  const { i18n, t } = useTranslation();
  const isEnrolled = false;

  const coursesDB = useMemo(
    () => getMockCourses(i18n.language),
    [i18n.language]
  );

  const course = useMemo((): Course => {
    return (coursesDB.find((c) => c.id.toString() === id) ||
      coursesDB[0]) as Course;
  }, [id, coursesDB]);

  const relatedCourses = useMemo(() => {
    return coursesDB.filter((c) => c.id.toString() !== id).slice(0, 3);
  }, [coursesDB, id]);

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.9]);

  return (
    <MainLayout>
      <CourseHero
        course={course}
        t={t}
        isEnrolled={isEnrolled}
        heroOpacity={heroOpacity}
        heroScale={heroScale}
      />

      <section className="container mx-auto px-4 -mt-32 relative z-30 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-20">
            <CourseStats course={course} t={t} />
            <LearningOutcomes course={course} />
            <Curriculum course={course} id={id || ""} isEnrolled={isEnrolled} />
            <InstructorInfo course={course} />
            <CourseFAQ />
          </div>

          <div className="lg:col-span-4">
            <CourseSidebar course={course} />
          </div>
        </div>
      </section>

      <RelatedCourses courses={relatedCourses} />
    </MainLayout>
  );
};

export default CourseDetails;
