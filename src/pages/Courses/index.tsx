import { MainLayout } from "../../components/templates/MainLayout";
import { useTranslation } from "react-i18next";
import { CourseCard } from "../../components/molecules/CourseCard";
import { 
  Search, 
  BookOpen, 
  Sparkles, 
  SlidersHorizontal, 
  LayoutGrid, 
  List, 
  ChevronDown, 
  Star, 
  Clock, 
  BarChart3, 
  X,
  CheckCircle2,
  Trophy
} from "lucide-react";
import { Input } from "../../components/atoms/Input";
import { Button } from "../../components/atoms/Button";
import { SEO } from "../../components/atoms/SEO";
import { cn } from "../../utils/cn";
import { motion, AnimatePresence } from "framer-motion";

import { getMockCourses } from "../../data/mockData";
import { useMemo, useState } from "react";

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
    return courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
      
      // Mock filtering for level and duration since mock data might not have them yet
      // In a real app, these would come from the course object
      const matchesLevel = selectedLevel === "All"; 
      const matchesDuration = selectedDuration === "All";
      const matchesRating = selectedRating === 0;

      return matchesSearch && matchesCategory && matchesLevel && matchesDuration && matchesRating;
    });
  }, [courses, searchQuery, selectedCategory, selectedLevel, selectedDuration, selectedRating]);

  const categories = ["All", ...Array.from(new Set(courses.map(c => c.category || "Uncategorized")))];
  
  const levels = ["All", "beginner", "intermediate", "advanced"];
  const durations = ["All", "short", "medium", "long"];
  const ratings = [5, 4, 3];

  const sortOptions = [
    { value: "newest", label: t("courses.sort_newest") },
    { value: "best_selling", label: t("courses.sort_best_selling") },
    { value: "highest_rated", label: t("courses.sort_highest_rated") },
  ];

  const currentSortLabel = sortOptions.find(opt => opt.value === sortBy)?.label;

  return (
    <MainLayout>
      <SEO
        title={t("courses.title")}
        description={t("courses.description")}
      />
      
      {/* Hero Section - Redesigned for Premium Look */}
      <div className="relative min-h-[60vh] flex items-center bg-[#0B0F19] overflow-hidden pt-20">
        {/* Animated Background Gradients */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3] 
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2] 
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" 
        />
        
        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: isAr ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl text-primary font-bold text-sm mb-8 shadow-2xl"
              >
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <Sparkles className="w-4 h-4" />
                <span className="tracking-wide uppercase">{isAr ? "اكتشف مستقبلك التعليمي" : "Discover Your Future"}</span>
              </motion.div>
              
              <h1 className="text-6xl md:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tight">
                {isAr ? (
                  <>طوّر مهاراتك مع <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-primary bg-[length:200%_auto] animate-gradient">أفضل الدورات</span></>
                ) : (
                  <>Elevate Your Skills With <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-primary bg-[length:200%_auto] animate-gradient">Premium Courses</span></>
                )}
              </h1>
              
              <p className="text-xl text-slate-400 leading-relaxed mb-10 max-w-xl">
                {t("courses.description")}
              </p>

              <div className="flex flex-wrap gap-6 items-center">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-3 rtl:space-x-reverse">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-12 h-12 rounded-2xl border-4 border-[#0B0F19] bg-slate-800 overflow-hidden">
                        <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="Student" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <div className="text-sm">
                    <div className="text-white font-bold">+50k {isAr ? "طالب" : "Students"}</div>
                    <div className="text-slate-500">{isAr ? "يثقون بنا" : "Trust our platform"}</div>
                  </div>
                </div>
                <div className="h-10 w-px bg-white/10 hidden sm:block" />
                <div className="flex items-center gap-2 text-yellow-500">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="text-white font-bold text-lg">4.9/5</span>
                  <span className="text-slate-500">({isAr ? "٢٠ ألف تقييم" : "20k reviews"})</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="hidden lg:block relative"
            >
              <div className="relative z-10 p-8 glass rounded-[4rem] border border-white/10 shadow-2xl overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <img 
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Courses" 
                  className="rounded-[3rem] shadow-2xl relative z-10 transform group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Floating Stats Cards */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-12 -left-8 z-20 glass p-5 rounded-3xl border border-white/10 shadow-2xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center text-green-500">
                      <Trophy className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-white font-black text-xl">150+</div>
                      <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">{isAr ? "دورة معتمدة" : "Certified Courses"}</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
                  className="absolute bottom-12 -right-8 z-20 glass p-5 rounded-3xl border border-white/10 shadow-2xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-white font-black text-xl">100%</div>
                      <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">{isAr ? "ضمان النجاح" : "Success Rate"}</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-20 pb-24">
        {/* Main Search & Filter Bar - Sticky with Glass Effect */}
        <div className="sticky top-24 z-40 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-4 md:p-6 rounded-[2.5rem] border border-white/10 shadow-2xl shadow-black/40 backdrop-blur-2xl"
          >
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative flex-1 w-full">
                <Search className={cn(
                  "absolute top-1/2 -translate-y-1/2 text-primary w-5 h-5",
                  isAr ? "right-6" : "left-6"
                )} />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={cn(
                    "h-14 rounded-2xl bg-white/5 border-white/10 focus:border-primary/50 focus:bg-white/10 transition-all text-lg text-white placeholder:text-slate-500",
                    isAr ? "pr-14 pl-6" : "pl-14 pr-6"
                  )}
                  placeholder={t("courses.search_placeholder")}
                />
              </div>

              {/* Quick Categories */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full lg:w-auto pb-2 lg:pb-0">
                {categories.slice(0, 5).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "px-6 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap border",
                      selectedCategory === cat 
                        ? "bg-primary border-primary text-white shadow-lg shadow-primary/20" 
                        : "bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10"
                    )}
                  >
                    {cat === "All" ? (isAr ? "الكل" : "All") : cat}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3 w-full lg:w-auto">
                {/* Advanced Filter Trigger */}
                <Button 
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  variant="outline" 
                  className={cn(
                    "h-14 flex-1 lg:flex-none rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold flex items-center gap-2 px-6",
                    isSidebarOpen && "border-primary text-primary bg-primary/10"
                  )}
                >
                  <SlidersHorizontal className="w-5 h-5" />
                  <span className="hidden sm:inline">{t("courses.filter")}</span>
                </Button>

                {/* Sort Dropdown */}
                <div className="relative flex-1 lg:flex-none">
                  <Button 
                    onClick={() => setIsSortOpen(!isSortOpen)}
                    variant="outline" 
                    className="h-14 w-full rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold flex items-center justify-between gap-4 px-6"
                  >
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-primary" />
                      <span className="truncate">{currentSortLabel}</span>
                    </div>
                    <ChevronDown className={cn("w-4 h-4 transition-transform", isSortOpen && "rotate-180")} />
                  </Button>

                  <AnimatePresence>
                    {isSortOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full mt-2 right-0 w-56 glass border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-50"
                      >
                        {sortOptions.map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => {
                              setSortBy(opt.value);
                              setIsSortOpen(false);
                            }}
                            className={cn(
                              "w-full text-right p-4 text-sm font-bold transition-colors hover:bg-white/10",
                              sortBy === opt.value ? "text-primary bg-primary/5" : "text-slate-300"
                            )}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* View Mode */}
                <div className="hidden md:flex bg-white/5 p-1.5 rounded-2xl border border-white/10">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={cn(
                      "p-2.5 rounded-xl transition-all",
                      viewMode === "grid" ? "bg-primary text-white shadow-lg" : "text-slate-500 hover:text-white"
                    )}
                  >
                    <LayoutGrid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={cn(
                      "p-2.5 rounded-xl transition-all",
                      viewMode === "list" ? "bg-primary text-white shadow-lg" : "text-slate-500 hover:text-white"
                    )}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Advanced Filter Sidebar */}
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.aside
                initial={{ opacity: 0, x: isAr ? 50 : -50, width: 0 }}
                animate={{ opacity: 1, x: 0, width: 320 }}
                exit={{ opacity: 0, x: isAr ? 50 : -50, width: 0 }}
                className="hidden lg:block shrink-0"
              >
                <div className="glass p-8 rounded-[2.5rem] border border-white/10 sticky top-48">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-black text-white">{t("courses.filter")}</h3>
                    <button 
                      onClick={() => {
                        setSelectedLevel("All");
                        setSelectedDuration("All");
                        setSelectedRating(0);
                      }}
                      className="text-primary text-sm font-bold hover:underline"
                    >
                      {t("courses.filters.clear_all")}
                    </button>
                  </div>

                  {/* Level Filter */}
                  <div className="mb-8">
                    <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      {t("courses.filters.levels")}
                    </h4>
                    <div className="space-y-2">
                      {levels.map((level) => (
                        <button
                          key={level}
                          onClick={() => setSelectedLevel(level)}
                          className={cn(
                            "w-full flex items-center justify-between p-3 rounded-xl border transition-all font-bold text-sm",
                            selectedLevel === level
                              ? "bg-primary/10 border-primary/50 text-primary"
                              : "bg-white/5 border-transparent text-slate-400 hover:bg-white/10"
                          )}
                        >
                          {t(`courses.filters.${level === "All" ? "all_levels" : level}`)}
                          {selectedLevel === level && <CheckCircle2 className="w-4 h-4" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Duration Filter */}
                  <div className="mb-8">
                    <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {t("courses.filters.duration")}
                    </h4>
                    <div className="space-y-2">
                      {durations.map((duration) => (
                        <button
                          key={duration}
                          onClick={() => setSelectedDuration(duration)}
                          className={cn(
                            "w-full flex items-center justify-between p-3 rounded-xl border transition-all font-bold text-sm",
                            selectedDuration === duration
                              ? "bg-primary/10 border-primary/50 text-primary"
                              : "bg-white/5 border-transparent text-slate-400 hover:bg-white/10"
                          )}
                        >
                          {t(`courses.filters.${duration === "All" ? "all_levels" : duration}`)}
                          {selectedDuration === duration && <CheckCircle2 className="w-4 h-4" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Rating Filter */}
                  <div>
                    <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      {t("courses.filters.rating")}
                    </h4>
                    <div className="space-y-2">
                      {ratings.map((rating) => (
                        <button
                          key={rating}
                          onClick={() => setSelectedRating(rating)}
                          className={cn(
                            "w-full flex items-center gap-3 p-3 rounded-xl border transition-all font-bold text-sm",
                            selectedRating === rating
                              ? "bg-primary/10 border-primary/50 text-primary"
                              : "bg-white/5 border-transparent text-slate-400 hover:bg-white/10"
                          )}
                        >
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star key={s} className={cn("w-3 h-3", s <= rating ? "fill-yellow-500 text-yellow-500" : "text-slate-600")} />
                            ))}
                          </div>
                          <span>{rating}+ {isAr ? "نجوم" : "Stars"}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Courses Content Area */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {filteredCourses.length > 0 ? (
                <motion.div 
                  key={viewMode + searchQuery + selectedCategory + selectedLevel + selectedDuration + selectedRating}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={cn(
                    "grid gap-8",
                    viewMode === "grid" 
                      ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" 
                      : "grid-cols-1"
                  )}
                >
                  {filteredCourses.map((course, index) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <CourseCard
                        course={{
                          ...course,
                          id: String(course.id),
                          students: typeof course.students === "number" ? course.students : 0,
                        }}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-32 glass rounded-[3rem] border border-white/10 text-center px-8"
                >
                  <div className="w-24 h-24 bg-primary/10 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-primary">
                    <BookOpen className="w-12 h-12" />
                  </div>
                  <h3 className="text-3xl font-black text-white mb-4">{t("courses.no_results_title")}</h3>
                  <p className="text-xl text-slate-400 max-w-md mx-auto mb-10">
                    {t("courses.no_results_desc")}
                  </p>
                  <Button 
                    variant="primary" 
                    className="h-14 rounded-2xl px-10 font-black shadow-xl shadow-primary/20"
                    onClick={() => { 
                      setSearchQuery(""); 
                      setSelectedCategory("All");
                      setSelectedLevel("All");
                      setSelectedDuration("All");
                      setSelectedRating(0);
                    }}
                  >
                    {isAr ? "عرض جميع الدورات" : "Explore All Courses"}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pagination - Redesigned */}
            {filteredCourses.length > 0 && (
              <div className="mt-20 flex justify-center items-center gap-4">
                <Button 
                  variant="outline" 
                  className="w-14 h-14 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 text-white font-black shadow-xl"
                  disabled
                >
                  <ChevronDown className={cn("w-6 h-6", isAr ? "-rotate-90" : "rotate-90")} />
                </Button>
                <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-[1.5rem] border border-white/10 backdrop-blur-xl">
                  <button className="w-12 h-12 rounded-xl bg-primary text-white font-black shadow-lg shadow-primary/20">1</button>
                  <button className="w-12 h-12 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 font-black transition-all">2</button>
                  <button className="w-12 h-12 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 font-black transition-all">3</button>
                  <span className="w-8 text-center text-slate-600 font-black">...</span>
                  <button className="w-12 h-12 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 font-black transition-all">12</button>
                </div>
                <Button 
                  variant="outline" 
                  className="w-14 h-14 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 text-white font-black shadow-xl"
                >
                  <ChevronDown className={cn("w-6 h-6", isAr ? "rotate-90" : "-rotate-90")} />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-[100]">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: isAr ? "100%" : "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: isAr ? "100%" : "-100%" }}
              className={cn(
                "absolute top-0 bottom-0 w-[85%] max-w-[400px] bg-[#0B0F19] border-white/10 p-8 pt-24 overflow-y-auto",
                isAr ? "right-0 border-l" : "left-0 border-r"
              )}
            >
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="absolute top-8 right-8 w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-center justify-between mb-12">
                <h3 className="text-2xl font-black text-white">{t("courses.filter")}</h3>
                <button 
                  onClick={() => {
                    setSelectedLevel("All");
                    setSelectedDuration("All");
                    setSelectedRating(0);
                  }}
                  className="text-primary font-bold"
                >
                  {t("courses.filters.clear_all")}
                </button>
              </div>

              {/* Mobile Filter Sections (Same as Desktop but styled for mobile) */}
              <div className="space-y-10">
                {/* Categories */}
                <div>
                  <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6">{t("courses.filters.categories")}</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={cn(
                          "p-4 rounded-2xl border transition-all font-bold text-xs text-center",
                          selectedCategory === cat
                            ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                            : "bg-white/5 border-white/10 text-slate-400"
                        )}
                      >
                        {cat === "All" ? (isAr ? "الكل" : "All") : cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Level */}
                <div>
                  <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6">{t("courses.filters.levels")}</h4>
                  <div className="space-y-3">
                    {levels.map((level) => (
                      <button
                        key={level}
                        onClick={() => setSelectedLevel(level)}
                        className={cn(
                          "w-full flex items-center justify-between p-4 rounded-2xl border transition-all font-bold",
                          selectedLevel === level
                            ? "bg-primary/10 border-primary/50 text-primary"
                            : "bg-white/5 border-white/10 text-slate-400"
                        )}
                      >
                        {t(`courses.filters.${level === "All" ? "all_levels" : level}`)}
                        {selectedLevel === level && <CheckCircle2 className="w-5 h-5" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6">{t("courses.filters.rating")}</h4>
                  <div className="space-y-3">
                    {ratings.map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setSelectedRating(rating)}
                        className={cn(
                          "w-full flex items-center gap-4 p-4 rounded-2xl border transition-all font-bold",
                          selectedRating === rating
                            ? "bg-primary/10 border-primary/50 text-primary"
                            : "bg-white/5 border-white/10 text-slate-400"
                        )}
                      >
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} className={cn("w-4 h-4", s <= rating ? "fill-yellow-500 text-yellow-500" : "text-slate-600")} />
                          ))}
                        </div>
                        <span>{rating}+ {isAr ? "نجوم" : "Stars"}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => setIsSidebarOpen(false)}
                className="w-full h-16 rounded-2xl mt-12 font-black text-lg shadow-2xl shadow-primary/30"
              >
                {t("courses.filters.show_results")}
              </Button>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </MainLayout>
  );
};

export default Courses;
