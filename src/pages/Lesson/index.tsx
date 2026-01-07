import { useParams, Link, useNavigate } from "react-router-dom";
import { MainLayout } from "../../components/templates/MainLayout";
import { useTranslation } from "react-i18next";
import {
  Play,
  CheckCircle,
  Lock,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  FileText,
  MessageCircle,
  Info,
  Clock,
  Star,
  Download,
  Share2,
  Bookmark,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Settings,
  Volume2,
  MoreVertical,
  Circle,
  PlayCircle,
} from "lucide-react";
import { Button } from "../../components/atoms/Button";
import { useMemo, useState, useEffect } from "react";
import { cn } from "../../utils/cn";
import { ROUTES } from "../../constants/routes";
import { getMockCourses } from "../../data/mockData";
import { motion, AnimatePresence } from "framer-motion";
import type {
  Course,
  CurriculumSection,
  Lesson as LessonType,
} from "../../types";

const Lesson = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "overview" | "resources" | "discussions"
  >("overview");
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
        const lesson = section.lessons.find((l: LessonType) => l.id === lessonId);
        if (lesson) return lesson;
      }
      return course.curriculum[0].lessons[0];
    }
    return { id: "", title: "", duration: "" };
  }, [course, lessonId]);

  // Navigation Logic
  const navigation = useMemo(() => {
    const allLessons = (course.curriculum || []).flatMap((s: CurriculumSection) => s.lessons);
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
    const path = ROUTES.LESSON
      .replace(":courseId", course.id.toString())
      .replace(":lessonId", newLessonId);
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
          {/* Top Navigation Bar */}
          <div className="bg-white/5 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-white/10 text-white"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
              <div className="hidden md:block">
                <nav className="flex items-center gap-2 text-xs text-white/40 mb-1">
                  <Link to={ROUTES.COURSES} className="hover:text-primary transition-colors">{t("courses.title")}</Link>
                  <ChevronRight className={cn("w-3 h-3", isAr && "rotate-180")} />
                  <Link
                    to={ROUTES.COURSE_DETAILS.replace(":id", course.id.toString())}
                    className="hover:text-primary transition-colors truncate max-w-[150px]"
                  >
                    {course.title}
                  </Link>
                </nav>
                <h1 className="text-sm font-bold text-white truncate max-w-[200px] lg:max-w-md">
                  {currentLesson.title}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3 lg:gap-6">
              <div className="hidden sm:flex items-center gap-4">
                <div className="text-right">
                  <p className="text-[10px] text-white/40 uppercase font-bold tracking-wider">
                    {t("lesson.progress")}
                  </p>
                  <p className="text-xs font-bold text-primary">
                    {Math.round((navigation.current / navigation.total) * 100)}%
                  </p>
                </div>
                <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(navigation.current / navigation.total) * 100}%`,
                    }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-primary to-blue-400"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 border-l border-white/10 pl-4">
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={!navigation.prev}
                  className="text-white/70 hover:text-white hover:bg-white/10 h-9"
                  onClick={() => navigation.prev && handleLessonChange(navigation.prev.id)}
                >
                  {isAr ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                  <span className="hidden sm:inline mx-2">{t("lesson.prev_lesson")}</span>
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  disabled={!navigation.next}
                  className="h-9 px-4 shadow-lg shadow-primary/20"
                  onClick={() => navigation.next && handleLessonChange(navigation.next.id)}
                >
                  <span className="hidden sm:inline mx-2">{t("lesson.next_lesson")}</span>
                  {isAr ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Video Player Section */}
          <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#0B0F19]">
            <div className="relative group max-w-6xl mx-auto mt-4 px-4">
              <div className="aspect-video relative rounded-[2rem] overflow-hidden shadow-2xl shadow-black/50 border border-white/10 bg-black">
                {/* Mock Video Player Interface */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/80 via-transparent to-black/40">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center backdrop-blur-md border border-white/20 cursor-pointer group/play"
                  >
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-xl shadow-primary/40 group-hover/play:bg-primary/90 transition-colors">
                      <Play className="w-8 h-8 text-white fill-current ml-1" />
                    </div>
                  </motion.div>

                  {/* Video Controls Overlay (Always visible on hover, or some elements always) */}
                  <div className="absolute bottom-0 inset-x-0 p-6 flex flex-col gap-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-t from-black/90 to-transparent">
                    {/* Progress Bar */}
                    <div className="relative h-1.5 w-full bg-white/20 rounded-full cursor-pointer">
                      <div className="absolute inset-y-0 left-0 w-1/3 bg-primary rounded-full">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg scale-0 group-hover:scale-100 transition-transform" />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <button className="text-white hover:text-primary transition-colors">
                          <Play className="w-5 h-5 fill-current" />
                        </button>
                        <div className="flex items-center gap-3">
                          <Volume2 className="w-5 h-5 text-white" />
                          <div className="w-20 h-1 bg-white/20 rounded-full">
                            <div className="h-full w-3/4 bg-white rounded-full" />
                          </div>
                        </div>
                        <span className="text-xs font-medium text-white/80 tabular-nums">12:45 / 45:20</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <button className="text-white hover:text-primary transition-colors">
                          <Settings className="w-5 h-5" />
                        </button>
                        <button className="text-white hover:text-primary transition-colors">
                          <Maximize2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Overlay for Locked Lessons */}
                {!currentLesson.isPreview && !course.isPurchased && (
                  <div className="absolute inset-0 bg-[#0B0F19]/95 backdrop-blur-2xl flex flex-col items-center justify-center p-8 text-center z-20">
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center mb-8 border border-primary/20 shadow-2xl shadow-primary/10"
                    >
                      <Lock className="w-10 h-10 text-primary" />
                    </motion.div>
                    <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">
                      {t("lesson.locked_title")}
                    </h2>
                    <p className="text-white/50 max-w-md mb-10 text-lg leading-relaxed">
                      {t("lesson.locked_desc")}
                    </p>
                    <Button 
                      size="lg" 
                      className="px-12 py-7 rounded-2xl text-lg font-bold shadow-xl shadow-primary/30 hover:scale-105 transition-transform"
                    >
                      {t("course.enroll_now")}
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Content Tabs & Details */}
            <div className="max-w-5xl mx-auto w-full p-6 md:p-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20">
                      Section {navigation.current}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="text-white/40 text-xs flex items-center gap-1.5 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      {currentLesson.duration}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                    {currentLesson.title}
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-12 h-12 rounded-2xl bg-white/5 text-white/70 hover:text-primary hover:bg-primary/10 border border-white/5 transition-all"
                  >
                    <Bookmark className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-12 h-12 rounded-2xl bg-white/5 text-white/70 hover:text-primary hover:bg-primary/10 border border-white/5 transition-all"
                  >
                    <Share2 className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-12 h-12 rounded-2xl bg-white/5 text-white/70 hover:text-primary hover:bg-primary/10 border border-white/5 transition-all md:hidden"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Custom Animated Tabs */}
              <div className="border-b border-white/10 mb-10 flex items-center gap-10 overflow-x-auto no-scrollbar relative">
                {(
                  [
                    {
                      id: "overview",
                      label: t("lesson.overview"),
                      icon: Info,
                    },
                    {
                      id: "resources",
                      label: t("lesson.resources"),
                      icon: FileText,
                    },
                    {
                      id: "discussions",
                      label: t("lesson.discussions"),
                      icon: MessageCircle,
                    },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center gap-2.5 py-5 transition-all relative group",
                      activeTab === tab.id
                        ? "text-primary font-bold"
                        : "text-white/40 hover:text-white"
                    )}
                  >
                    <tab.icon className={cn("w-4.5 h-4.5 transition-colors", activeTab === tab.id ? "text-primary" : "text-white/40 group-hover:text-white")} />
                    <span className="text-sm tracking-wide">{tab.label}</span>
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTabLesson"
                        className="absolute inset-x-0 bottom-0 h-0.5 bg-primary shadow-[0_-4px_10px_rgba(var(--primary-rgb),0.5)]"
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="min-h-[400px]"
                >
                  {activeTab === "overview" && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                      <div className="lg:col-span-2 space-y-8">
                        <section>
                          <h3 className="text-xl font-bold text-white mb-5 flex items-center gap-3">
                            <div className="w-1.5 h-6 bg-primary rounded-full" />
                            {t("lesson.about_lesson")}
                          </h3>
                          <p className="text-white/60 leading-relaxed text-lg">
                            {course.description}
                          </p>
                        </section>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                          <motion.div 
                            whileHover={{ y: -5 }}
                            className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-sm"
                          >
                            <h4 className="text-white font-bold mb-6 flex items-center gap-3 text-lg">
                              <Star className="w-5 h-5 text-yellow-500 fill-current" />
                              {t("lesson.learning_objectives")}
                            </h4>
                            <ul className="space-y-4">
                              {course.learningPoints
                                ?.slice(0, 3)
                                .map((point: string, i: number) => (
                                  <li
                                    key={i}
                                    className="flex items-start gap-3 text-sm text-white/50 group"
                                  >
                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors shrink-0" />
                                    <span className="leading-relaxed group-hover:text-white/80 transition-colors">{point}</span>
                                  </li>
                                ))}
                            </ul>
                          </motion.div>
                          
                          <motion.div 
                            whileHover={{ y: -5 }}
                            className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-sm"
                          >
                            <h4 className="text-white font-bold mb-6 flex items-center gap-3 text-lg">
                              <Info className="w-5 h-5 text-primary" />
                              {t("lesson.instructor_notes")}
                            </h4>
                            <div className="relative">
                              <span className="absolute -top-4 -left-2 text-6xl text-white/5 font-serif">"</span>
                              <p className="text-sm text-white/50 leading-relaxed italic relative z-10">
                                Make sure to practice the concepts discussed in
                                this lesson. Download the starter files from the
                                resources tab to follow along and experiment with the code.
                              </p>
                            </div>
                          </motion.div>
                        </div>
                      </div>

                      <div className="space-y-8">
                        {/* Instructor Quick Info */}
                        <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
                          <h4 className="text-white font-bold mb-6 text-lg">{t("course.instructor")}</h4>
                          <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-2xl bg-white/10 overflow-hidden border border-white/10 flex items-center justify-center">
                              <Circle className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                              <p className="text-white font-bold">{course.instructor}</p>
                              <p className="text-xs text-white/40">{t("instructor.role")}</p>
                            </div>
                          </div>
                          <Button variant="outline" className="w-full rounded-xl border-white/10 text-white hover:bg-white/5">
                            {t("course.view_profile")}
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "resources" && (
                    <div className="max-w-4xl space-y-6">
                      <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-bold text-white">
                          {t("lesson.downloadable_resources")}
                        </h3>
                        <span className="text-sm text-white/40 font-medium">3 {t("lesson.resources").toLowerCase()}</span>
                      </div>
                      {[
                        {
                          name: "Starter Project Files",
                          type: "ZIP",
                          size: "12.5 MB",
                          color: "bg-blue-500",
                        },
                        {
                          name: "Lesson Transcript",
                          type: "PDF",
                          size: "1.2 MB",
                          color: "bg-red-500",
                        },
                        {
                          name: "Cheat Sheet: Keyboard Shortcuts",
                          type: "PDF",
                          size: "850 KB",
                          color: "bg-orange-500",
                        },
                      ].map((resource, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center justify-between p-6 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-primary/30 transition-all group"
                        >
                          <div className="flex items-center gap-6">
                            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg", resource.color)}>
                              <FileText className="w-7 h-7" />
                            </div>
                            <div>
                              <p className="font-bold text-white text-lg group-hover:text-primary transition-colors">
                                {resource.name}
                              </p>
                              <p className="text-sm text-white/40 uppercase font-bold tracking-widest mt-1">
                                {resource.type} • {resource.size}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-12 h-12 rounded-2xl bg-white/5 text-white/70 hover:text-white hover:bg-primary transition-all"
                          >
                            <Download className="w-5 h-5" />
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {activeTab === "discussions" && (
                    <div className="max-w-4xl space-y-12">
                      <div className="relative group">
                        <div className="flex items-start gap-5">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-blue-600 shrink-0 flex items-center justify-center text-white font-bold shadow-lg shadow-primary/20">
                            JD
                          </div>
                          <div className="flex-1">
                            <div className="relative">
                              <textarea
                                placeholder={t("lesson.add_comment")}
                                className="w-full bg-white/[0.03] border border-white/10 rounded-[2rem] p-6 text-white text-lg focus:ring-2 focus:ring-primary/50 outline-none min-h-[150px] transition-all placeholder:text-white/20"
                              />
                              <div className="absolute bottom-4 right-4 flex items-center gap-3">
                                <Button className="rounded-xl px-8 py-3 h-auto font-bold shadow-lg shadow-primary/20">
                                  {t("lesson.post_comment")}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-10">
                        <h3 className="text-xl font-bold text-white flex items-center gap-3">
                          Recent Comments
                          <span className="text-sm text-white/40 font-normal">(24)</span>
                        </h3>
                        {[1, 2, 3].map((i) => (
                          <motion.div 
                            key={i} 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex gap-6 group"
                          >
                            <div className="w-12 h-12 rounded-2xl bg-white/5 shrink-0 overflow-hidden border border-white/10">
                              <img
                                src={`https://i.pravatar.cc/100?img=${i + 10}`}
                                alt="Avatar"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 space-y-3">
                              <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-6 group-hover:bg-white/[0.04] transition-colors">
                                <div className="flex items-center justify-between mb-3">
                                  <h4 className="font-bold text-white">Alex Johnson</h4>
                                  <span className="text-[10px] text-white/30 uppercase font-bold tracking-widest">
                                    {i * 2} hours ago
                                  </span>
                                </div>
                                <p className="text-white/60 leading-relaxed">
                                  This lesson was absolutely brilliant! The explanation of the core concepts 
                                  really helped me understand how to structure my project. Looking forward to the next part!
                                </p>
                              </div>
                              <div className="flex items-center gap-6 px-4">
                                <button className="text-xs text-primary font-bold hover:underline uppercase tracking-widest">
                                  Reply
                                </button>
                                <button className="text-xs text-white/30 font-bold hover:text-white transition-colors uppercase tracking-widest">
                                  Helpful (12)
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                        
                        <Button variant="ghost" className="w-full py-8 text-white/40 hover:text-white hover:bg-white/5 rounded-[2rem] border border-dashed border-white/10">
                          Load More Comments
                        </Button>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Sidebar - Course Content */}
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              {/* Mobile Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] lg:hidden"
                onClick={() => setIsSidebarOpen(false)}
              />

              <motion.aside
                initial={isAr ? { x: "100%" } : { x: "-100%" }}
                animate={{ x: 0 }}
                exit={isAr ? { x: "100%" } : { x: "-100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 200 }}
                className={cn(
                  "fixed lg:relative top-0 bottom-0 w-[85%] sm:w-[400px] lg:w-[450px] bg-[#0F1420] border-white/10 z-[101] flex flex-col shadow-2xl overflow-hidden",
                  isAr ? "right-0 lg:border-l" : "left-0 lg:border-r"
                )}
              >
                {/* Sidebar Header */}
                <div className="p-8 border-b border-white/10 bg-gradient-to-b from-white/5 to-transparent">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">{t("lesson.course_content")}</h2>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="lg:hidden text-white/60"
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                  
                  {/* Global Progress */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest">
                      <span className="text-white/40">{t("lesson.progress")}</span>
                      <span className="text-primary">{Math.round((navigation.current / navigation.total) * 100)}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(navigation.current / navigation.total) * 100}%` }}
                        className="h-full bg-gradient-to-r from-primary to-blue-400"
                      />
                    </div>
                    <p className="text-[10px] text-white/30 font-medium">
                      {navigation.current} / {navigation.total} {t("lesson.resources").toLowerCase()}
                    </p>
                  </div>
                </div>

                {/* Content List */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
                  <div className="space-y-4">
                    {course.curriculum?.map((section: CurriculumSection, sIdx: number) => (
                      <div key={sIdx} className="space-y-2">
                        <button
                          onClick={() => toggleSection(sIdx)}
                          className={cn(
                            "w-full flex items-center justify-between p-5 rounded-2xl transition-all group",
                            expandedSections.includes(sIdx) 
                              ? "bg-white/5 text-white" 
                              : "hover:bg-white/[0.02] text-white/60"
                          )}
                        >
                          <div className="flex items-center gap-4">
                            <div className={cn(
                              "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-all",
                              expandedSections.includes(sIdx) ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-white/5 text-white/40 group-hover:text-white/60"
                            )}>
                              {sIdx + 1}
                            </div>
                            <div className="text-left">
                              <h3 className="font-bold text-sm leading-tight group-hover:text-white transition-colors">{section.title}</h3>
                              <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest mt-1">
                                {section.lessons.length} Lessons • 45m
                              </p>
                            </div>
                          </div>
                          {expandedSections.includes(sIdx) ? (
                            <ChevronUp className="w-4 h-4 text-white/40" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-white/40" />
                          )}
                        </button>

                        <AnimatePresence>
                          {expandedSections.includes(sIdx) && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden px-2 space-y-1"
                            >
                              {section.lessons.map((lesson: LessonType, lIdx: number) => {
                                const isActive = lesson.id === lessonId;
                                const isCompleted = lIdx < 2; // Mock completed state
                                
                                return (
                                  <button
                                    key={lesson.id}
                                    onClick={() => handleLessonChange(lesson.id)}
                                    className={cn(
                                      "w-full flex items-center gap-4 p-4 rounded-xl transition-all group relative",
                                      isActive 
                                        ? "bg-primary/10 text-primary" 
                                        : "hover:bg-white/[0.03] text-white/50 hover:text-white"
                                    )}
                                  >
                                    {isActive && (
                                      <motion.div 
                                        layoutId="activeLessonIndicator"
                                        className={cn(
                                          "absolute top-0 bottom-0 w-1 bg-primary rounded-full",
                                          isAr ? "right-0" : "left-0"
                                        )}
                                      />
                                    )}
                                    
                                    <div className="shrink-0">
                                      {isCompleted ? (
                                        <CheckCircle className="w-5 h-5 text-green-500 fill-green-500/10" />
                                      ) : isActive ? (
                                        <PlayCircle className="w-5 h-5 text-primary fill-primary/10" />
                                      ) : (
                                        <Circle className="w-5 h-5 text-white/10 group-hover:text-white/30 transition-colors" />
                                      )}
                                    </div>
                                    
                                    <div className="flex-1 text-left min-w-0">
                                      <p className={cn(
                                        "text-xs font-medium truncate transition-colors",
                                        isActive ? "text-primary" : "text-white/60 group-hover:text-white"
                                      )}>
                                        {lesson.title}
                                      </p>
                                      <p className="text-[10px] text-white/30 font-bold mt-1 uppercase tracking-widest">
                                        {lesson.duration}
                                      </p>
                                    </div>

                                    {!lesson.isPreview && !course.isPurchased && (
                                      <Lock className="w-3.5 h-3.5 text-white/20" />
                                    )}
                                  </button>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Sidebar Footer */}
                <div className="p-8 border-t border-white/10 bg-white/[0.02]">
                  <Button variant="outline" className="w-full rounded-2xl border-white/10 text-white hover:bg-white/5 h-12 font-bold flex items-center justify-center gap-3">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    {t("lesson.mark_as_complete")}
                  </Button>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </div>
    </MainLayout>
  );
};

export default Lesson;
