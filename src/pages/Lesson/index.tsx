import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "../../components/templates/MainLayout";
import { useTranslation } from "react-i18next";
import { useMemo, useState, useEffect } from "react";
import { cn } from "../../utils/cn";
import { ROUTES } from "../../constants/routes";
import { getMockCourses } from "../../data/mockData";
import { LessonHeader } from "../../components/organisms/Lesson/LessonHeader";
import { LessonVideoPlayer } from "../../components/organisms/Lesson/LessonVideoPlayer";
import { LessonTabs } from "../../components/organisms/Lesson/LessonTabs";
import { LessonSidebar } from "../../components/organisms/Lesson/LessonSidebar";
import type {
  Course,
  CurriculumSection,
  Lesson as LessonType,
} from "../../types";

const Lesson = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [expandedSections, setExpandedSections] = useState<number[]>([0]);

  // Mock course data
  const coursesDB = useMemo(
    () => getMockCourses(i18n.language),
    [i18n.language]
  );

  const course = useMemo((): Course => {
    return (coursesDB.find((c) => c.id.toString() === courseId) ||
      coursesDB[0]) as Course;
  }, [courseId, coursesDB]);

  // Find current lesson
  const currentLesson = useMemo((): LessonType => {
    if (course.curriculum) {
      for (const section of course.curriculum) {
        const lesson = section.lessons.find(
          (l: LessonType) => l.id === lessonId
        );
        if (lesson) return lesson;
      }
      return course.curriculum[0].lessons[0];
    }
    return { id: "", title: "", duration: "" };
  }, [course, lessonId]);

  // Navigation Logic
  const navigation = useMemo(() => {
    const allLessons = (course.curriculum || []).flatMap(
      (s: CurriculumSection) => s.lessons
    );
    const currentIndex = allLessons.findIndex(
      (l: LessonType) => l.id === (lessonId || allLessons[0]?.id)
    );
    return {
      prev: currentIndex > 0 ? allLessons[currentIndex - 1] : null,
      next:
        currentIndex < allLessons.length - 1
          ? allLessons[currentIndex + 1]
          : null,
      current: currentIndex + 1,
      total: allLessons.length,
    };
  }, [course, lessonId]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) setIsSidebarOpen(false);
      else setIsSidebarOpen(true);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSection = (idx: number) => {
    setExpandedSections((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const handleLessonChange = (newLessonId: string) => {
    const path = ROUTES.LESSON.replace(
      ":courseId",
      course.id.toString()
    ).replace(":lessonId", newLessonId);
    navigate(path);
    if (window.innerWidth < 1024) setIsSidebarOpen(false);
  };

  return (
    <MainLayout>
      <div
        className={cn(
          "flex flex-col min-h-[calc(100vh-80px)] bg-[#0B0F19] transition-all duration-500 overflow-hidden relative",
          isAr ? "lg:flex-row-reverse" : "lg:flex-row"
        )}
      >
        {/* Animated Background Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
          <LessonHeader
            course={course}
            currentLesson={currentLesson}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            navigation={navigation}
            handleLessonChange={handleLessonChange}
          />

          <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#0B0F19]">
            <LessonVideoPlayer currentLesson={currentLesson} course={course} />
            <LessonTabs
              course={course}
              currentLesson={currentLesson}
              navigation={navigation}
            />
          </div>
        </div>

        <LessonSidebar
          course={course}
          lessonId={lessonId}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          expandedSections={expandedSections}
          toggleSection={toggleSection}
          handleLessonChange={handleLessonChange}
          navigation={navigation}
        />
      </div>
    </MainLayout>
  );
};

export default Lesson;
