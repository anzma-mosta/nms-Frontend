import { useParams, Link } from "react-router-dom";
import { MainLayout } from "../../components/templates/MainLayout";
import { useTranslation } from "react-i18next";
import {
  Star,
  Clock,
  Award,
  BookOpen,
  PlayCircle,
  CheckCircle2,
  Share2,
  Heart,
  ShieldCheck,
  Globe,
  Calendar,
  Zap,
  Target,
  CircleHelp,
  ChevronDown,
  Download,
  MessageSquare,
  Play,
  ArrowRight,
  Monitor,
  Smartphone,
  Trophy,
  Lock,
} from "lucide-react";
import { Button } from "../../components/atoms/Button";
import { Badge } from "../../components/atoms/Badge";
import { Reveal } from "../../components/atoms/Reveal";
import { CourseCard } from "../../components/molecules/CourseCard";
import { useMemo, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ROUTES } from "../../constants/routes";
import { getMockCourses } from "../../data/mockData";
import { type Course, type CurriculumSection, type Lesson } from "../../types";
import { cn } from "../../utils/cn";

const CourseDetails = () => {
  const { id } = useParams();
  const { i18n, t } = useTranslation();
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);
  const [isEnrolled] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState<"all" | "short" | "medium" | "long">("all");
  const [selectedAccess, setSelectedAccess] = useState<"all" | "free" | "locked">("all");

  // Mock Database of Courses
  const coursesDB = useMemo(
    () => getMockCourses(i18n.language),
    [i18n.language]
  );

  // Find the current course
  const course = useMemo((): Course => {
    return (coursesDB.find((c) => c.id.toString() === id) ||
      coursesDB[0]) as Course;
  }, [id, coursesDB]);

  // Get related courses
  const relatedCourses = useMemo(() => {
    return coursesDB
      .filter((c) => c.id.toString() !== id)
      .slice(0, 3);
  }, [coursesDB, id]);

  const isAr = i18n.language === "ar";

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.9]);

  // Simulated FAQ data
  const faqs = [
    {
      q: t("home.faqs.q1"),
      a: t("home.faqs.a1"),
    },
    {
      q: t("home.faqs.q2"),
      a: t("home.faqs.a2"),
    },
    {
      q: t("home.faqs.q3"),
      a: t("home.faqs.a3"),
    },
  ];

  return (
    <MainLayout>
      {/* Premium Hero Header */}
      <section className="relative min-h-[70vh] flex items-center bg-[#0B0F19] pt-32 pb-48 overflow-hidden">
        {/* Animated Background Gradients */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/2 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(white,transparent)] opacity-[0.03]" />

        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="container mx-auto px-4 relative z-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-8 space-y-8">
              <Reveal>
                <div className="flex flex-wrap gap-3 mb-6">
                  <Badge className="bg-primary/20 text-primary border-primary/20 px-6 py-2.5 rounded-2xl text-xs font-black backdrop-blur-xl tracking-wider uppercase">
                    <Zap className="w-3.5 h-3.5 mr-2 inline" />
                    {course.level}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-white/80 border-white/10 px-6 py-2.5 rounded-2xl backdrop-blur-xl bg-white/5 font-bold text-xs"
                  >
                    <Globe className="w-3.5 h-3.5 mr-2 inline text-blue-400" />
                    {course.language}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-white/80 border-white/10 px-6 py-2.5 rounded-2xl backdrop-blur-xl bg-white/5 font-bold text-xs"
                  >
                    <Calendar className="w-3.5 h-3.5 mr-2 inline text-emerald-400" />
                    {t("course_details.updated")} {course.lastUpdated}
                  </Badge>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] text-white mb-8 tracking-tight drop-shadow-2xl">
                  {course.title.split(" ").map((word, i) => (
                    <span key={i} className={cn("inline-block", i === 1 && "text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-emerald-400")}>
                      {word}&nbsp;
                    </span>
                  ))}
                </h1>

                <p className="text-xl md:text-2xl text-slate-400 max-w-3xl leading-relaxed font-medium mb-12">
                  {course.description}
                </p>

                <div className="flex flex-wrap gap-12 items-center pt-10 border-t border-white/10">
                  <div className="flex items-center gap-6">
                    <div className="flex -space-x-4">
                      {[1, 2, 3, 4].map((num: number) => (
                        <motion.div
                          key={num}
                          whileHover={{ y: -5, zIndex: 10 }}
                          className="w-14 h-14 rounded-2xl border-4 border-[#0B0F19] bg-slate-800 flex items-center justify-center overflow-hidden shadow-2xl transition-transform"
                        >
                          <img
                            src={`https://i.pravatar.cc/100?img=${num + 20}`}
                            alt="student"
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      ))}
                      <div className="w-14 h-14 rounded-2xl border-4 border-[#0B0F19] bg-primary flex items-center justify-center text-xs font-black text-white shadow-2xl z-10">
                        +2k
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-orange-400 mb-1">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} className={cn("w-4 h-4 fill-current", s > Math.floor(course.rating) && "opacity-30")} />
                          ))}
                        </div>
                        <span className="font-black text-xl ml-1">
                          {course.rating}
                        </span>
                      </div>
                      <p className="text-slate-500 font-bold text-sm">
                        ({course.reviews} {t("instructor.reviews")})
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-5 group cursor-pointer">
                    <div className="w-16 h-16 rounded-3xl bg-white/5 backdrop-blur-2xl flex items-center justify-center border border-white/10 shadow-2xl group-hover:bg-primary/10 group-hover:border-primary/30 transition-all duration-500">
                      <img 
                        src="https://i.pravatar.cc/100?img=12" 
                        className="w-12 h-12 rounded-2xl object-cover"
                        alt={course.instructor}
                      />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-black mb-1 group-hover:text-primary transition-colors">
                        {t("course_details.instructor")}
                      </p>
                      <p className="font-black text-xl text-white group-hover:text-primary transition-colors">
                        {course.instructor}
                      </p>
                    </div>
                  </div>
                </div>

                {isEnrolled && (
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-12 flex flex-wrap items-center gap-8 p-8 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl"
                  >
                    <Button className="h-16 px-10 rounded-[1.5rem] text-lg font-black shadow-2xl shadow-primary/40 group overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <span className="relative z-10 flex items-center">
                        <PlayCircle className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                        {t("course_details.continue_learning")}
                      </span>
                    </Button>
                    <div className="flex-1 min-w-[280px]">
                      <div className="flex justify-between text-sm mb-4">
                        <span className="text-slate-400 font-black uppercase tracking-[0.2em]">
                          {t("lesson.progress")}
                        </span>
                        <span className="text-primary font-black text-lg">
                          {course.progress}%
                        </span>
                      </div>
                      <div className="h-4 bg-white/5 rounded-full overflow-hidden p-1 border border-white/5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${course.progress}%` }}
                          transition={{ duration: 2, ease: "circOut" }}
                          className="h-full bg-gradient-to-r from-primary to-blue-400 rounded-full shadow-[0_0_20px_rgba(var(--primary-rgb),0.6)]"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </Reveal>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Main Content & Sticky Sidebar */}
      <section className="container mx-auto px-4 -mt-32 relative z-30 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Content Column */}
          <div className="lg:col-span-8 space-y-20">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  icon: Clock,
                  label: t("course_details.duration_label"),
                  value: course.duration,
                  color: "text-blue-400",
                  bg: "bg-blue-400/10",
                },
                {
                  icon: BookOpen,
                  label: t("course_details.lessons_label"),
                  value: "85+",
                  color: "text-emerald-400",
                  bg: "bg-emerald-400/10",
                },
                {
                  icon: Target,
                  label: t("course_details.level"),
                  value: course.level,
                  color: "text-purple-400",
                  bg: "bg-purple-400/10",
                },
                {
                  icon: Award,
                  label: t("course_details.certificate"),
                  value: t("course_details.certified"),
                  color: "text-orange-400",
                  bg: "bg-orange-400/10",
                },
              ].map((stat, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="bg-card/40 backdrop-blur-2xl border-2 border-white/5 hover:border-primary/20 p-8 rounded-[2.5rem] text-center transition-all duration-500 group shadow-2xl hover:shadow-primary/10">
                    <div className={cn(
                      "w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center transition-all duration-700 group-hover:scale-110 group-hover:rotate-[10deg] shadow-lg",
                      stat.bg,
                      stat.color
                    )}>
                      <stat.icon className="w-8 h-8" />
                    </div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-black mb-2 group-hover:text-primary transition-colors">
                      {stat.label}
                    </p>
                    <p className="font-black text-xl text-white">{stat.value}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Learning Outcomes */}
            <Reveal>
              <div className="bg-card/40 backdrop-blur-3xl border-2 border-white/5 rounded-[3.5rem] p-10 md:p-16 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-bl-[120px] transition-transform duration-1000 group-hover:scale-110 blur-3xl" />
                <h2 className="text-4xl font-black mb-12 flex items-center gap-6">
                  <div className="w-14 h-14 rounded-[1.25rem] bg-primary text-white flex items-center justify-center shadow-2xl shadow-primary/30 rotate-3 group-hover:rotate-0 transition-transform duration-500">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  {t("course_details.learning_outcomes_title")}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
                  {course.learningPoints?.map((point: string, i: number) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: isAr ? 20 : -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-5 group/item"
                    >
                      <div className="w-8 h-8 rounded-xl bg-emerald-400/10 text-emerald-400 flex items-center justify-center shrink-0 mt-1 transition-all duration-500 group-hover/item:bg-emerald-400 group-hover/item:text-white group-hover/item:scale-110 group-hover/item:rotate-12 shadow-sm">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className="text-slate-400 font-bold leading-relaxed group-hover/item:text-white transition-colors text-lg">
                        {point}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Curriculum Section */}
            <Reveal>
              <div className="space-y-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                  <div className="space-y-4">
                    <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest">
                      {t("course_details.curriculum")}
                    </Badge>
                    <h2 className="text-5xl font-black text-white">
                      {t("course_details.curriculum_title")}
                    </h2>
                    <p className="text-slate-400 text-xl font-medium max-w-2xl leading-relaxed">
                      {t("course_details.curriculum_desc")}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 bg-white/5 p-3 rounded-3xl border border-white/5 backdrop-blur-xl">
                    <div className="px-6 py-3 rounded-2xl bg-[#0B0F19] shadow-inner text-sm font-black flex items-center gap-3">
                      <span className="text-primary text-xl">12</span>
                      <span className="text-slate-500 uppercase tracking-tighter text-[10px]">{t("course_details.sections_label")}</span>
                    </div>
                    <div className="px-6 py-3 rounded-2xl bg-[#0B0F19] shadow-inner text-sm font-black flex items-center gap-3">
                      <span className="text-primary text-xl">85</span>
                      <span className="text-slate-500 uppercase tracking-tighter text-[10px]">{t("course_details.lessons_label")}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-3 md:gap-6 items-center justify-between bg-white/5 p-4 md:p-6 rounded-[2rem] border border-white/10">
                    {/* Level filter removed for type safety; keep duration & access */}
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-[11px] font-black text-muted-foreground uppercase tracking-widest">{t("course_details.filters.duration_title")}</span>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setSelectedDuration("all")}
                          className={cn("px-4 py-2 rounded-xl text-xs font-black border", selectedDuration === "all" ? "bg-primary/10 text-primary border-primary/20" : "bg-white/5 text-muted-foreground border-white/10")}
                        >
                          {t("course_details.filters.duration_all")}
                        </button>
                        <button
                          onClick={() => setSelectedDuration("short")}
                          className={cn("px-4 py-2 rounded-xl text-xs font-black border", selectedDuration === "short" ? "bg-primary/10 text-primary border-primary/20" : "bg-white/5 text-muted-foreground border-white/10")}
                        >
                          {t("course_details.filters.duration_short")}
                        </button>
                        <button
                          onClick={() => setSelectedDuration("medium")}
                          className={cn("px-4 py-2 rounded-xl text-xs font-black border", selectedDuration === "medium" ? "bg-primary/10 text-primary border-primary/20" : "bg-white/5 text-muted-foreground border-white/10")}
                        >
                          {t("course_details.filters.duration_medium")}
                        </button>
                        <button
                          onClick={() => setSelectedDuration("long")}
                          className={cn("px-4 py-2 rounded-xl text-xs font-black border", selectedDuration === "long" ? "bg-primary/10 text-primary border-primary/20" : "bg-white/5 text-muted-foreground border-white/10")}
                        >
                          {t("course_details.filters.duration_long")}
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-[11px] font-black text-muted-foreground uppercase tracking-widest">{t("course_details.filters.access_title")}</span>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setSelectedAccess("all")}
                          className={cn("px-4 py-2 rounded-xl text-xs font-black border", selectedAccess === "all" ? "bg-primary/10 text-primary border-primary/20" : "bg-white/5 text-muted-foreground border-white/10")}
                        >
                          {t("course_details.filters.access_all")}
                        </button>
                        <button
                          onClick={() => setSelectedAccess("free")}
                          className={cn("px-4 py-2 rounded-xl text-xs font-black border", selectedAccess === "free" ? "bg-primary/10 text-primary border-primary/20" : "bg-white/5 text-muted-foreground border-white/10")}
                        >
                          {t("course_details.filters.access_free")}
                        </button>
                        <button
                          onClick={() => setSelectedAccess("locked")}
                          className={cn("px-4 py-2 rounded-xl text-xs font-black border", selectedAccess === "locked" ? "bg-primary/10 text-primary border-primary/20" : "bg-white/5 text-muted-foreground border-white/10")}
                        >
                          {t("course_details.filters.access_locked")}
                        </button>
                      </div>
                    </div>
                  </div>
                  {course.curriculum?.map((section: CurriculumSection, idx: number) => (
                    <motion.div
                      key={idx}
                      layout
                      className={cn(
                        "group/acc bg-card/20 backdrop-blur-2xl border-2 rounded-[2.5rem] overflow-hidden transition-all duration-500",
                        activeAccordion === idx 
                          ? "border-primary/40 bg-card/40 shadow-2xl shadow-primary/5" 
                          : "border-white/5 hover:border-white/20"
                      )}
                    >
                      <button
                        onClick={() => setActiveAccordion(activeAccordion === idx ? null : idx)}
                        className="w-full flex items-center justify-between p-10 text-right transition-all"
                      >
                        <div className="flex items-center gap-8">
                          <div className={cn(
                            "w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl transition-all duration-700",
                            activeAccordion === idx 
                              ? "bg-primary text-white scale-110 shadow-2xl shadow-primary/40 rotate-6" 
                              : "bg-white/5 text-slate-500 group-hover/acc:bg-white/10 group-hover/acc:text-slate-300"
                          )}>
                            {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                          </div>
                          <div className="text-right">
                            <h3 className={cn(
                              "font-black text-2xl mb-2 transition-colors duration-500",
                              activeAccordion === idx ? "text-white" : "text-slate-300 group-hover/acc:text-white"
                            )}>
                              {section.title}
                            </h3>
                            <div className="flex items-center gap-6 text-xs text-slate-500 font-black uppercase tracking-widest">
                              <span className="flex items-center gap-2">
                                <PlayCircle className="w-4 h-4 text-primary" />
                                {section.lessons.length} {t("course_details.lessons_label")}
                              </span>
                              <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
                              <span className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-primary" />
                                {section.duration || "45m"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className={cn(
                          "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 border",
                          activeAccordion === idx 
                            ? "bg-primary/10 border-primary/20 text-primary rotate-180 shadow-inner" 
                            : "bg-white/5 border-white/5 text-slate-500 group-hover/acc:bg-white/10"
                        )}>
                          <ChevronDown className="w-6 h-6" />
                        </div>
                      </button>

                      <AnimatePresence>
                        {activeAccordion === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="px-10 pb-10 space-y-4">
                              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />
                              {section.lessons
                                .filter((lesson: Lesson) => {
                                  const durationNum = Number((lesson.duration || "0").toString().replace(/[^0-9]/g, ""));
                                  const durationOk =
                                    selectedDuration === "all" ||
                                    (selectedDuration === "short" && durationNum <= 10) ||
                                    (selectedDuration === "medium" && durationNum > 10 && durationNum <= 30) ||
                                    (selectedDuration === "long" && durationNum > 30);
                                  const accessOk =
                                    selectedAccess === "all" ||
                                    (selectedAccess === "free" && !!lesson.free) ||
                                    (selectedAccess === "locked" && !isEnrolled && !lesson.free);
                                  return durationOk && accessOk;
                                })
                                .map((lesson: Lesson, lIdx: number) => {
                                const hasAccess = isEnrolled || lesson.free;
                                const lessonLink = ROUTES.LESSON.replace(":courseId", id || "1").replace(":lessonId", lesson.id);

                                return (
                                  <div key={lIdx} className="group/lesson">
                                    {hasAccess ? (
                                      <Link
                                        to={lessonLink}
                                        className="flex items-center justify-between p-6 rounded-[1.75rem] bg-white/[0.02] hover:bg-primary/10 border border-white/5 hover:border-primary/20 transition-all duration-500 group/link"
                                      >
                                        <div className="flex items-center gap-6">
                                          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover/link:bg-primary group-hover/link:text-white transition-all duration-500 shadow-sm">
                                            <Play className="w-5 h-5 fill-current" />
                                          </div>
                                          <span className="font-black text-lg text-slate-300 group-hover/link:text-white transition-colors">
                                            {lesson.title}
                                          </span>
                                        </div>
                                        <div className="flex items-center gap-8">
                                          {!isEnrolled && lesson.free && (
                                            <Badge className="bg-emerald-400/10 text-emerald-400 border-emerald-400/20 text-[10px] font-black px-4 py-1.5 rounded-xl uppercase tracking-widest">
                                              {t("course_details.free_label")}
                                            </Badge>
                                          )}
                                          <span className="text-sm font-black text-slate-500 tabular-nums">
                                            {lesson.duration || "12:45"}
                                          </span>
                                        </div>
                                      </Link>
                                    ) : (
                                      <div className="flex items-center justify-between p-6 rounded-[1.75rem] bg-white/[0.01] border border-white/[0.02] opacity-60">
                                        <div className="flex items-center gap-6">
                                          <div className="w-12 h-12 rounded-2xl bg-white/5 text-slate-500 flex items-center justify-center">
                                            <Lock className="w-5 h-5" />
                                          </div>
                                          <span className="font-bold text-lg text-slate-400">
                                            {lesson.title}
                                          </span>
                                        </div>
                                        <div className="flex items-center gap-8">
                                          <span className="text-sm font-black text-slate-600 tabular-nums">
                                            {lesson.duration || "12:45"}
                                          </span>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Instructor Section */}
            <Reveal>
              <div className="bg-card/40 backdrop-blur-2xl border-2 border-white/5 rounded-[3.5rem] p-10 md:p-16 shadow-2xl overflow-hidden group">
                <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
                  <div className="relative">
                    <div className="w-48 h-48 rounded-[3rem] overflow-hidden border-4 border-white/10 shadow-2xl group-hover:rotate-3 transition-transform duration-700">
                      <img 
                        src="https://i.pravatar.cc/300?img=12" 
                        className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
                        alt={course.instructor}
                      />
                    </div>
                    <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white shadow-2xl border-4 border-[#0B0F19] group-hover:scale-110 transition-transform">
                      <ShieldCheck className="w-8 h-8" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-6 text-center md:text-right">
                    <div className="space-y-2">
                      <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest">
                        {t("course_details.instructor")}
                      </Badge>
                      <h2 className="text-4xl font-black text-white">{course.instructor}</h2>
                      <p className="text-primary font-black uppercase tracking-widest text-xs">
                        {t("instructor.list.inst1.role")}
                      </p>
                    </div>
                    <p className="text-slate-400 text-lg leading-relaxed font-medium">
                      خبير في تطوير الويب والذكاء الاصطناعي مع أكثر من 15 عاماً من الخبرة في بناء المنظمة التقنية الضخمة. قدم مئات الدورات التدريبية وساعد أكثر من 50 ألف طالب حول العالم في بدء مسيرتهم المهنية.
                    </p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-8 pt-4">
                      <div className="text-center md:text-right">
                        <p className="text-white font-black text-2xl">4.9</p>
                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{t("instructor.rating")}</p>
                      </div>
                      <div className="text-center md:text-right">
                        <p className="text-white font-black text-2xl">12k+</p>
                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{t("instructor.reviews")}</p>
                      </div>
                      <div className="text-center md:text-right">
                        <p className="text-white font-black text-2xl">50k+</p>
                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{t("instructor.total_students")}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* FAQ Section */}
            <Reveal>
              <div className="space-y-10">
                <div className="text-center md:text-right">
                  <h2 className="text-4xl font-black text-white mb-4">{t("home.faqs.title")}</h2>
                  <p className="text-slate-400 text-lg font-medium">{t("home.faqs.description")}</p>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  {faqs.map((faq, i) => (
                    <div key={i} className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10 hover:bg-white/[0.04] transition-all duration-500 group">
                      <h3 className="text-xl font-black text-white mb-4 flex items-center gap-4">
                        <CircleHelp className="w-6 h-6 text-primary group-hover:rotate-12 transition-transform" />
                        {faq.q}
                      </h3>
                      <p className="text-slate-400 leading-relaxed font-medium text-lg">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Sidebar - Sticky Purchase Card */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-8">
              <Reveal delay={0.3}>
                <div className="bg-[#0B0F19]/80 backdrop-blur-3xl border-2 border-white/10 rounded-[3.5rem] p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] overflow-hidden relative group">
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-[64px] transition-transform duration-700 group-hover:scale-110" />
                  
                  {/* Preview Image/Video Trigger */}
                  <div className="relative aspect-video rounded-[2rem] overflow-hidden mb-10 group/preview cursor-pointer shadow-2xl border-2 border-white/5">
                    <img 
                      src={course.image} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover/preview:scale-110"
                      alt={course.title}
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover/preview:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center shadow-2xl shadow-primary/50 group-hover/preview:scale-110 transition-transform duration-500">
                        <Play className="w-8 h-8 fill-current ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <Badge className="w-full justify-center bg-black/60 backdrop-blur-md border-white/10 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em]">
                        {t("course_details.preview_course")}
                      </Badge>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="space-y-8 mb-10">
                    <div className="flex items-end gap-4">
                      <span className="text-5xl font-black text-white tracking-tighter">$99.99</span>
                      <span className="text-2xl text-slate-500 line-through font-bold mb-1">$199.99</span>
                      <Badge className="bg-emerald-400/10 text-emerald-400 border-emerald-400/20 px-4 py-2 rounded-xl text-xs font-black mb-1">
                        50% OFF
                      </Badge>
                    </div>
                    
                    <div className="space-y-4">
                      <Button className="w-full h-16 rounded-2xl text-lg font-black shadow-2xl shadow-primary/40 group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <span className="relative z-10">{t("course_details.buy_now")}</span>
                      </Button>
                      <Button variant="outline" className="w-full h-16 rounded-2xl text-lg font-black border-2 border-white/10 hover:bg-white/5 transition-all">
                        {t("course_details.add_to_cart")}
                      </Button>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-6 pt-8 border-t border-white/10">
                    <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-black">
                      {t("course_details.includes")}
                    </p>
                    <div className="space-y-5">
                      {[
                        { icon: Monitor, text: t("course_details.lifetime_access") },
                        { icon: Smartphone, text: t("course_details.mobile_access") },
                        { icon: Download, text: t("course_details.resources") },
                        { icon: Trophy, text: t("course_details.certificate") },
                        { icon: MessageSquare, text: t("course_details.direct_support") },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4 group/item cursor-default">
                          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover/item:bg-primary group-hover/item:text-white transition-all duration-300">
                            <item.icon className="w-5 h-5" />
                          </div>
                          <span className="text-slate-400 font-bold group-hover/item:text-white transition-colors">
                            {item.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 mt-10">
                    <button 
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      className={cn(
                        "flex-1 h-14 rounded-2xl border-2 flex items-center justify-center gap-3 font-black text-xs uppercase tracking-widest transition-all duration-500",
                        isWishlisted ? "bg-red-500/10 border-red-500/20 text-red-500" : "bg-white/5 border-white/5 text-slate-400 hover:border-white/20"
                      )}
                    >
                      <Heart className={cn("w-5 h-5", isWishlisted && "fill-current")} />
                      {t("course_details.wishlist")}
                    </button>
                    <button className="flex-1 h-14 rounded-2xl bg-white/5 border-2 border-white/5 text-slate-400 hover:border-white/20 flex items-center justify-center gap-3 font-black text-xs uppercase tracking-widest transition-all duration-500">
                      <Share2 className="w-5 h-5" />
                      {t("course_details.share")}
                    </button>
                  </div>
                </div>
              </Reveal>

              {/* Secure Payment Notice */}
              <Reveal delay={0.5}>
                <div className="bg-emerald-400/5 border-2 border-emerald-400/10 rounded-[2.5rem] p-8 flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-400/10 text-emerald-400 flex items-center justify-center shrink-0 shadow-inner">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-emerald-400 font-black text-sm uppercase tracking-widest mb-1">
                      {t("course_details.secure_payment_notice")}
                    </p>
                    <p className="text-slate-500 text-xs font-bold leading-relaxed">
                      {t("course_details.money_back_guarantee")}
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Related Courses Section */}
        <div className="mt-40 space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest">
                {t("course_details.you_may_also_like")}
              </Badge>
              <h2 className="text-5xl font-black text-white">
                {t("home.latest_courses")}
              </h2>
              <p className="text-slate-400 text-xl font-medium max-w-2xl leading-relaxed">
                {t("course_details.you_may_also_like_desc")}
              </p>
            </div>
            <Link to={ROUTES.COURSES}>
              <Button variant="outline" className="h-16 px-10 rounded-2xl text-lg font-black border-2 border-white/10 hover:border-primary/40 hover:bg-primary/5 group">
                {t("course_details.explore_all_courses")}
                <ArrowRight className={cn("w-6 h-6 ml-3 transition-transform group-hover:translate-x-2", isAr && "rotate-180 group-hover:-translate-x-2")} />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {relatedCourses.map((relatedCourse, i) => (
              <Reveal key={relatedCourse.id} delay={i * 0.1}>
                <CourseCard course={relatedCourse} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default CourseDetails;
