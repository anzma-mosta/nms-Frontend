import { useState, useMemo } from "react";
import { MainLayout } from "../../components/templates/MainLayout";
import { useTranslation } from "react-i18next";
import { Search, ArrowLeft, ArrowRight, Star, Users, BookOpen, ChevronDown } from "lucide-react";
import { Button } from "../../components/atoms/Button";
import { Badge } from "../../components/atoms/Badge";
import { Reveal } from "../../components/atoms/Reveal";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { getMockInstructors } from "../../data/mockData";
import { cn } from "../../utils/cn";
import { motion, AnimatePresence } from "framer-motion";

const Instructors = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";
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
    let result = instructors.filter((inst) => {
      const matchesSearch = 
        (inst.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (inst.role || "").toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === "all" || inst.specialty === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });

    // Sorting logic
    result.sort((a, b) => {
      if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
      if (sortBy === "courses") return (b.coursesCount || 0) - (a.coursesCount || 0);
      if (sortBy === "popular") return (b.studentsCount || 0) - (a.studentsCount || 0);
      return 0;
    });

    return result;
  }, [searchQuery, selectedCategory, sortBy, instructors]);

  return (
    <MainLayout>
      {/* High-Impact Hero Section */}
      <section className="relative bg-[#0F172A] pt-40 pb-52 overflow-hidden">
        {/* Animated Background Gradients */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3] 
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2] 
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" 
        />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(white,transparent)] opacity-10" />

        <div className="container mx-auto px-4 relative z-10">
          <Reveal>
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="outline" className="mb-6 px-6 py-2 border-primary/30 text-primary bg-primary/10 rounded-full text-sm font-black tracking-widest uppercase">
                {t("home.top_instructors")}
              </Badge>
              <h1 className="text-6xl md:text-8xl font-black mb-8 text-white tracking-tighter leading-none">
                {t("nav.instructors")}
              </h1>
              <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto mb-16 leading-relaxed font-medium">
                {t("instructor.hero_desc")}
              </p>
            </div>

            {/* Premium Search Bar */}
            <div className="max-w-3xl mx-auto relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-blue-500 to-purple-600 rounded-[2.5rem] blur opacity-25 group-focus-within:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative flex items-center bg-[#1E293B]/80 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-3 overflow-hidden shadow-2xl">
                <div className={cn("flex items-center flex-1 px-6", isAr ? "flex-row" : "flex-row-reverse")}>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t("instructor.search_placeholder")}
                    className="w-full h-14 bg-transparent outline-none text-white text-xl placeholder:text-slate-500 font-bold"
                  />
                  <Search className="w-8 h-8 text-slate-400 group-focus-within:text-primary transition-all transform group-focus-within:scale-110" />
                </div>
                <Button className="h-16 px-12 rounded-[1.5rem] font-black text-lg shadow-2xl shadow-primary/40 bg-primary hover:bg-primary/90 transition-all active:scale-95">
                  {isAr ? "ابحث الآن" : "Search Now"}
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Filters & Content Section */}
      <section className="container mx-auto px-4 -mt-24 relative z-20 pb-40">
        {/* Sticky Filter Bar */}
        <Reveal>
          <div className="bg-card/70 glass backdrop-blur-3xl border-2 border-white/10 rounded-[3rem] p-4 mb-16 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6 sticky top-28">
            {/* Category Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={cn(
                    "px-8 py-4 rounded-2xl text-sm font-black transition-all duration-300 transform active:scale-95",
                    selectedCategory === cat.id
                      ? "bg-primary text-white shadow-xl shadow-primary/20 scale-105"
                      : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="relative w-full lg:w-auto">
              <div className="flex items-center gap-3 px-6">
                <span className="text-sm font-black text-muted-foreground whitespace-nowrap">
                  {t("instructor.sort_label")}
                </span>
                <button 
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="flex items-center justify-between gap-4 px-6 py-4 bg-secondary/50 hover:bg-secondary rounded-2xl border border-border/50 min-w-[200px] transition-all group"
                >
                  <span className="font-black text-sm">
                    {sortOptions.find(opt => opt.id === sortBy)?.label}
                  </span>
                  <ChevronDown className={cn("w-5 h-5 transition-transform duration-300", isSortOpen && "rotate-180")} />
                </button>
              </div>

              <AnimatePresence>
                {isSortOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-6 left-6 lg:left-auto mt-2 w-auto min-w-[200px] bg-card glass border-2 border-white/10 rounded-2xl shadow-2xl p-2 z-50 overflow-hidden"
                  >
                    {sortOptions.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          setSortBy(opt.id);
                          setIsSortOpen(false);
                        }}
                        className={cn(
                          "w-full text-right px-6 py-3 rounded-xl text-sm font-bold transition-all",
                          sortBy === opt.id 
                            ? "bg-primary text-white" 
                            : "hover:bg-primary/10 text-muted-foreground hover:text-primary"
                        )}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Reveal>

        {/* Instructors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredInstructors.map((instructor, i) => (
            <Reveal key={instructor.id} delay={i * 0.1}>
              <motion.div 
                whileHover={{ y: -15 }}
                className="group relative h-full bg-card/40 glass border-2 border-transparent hover:border-primary/20 rounded-[3.5rem] p-8 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-primary/5 flex flex-col overflow-hidden"
              >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[4rem] -translate-y-8 translate-x-8 group-hover:translate-y-0 group-hover:translate-x-0 transition-transform duration-700" />
                
                {/* Image & Header */}
                <div className="relative mb-8 flex items-center gap-6">
                  <div className="relative w-32 h-32 shrink-0">
                    <div className="absolute inset-0 bg-primary/20 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border-4 border-background shadow-2xl transition-transform duration-700 group-hover:rotate-6">
                      <img
                        src={instructor.image}
                        alt={instructor.name}
                        className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-700"
                      />
                    </div>
                  </div>
                  <div>
                    <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] font-black px-4 py-1.5 rounded-xl mb-3 uppercase tracking-widest">
                      {categories.find(c => c.id === instructor.specialty)?.label || instructor.role}
                    </Badge>
                    <h3 className="text-2xl font-black mb-1 group-hover:text-primary transition-colors leading-tight">
                      {instructor.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className={cn("w-3 h-3", s <= Math.floor(instructor.rating || 0) ? "text-orange-400 fill-current" : "text-slate-300")} />
                        ))}
                      </div>
                      <span className="text-xs font-black text-muted-foreground">({instructor.rating})</span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 flex flex-col">
                  <p className="text-muted-foreground font-medium text-base line-clamp-3 mb-8 leading-relaxed">
                    {instructor.bio}
                  </p>

                  {/* Premium Stats Bar */}
                  <div className="grid grid-cols-2 gap-4 mb-10">
                    <div className="bg-secondary/30 p-4 rounded-[2rem] text-center border border-border/50 group-hover:bg-primary/5 group-hover:border-primary/20 transition-all duration-500">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <Users className="w-4 h-4 text-primary" />
                        <p className="font-black text-xl leading-none">
                          {(instructor.studentsCount || 0).toLocaleString()}
                        </p>
                      </div>
                      <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">
                        {t("instructor.student")}
                      </p>
                    </div>
                    <div className="bg-secondary/30 p-4 rounded-[2rem] text-center border border-border/50 group-hover:bg-primary/5 group-hover:border-primary/20 transition-all duration-500">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <BookOpen className="w-4 h-4 text-primary" />
                        <p className="font-black text-xl leading-none">
                          {instructor.coursesCount || 0}
                        </p>
                      </div>
                      <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">
                        {t("instructor.course")}
                      </p>
                    </div>
                  </div>

                  <Link
                    to={ROUTES.INSTRUCTOR_DETAILS.replace(":id", instructor.id)}
                    className="mt-auto"
                  >
                    <Button
                      className="w-full h-16 rounded-[1.5rem] font-black text-lg group/btn relative overflow-hidden bg-white dark:bg-slate-900 border-2 border-border hover:border-primary hover:bg-primary hover:text-white transition-all duration-500"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        {t("instructor.profile")}
                        {isAr ? (
                          <ArrowLeft className="w-6 h-6 group-hover/btn:-translate-x-2 transition-transform" />
                        ) : (
                          <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-2 transition-transform" />
                        )}
                      </span>
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Empty State */}
        {filteredInstructors.length === 0 && (
          <Reveal>
            <div className="text-center py-40 bg-card/40 glass border-2 border-dashed border-primary/10 rounded-[4rem] relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/5 animate-pulse" />
              <div className="relative z-10">
                <div className="w-40 h-40 bg-primary/5 rounded-[3rem] flex items-center justify-center mx-auto mb-10">
                  <Search className="w-20 h-20 text-primary/30" />
                </div>
                <h3 className="text-4xl font-black mb-6">
                  {t("instructor.no_results_title")}
                </h3>
                <p className="text-2xl text-muted-foreground font-medium max-w-md mx-auto mb-12 leading-relaxed">
                  {t("instructor.no_results_desc")}
                </p>
                <Button 
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                  className="h-16 px-12 rounded-2xl font-black text-lg shadow-2xl shadow-primary/20"
                >
                  {isAr ? "إعادة ضبط الفلاتر" : "Reset Filters"}
                </Button>
              </div>
            </div>
          </Reveal>
        )}
      </section>
    </MainLayout>
  );
};

export default Instructors;
