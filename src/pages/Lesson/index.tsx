import { useParams, Link } from "react-router-dom";
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
  Bookmark
} from "lucide-react";
import { Button } from "../../components/atoms/Button";
import { useMemo, useState, useEffect } from "react";
import { cn } from "../../utils/cn";
import { ROUTES } from "../../constants/routes";
import { getMockCourses } from "../../data/mockData";
import { motion, AnimatePresence } from "framer-motion";
import type { Course, CurriculumSection, Lesson as LessonType } from "../../types";

const Lesson = () => {
  const { courseId, lessonId } = useParams();
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "resources" | "discussions">("overview");

  // Mock course data
  const coursesDB = useMemo(() => getMockCourses(i18n.language), [i18n.language]);
  const course = useMemo((): Course => {
    return (coursesDB.find(c => c.id.toString() === courseId) || coursesDB[0]) as Course;
  }, [courseId, coursesDB]);

  // Find current lesson
  const currentLesson = useMemo((): LessonType => {
    if (course.curriculum) {
      for (const section of course.curriculum) {
        const lesson = section.lessons.find(l => l.id === lessonId);
        if (lesson) return lesson;
      }
      return course.curriculum[0].lessons[0];
    }
    return { id: "", title: "", duration: "" };
  }, [course, lessonId]);

  // Navigation Logic
  const navigation = useMemo(() => {
    const allLessons = (course.curriculum || []).flatMap(s => s.lessons);
    const currentIndex = allLessons.findIndex(l => l.id === (lessonId || allLessons[0]?.id));
    return {
      prev: currentIndex > 0 ? allLessons[currentIndex - 1] : null,
      next: currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null,
      current: currentIndex + 1,
      total: allLessons.length
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

  return (
    <MainLayout>
      <div className={cn(
        "flex flex-col min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-950 transition-all duration-300",
        isAr ? "lg:flex-row-reverse" : "lg:flex-row"
      )}>
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Info Bar */}
          <div className="bg-white dark:bg-slate-900 border-b px-4 py-3 flex items-center justify-between sticky top-0 z-30">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div className="hidden sm:block">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{course.title}</p>
                <h1 className="text-sm font-bold truncate max-w-[200px] md:max-w-md">{currentLesson.title}</h1>
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <div className="hidden md:flex items-center gap-2 mr-4">
                <div className="text-right">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold">{t("lesson.progress") || "Your Progress"}</p>
                  <p className="text-xs font-bold text-primary">{Math.round((navigation.current / navigation.total) * 100)}%</p>
                </div>
                <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(navigation.current / navigation.total) * 100}%` }}
                    className="h-full bg-primary"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-1 border-l dark:border-slate-800 pl-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  disabled={!navigation.prev}
                  className="gap-2"
                  onClick={() => {/* Navigate to prev */}}
                >
                  {isAr ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                  <span className="hidden sm:inline">{t("common.previous") || "Previous"}</span>
                </Button>
                <Button 
                  variant="primary" 
                  size="sm" 
                  disabled={!navigation.next}
                  className="gap-2"
                  onClick={() => {/* Navigate to next */}}
                >
                  <span className="hidden sm:inline">{t("common.next") || "Next"}</span>
                  {isAr ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Video Player Section */}
          <div className="flex-1 overflow-y-auto">
            <div className="bg-black aspect-video relative group">
              {/* This would be the actual video player component */}
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900/40">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform cursor-pointer">
                  <Play className="w-10 h-10 text-white fill-current" />
                </div>
              </div>
              
              {/* Overlay for Locked Lessons */}
              {!currentLesson.isPreview && !course.isPurchased && (
                <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-20">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <Lock className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">{t("lesson.locked_title") || "This lesson is locked"}</h2>
                  <p className="text-slate-400 max-w-md mb-8">{t("lesson.locked_desc") || "Please enroll in the course to get access to all lessons and materials."}</p>
                  <Button size="lg" className="px-8">{t("course.enroll_now") || "Enroll Now"}</Button>
                </div>
              )}
            </div>

            {/* Content Tabs & Details */}
            <div className="max-w-5xl mx-auto w-full p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold uppercase">Section {navigation.current}</span>
                    <span className="text-muted-foreground text-xs">•</span>
                    <span className="text-muted-foreground text-xs flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {currentLesson.duration}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold">{currentLesson.title}</h2>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Bookmark className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Custom Tabs */}
              <div className="border-b mb-8 flex items-center gap-8 overflow-x-auto no-scrollbar">
                {[
                  { id: "overview", label: t("lesson.overview") || "Overview", icon: Info },
                  { id: "resources", label: t("lesson.resources") || "Resources", icon: FileText },
                  { id: "discussions", label: t("lesson.discussions") || "Discussions", icon: MessageCircle },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={cn(
                      "flex items-center gap-2 py-4 border-b-2 transition-all relative",
                      activeTab === tab.id 
                        ? "border-primary text-primary font-bold" 
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                    {activeTab === tab.id && (
                      <motion.div layoutId="activeTab" className="absolute inset-x-0 -bottom-[2px] h-[2px] bg-primary" />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="min-h-[300px]"
                >
                  {activeTab === "overview" && (
                    <div className="prose dark:prose-invert max-w-none">
                      <h3 className="text-xl font-bold mb-4">{t("lesson.about_lesson") || "About this lesson"}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {course.description}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border shadow-sm">
                          <h4 className="font-bold mb-4 flex items-center gap-2">
                            <Star className="w-4 h-4 text-orange-400 fill-current" />
                            {t("lesson.learning_objectives") || "Learning Objectives"}
                          </h4>
                          <ul className="space-y-3">
                            {course.learningPoints?.slice(0, 3).map((point: string, i: number) => (
                              <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                                <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border shadow-sm">
                          <h4 className="font-bold mb-4 flex items-center gap-2">
                            <Info className="w-4 h-4 text-primary" />
                            {t("lesson.instructor_notes") || "Instructor Notes"}
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed italic">
                            "Make sure to practice the concepts discussed in this lesson. Download the starter files from the resources tab to follow along."
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "resources" && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold mb-6">{t("lesson.downloadable_resources") || "Downloadable Resources"}</h3>
                      {[
                        { name: "Starter Project Files", type: "ZIP", size: "12.5 MB" },
                        { name: "Lesson Transcript", type: "PDF", size: "1.2 MB" },
                        { name: "Cheat Sheet: Keyboard Shortcuts", type: "PDF", size: "850 KB" },
                      ].map((resource, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-xl border bg-white dark:bg-slate-900 hover:border-primary/50 transition-colors group">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                              <FileText className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <p className="font-bold text-sm group-hover:text-primary transition-colors">{resource.name}</p>
                              <p className="text-xs text-muted-foreground uppercase">{resource.type} • {resource.size}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" className="rounded-full">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === "discussions" && (
                    <div className="space-y-8">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0 overflow-hidden">
                          <img src="https://i.pravatar.cc/100?img=3" alt="Avatar" />
                        </div>
                        <div className="flex-1">
                          <textarea 
                            placeholder={t("lesson.add_comment") || "Add a comment or ask a question..."}
                            className="w-full bg-white dark:bg-slate-900 border rounded-xl p-4 text-sm focus:ring-2 focus:ring-primary outline-none min-h-[100px] transition-all"
                          />
                          <div className="flex justify-end mt-2">
                            <Button size="sm">{t("lesson.post_comment") || "Post Comment"}</Button>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        {[1, 2].map(i => (
                          <div key={i} className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0 overflow-hidden">
                              <img src={`https://i.pravatar.cc/100?img=${i+5}`} alt="Avatar" />
                            </div>
                            <div className="flex-1">
                              <div className="bg-white dark:bg-slate-900 border rounded-2xl p-4">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-bold text-sm">User Name</h4>
                                  <span className="text-[10px] text-muted-foreground uppercase font-medium">2 hours ago</span>
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                  This lesson was very helpful! I have a question regarding the second part of the implementation...
                                </p>
                              </div>
                              <button className="text-xs text-primary font-bold mt-2 ml-2 hover:underline">Reply</button>
                            </div>
                          </div>
                        ))}
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
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" 
                onClick={() => setIsSidebarOpen(false)}
              />
              
              <motion.div 
                initial={isAr ? { x: 400 } : { x: -400 }}
                animate={{ x: 0 }}
                exit={isAr ? { x: 400 } : { x: -400 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className={cn(
                  "fixed lg:relative inset-y-0 z-50 w-[320px] lg:w-[400px] bg-white dark:bg-slate-900 flex flex-col border-slate-200 dark:border-slate-800 shadow-2xl lg:shadow-none",
                  isAr ? "right-0 border-l" : "left-0 border-r"
                )}
              >
                <div className="p-6 border-b flex items-center justify-between">
                  <div>
                    <h2 className="font-bold text-lg">{t("lesson.course_content") || "Course Content"}</h2>
                    <p className="text-xs text-muted-foreground mt-1">{navigation.total} Lessons • {course.duration}</p>
                  </div>
                  <Button size="icon" variant="ghost" onClick={() => setIsSidebarOpen(false)}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                
                <div className="flex-1 overflow-y-auto no-scrollbar">
                  {course.curriculum?.map((section: CurriculumSection, idx: number) => (
                    <div key={idx} className="border-b last:border-0 dark:border-slate-800">
                      <div className="p-4 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between group">
                        <span className="font-bold text-xs uppercase tracking-wider text-muted-foreground">{section.title}</span>
                        <span className="text-[10px] font-bold bg-white dark:bg-slate-900 px-2 py-0.5 rounded-full border shadow-sm">{section.lessons.length}</span>
                      </div>
                      <div className="py-1">
                        {section.lessons.map((lesson: LessonType) => (
                          <Link 
                            key={lesson.id}
                            to={`${ROUTES.LESSON.replace(":courseId", courseId || "1").replace(":lessonId", lesson.id)}`}
                            className={cn(
                              "px-6 py-4 flex items-center gap-4 transition-all relative group",
                              lesson.id === lessonId 
                                ? "bg-primary/5 text-primary" 
                                : "hover:bg-slate-50 dark:hover:bg-slate-800/50 text-foreground"
                            )}
                          >
                            {lesson.id === lessonId && (
                              <motion.div 
                                layoutId="activeLesson" 
                                className={cn(
                                  "absolute inset-y-0 w-1 bg-primary",
                                  isAr ? "right-0" : "left-0"
                                )} 
                              />
                            )}
                            
                            <div className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-colors",
                              lesson.id === lessonId 
                                ? "bg-primary border-primary text-white" 
                                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-muted-foreground group-hover:border-primary/50 group-hover:text-primary"
                            )}>
                              {!lesson.isPreview && !course.isPurchased ? (
                                <Lock className="w-3.5 h-3.5" />
                              ) : (
                                <Play className={cn("w-3.5 h-3.5", lesson.id === lessonId && "fill-current")} />
                              )}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <p className={cn(
                                "text-sm font-bold leading-tight truncate",
                                lesson.id === lessonId ? "text-primary" : "text-foreground"
                              )}>
                                {lesson.title}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {lesson.duration}
                                </span>
                                {lesson.free && (
                                  <span className="text-[9px] font-black text-green-500 uppercase tracking-tighter">Preview</span>
                                )}
                              </div>
                            </div>
                            
                            {lesson.id === lessonId && (
                              <CheckCircle className="w-4 h-4 text-primary animate-in zoom-in duration-300" />
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Sidebar Bottom Action */}
                {!course.isPurchased && (
                  <div className="p-6 border-t dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                    <p className="text-xs text-center text-muted-foreground mb-4">Enroll to unlock 85% more content</p>
                    <Button className="w-full shadow-lg shadow-primary/20">Upgrade to Full Access</Button>
                  </div>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Floating Sidebar Toggle for Desktop (When closed) */}
        {!isSidebarOpen && (
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className={cn(
              "fixed bottom-8 z-30 bg-primary text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all hidden lg:block animate-in slide-in-from-bottom-4 duration-500",
              isAr ? "left-8" : "right-8"
            )}
          >
            <Menu className="w-6 h-6" />
          </button>
        )}
      </div>
    </MainLayout>
  );
};

export default Lesson;
