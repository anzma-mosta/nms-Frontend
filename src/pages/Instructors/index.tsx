import { useState, useMemo } from "react";
import { MainLayout } from "../../components/templates/MainLayout";
import { useTranslation } from "react-i18next";
import { getMockInstructors } from "../../data/mockData";
import { InstructorsHero } from "../../components/organisms/Instructors/InstructorsHero";
import { InstructorsFilters } from "../../components/organisms/Instructors/InstructorsFilters";
import { InstructorsGrid } from "../../components/organisms/Instructors/InstructorsGrid";
import { InstructorsEmptyState } from "../../components/organisms/Instructors/InstructorsEmptyState";

const Instructors = () => {
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [isSortOpen, setIsSortOpen] = useState(false);

  const instructors = useMemo(
    () => getMockInstructors(i18n.language),
    [i18n.language]
  );

  const categories = [
    { id: "all", label: t("instructor.filter_all") },
    { id: "programming", label: t("instructor.filter_programming") },
    { id: "design", label: t("instructor.filter_design") },
    { id: "business", label: t("instructor.filter_business") },
    { id: "data", label: t("instructor.filter_data") },
  ];

  const sortOptions = [
    { id: "popular", label: t("instructor.sort_popular") },
    { id: "rating", label: t("instructor.sort_rating") },
    { id: "courses", label: t("instructor.sort_courses") },
  ];

  const filteredInstructors = useMemo(() => {
    const result = instructors.filter((inst) => {
      const matchesSearch =
        (inst.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (inst.role || "").toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || inst.specialty === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    // Sorting logic
    result.sort((a, b) => {
      if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
      if (sortBy === "courses")
        return (b.coursesCount || 0) - (a.coursesCount || 0);
      if (sortBy === "popular")
        return (b.studentsCount || 0) - (a.studentsCount || 0);
      return 0;
    });

    return result;
  }, [searchQuery, selectedCategory, sortBy, instructors]);

  const handleReset = () => {
    setSearchQuery("");
    setSelectedCategory("all");
  };

  return (
    <MainLayout>
      <InstructorsHero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <section className="container mx-auto px-4 -mt-24 relative z-20 pb-40">
        <InstructorsFilters
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          isSortOpen={isSortOpen}
          setIsSortOpen={setIsSortOpen}
          sortOptions={sortOptions}
        />

        {filteredInstructors.length > 0 ? (
          <InstructorsGrid
            instructors={filteredInstructors}
            categories={categories}
          />
        ) : (
          <InstructorsEmptyState onReset={handleReset} />
        )}
      </section>
    </MainLayout>
  );
};

export default Instructors;
