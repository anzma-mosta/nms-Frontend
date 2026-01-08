import { MainLayout } from "../../components/templates/MainLayout";
import { useTranslation } from "react-i18next";
import { SEO } from "../../components/atoms/SEO";
import { getMockCourses } from "../../data/mockData";
import { useMemo, useState } from "react";
import { CoursesHero } from "../../components/organisms/Courses/Hero";
import { CoursesSearchFilter } from "../../components/organisms/Courses/SearchFilter";
import { CoursesSidebar } from "../../components/organisms/Courses/Sidebar";
import { CoursesList } from "../../components/organisms/Courses/List";

const Courses = () => {
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [selectedDuration, setSelectedDuration] = useState("All");
  const [selectedRating, setSelectedRating] = useState(0);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [isSortOpen, setIsSortOpen] = useState(false);

  const isAr = i18n.language === "ar";

  const courses = useMemo(() => getMockCourses(i18n.language), [i18n.language]);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch = course.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || course.category === selectedCategory;
      const matchesLevel = selectedLevel === "All";
      const matchesDuration = selectedDuration === "All";
      const matchesRating = selectedRating === 0;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesLevel &&
        matchesDuration &&
        matchesRating
      );
    });
  }, [
    courses,
    searchQuery,
    selectedCategory,
    selectedLevel,
    selectedDuration,
    selectedRating,
  ]);

  const categories = [
    "All",
    ...Array.from(new Set(courses.map((c) => c.category || "Uncategorized"))),
  ];
  const levels = ["All", "beginner", "intermediate", "advanced"];
  const durations = ["All", "short", "medium", "long"];
  const ratings = [5, 4, 3];

  const sortOptions = [
    { value: "newest", label: t("courses.sort_newest") },
    { value: "best_selling", label: t("courses.sort_best_selling") },
    { value: "highest_rated", label: t("courses.sort_highest_rated") },
  ];

  const currentSortLabel = sortOptions.find(
    (opt) => opt.value === sortBy
  )?.label;

  return (
    <MainLayout>
      <SEO title={t("courses.title")} description={t("courses.description")} />

      <CoursesHero isAr={isAr} t={t} />

      <div className="container mx-auto px-4 -mt-20 relative z-20 pb-24">
        <CoursesSearchFilter
          isAr={isAr}
          t={t}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          sortBy={sortBy}
          setSortBy={setSortBy}
          isSortOpen={isSortOpen}
          setIsSortOpen={setIsSortOpen}
          currentSortLabel={currentSortLabel}
          sortOptions={sortOptions}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        <div className="flex flex-col lg:flex-row gap-8">
          <CoursesSidebar
            isAr={isAr}
            t={t}
            isSidebarOpen={isSidebarOpen}
            levels={levels}
            selectedLevel={selectedLevel}
            setSelectedLevel={setSelectedLevel}
            durations={durations}
            selectedDuration={selectedDuration}
            setSelectedDuration={setSelectedDuration}
            ratings={ratings}
            selectedRating={selectedRating}
            setSelectedRating={(r: string | number) => setSelectedRating(Number(r))}
          />

          <CoursesList
            isAr={isAr}
            filteredCourses={filteredCourses}
            viewMode={viewMode}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default Courses;
