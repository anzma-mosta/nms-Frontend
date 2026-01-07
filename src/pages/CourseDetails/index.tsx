import { useParams } from "react-router-dom";
import { MainLayout } from "../../components/templates/MainLayout";
import { useTranslation } from "react-i18next";
import {
  Star,
  Users,
  Clock,
  Award,
  BookOpen,
  PlayCircle,
  CheckCircle2,
  Share2,
  Heart,
  ShieldCheck,
  Info,
  Globe,
  Calendar,
  Zap,
  Target,
  HelpCircle,
  ChevronDown,
  Download,
  MessageSquare,
  BarChart,
} from "lucide-react";
import { Button } from "../../components/atoms/Button";
import { Badge } from "../../components/atoms/Badge";
import { Reveal } from "../../components/atoms/Reveal";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { getMockCourses } from "../../data/mockData";
import { type Course, type CurriculumSection, type Lesson } from "../../types";

const CourseDetails = () => {
  const { id } = useParams();
  const { i18n, t } = useTranslation();
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);
  const [isEnrolled, setIsEnrolled] = useState(false);

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

  return (
    <MainLayout>
      {/* Premium Hero Header */}
      <section className="relative bg-[#0F172A] text-white pt-24 pb-32 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-8">
              <Reveal>
                <div className="flex flex-wrap gap-3 mb-6">
                  <Badge className="bg-primary hover:bg-primary text-white border-none px-4 py-1.5 rounded-full text-sm font-semibold">
                    <Zap className="w-3.5 h-3.5 mr-1.5 inline" />
                    {course.level}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-white border-white/20 px-4 py-1.5 rounded-full backdrop-blur-sm bg-white/5"
                  >
                    <Globe className="w-3.5 h-3.5 mr-1.5 inline" />
                    {course.language}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-white border-white/20 px-4 py-1.5 rounded-full backdrop-blur-sm bg-white/5"
                  >
                    <Calendar className="w-3.5 h-3.5 mr-1.5 inline" />
                    {t("course_details.updated")} {course.lastUpdated}
                  </Badge>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.15] mb-6">
                  {course.title}
                </h1>

                <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
                  {course.description}
                </p>

                <div className="flex flex-wrap gap-8 items-center pt-6 border-t border-white/10 mt-8">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="w-10 h-10 rounded-full border-2 border-[#0F172A] bg-slate-700 flex items-center justify-center overflow-hidden"
                        >
                          <img
                            src={`https://i.pravatar.cc/100?img=${i + 10}`}
                            alt="student"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="text-sm">
                      <div className="flex items-center gap-1 text-orange-400">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="font-bold text-lg">
                          {course.rating}
                        </span>
                        <span className="text-slate-400">
                          ({course.reviews})
                        </span>
                      </div>
                      <p className="text-slate-400">
                        {t("course_details.enrolled_students", {
                          count:
                            typeof course.students === "number"
                              ? course.students
                              : 0,
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 backdrop-blur-md flex items-center justify-center border border-white/10">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-widest">
                        {t("course_details.instructor")}
                      </p>
                      <p className="font-bold text-lg hover:text-primary transition-colors cursor-pointer">
                        {course.instructor}
                      </p>
                    </div>
                  </div>

                  {/* Enrollment Toggle (Demo Only) */}
                  <div className="flex-grow flex justify-end">
                    <Button
                      onClick={() => setIsEnrolled(!isEnrolled)}
                      variant="outline"
                      className="border-white/10 text-white/50 hover:text-white hover:bg-white/10 text-xs h-8"
                    >
                      {isEnrolled
                        ? t("course_details.visitor_view")
                        : t("course_details.student_view")}
                    </Button>
                  </div>
                </div>

                {isEnrolled && (
                  <div className="mt-8 flex items-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <Button className="h-14 px-8 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20">
                      <PlayCircle className="w-5 h-5 mr-2" />
                      {t("course_details.continue_learning")}
                    </Button>
                    <div className="flex-1 max-w-xs">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-400">
                          {t("lesson.progress")}
                        </span>
                        <span className="text-primary font-bold">
                          {course.progress}%
                        </span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${course.progress}%` }}
                          className="h-full bg-primary"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section with Sticky Sidebar */}
      <section className="container mx-auto px-4 -mt-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-12 pb-20">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  icon: Clock,
                  label: t("course_details.duration_label"),
                  value: course.duration,
                },
                {
                  icon: BookOpen,
                  label: t("course_details.lessons_label"),
                  value: "85+",
                },
                {
                  icon: Target,
                  label: t("course_details.level"),
                  value: course.level,
                },
                {
                  icon: Award,
                  label: t("course_details.certificate"),
                  value: t("course_details.certified"),
                },
              ].map((stat, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="bg-card border border-border/50 p-6 rounded-3xl text-center hover:border-primary/30 transition-colors group">
                    <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      {stat.label}
                    </p>
                    <p className="font-bold">{stat.value}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Learning Outcomes */}
            <Reveal>
              <div className="bg-card border border-border/50 rounded-[2.5rem] p-8 md:p-12 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px]" />
                <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  </div>
                  {t("course_details.learning_outcomes_title")}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                  {course.learningPoints?.map((point: string, i: number) => (
                    <div key={i} className="flex items-start gap-4 group">
                      <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center shrink-0 mt-1 group-hover:bg-green-500 group-hover:text-white transition-colors">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Course Curriculum (Accordion) */}
            <Reveal>
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold">
                    {t("course_details.curriculum_title")}
                  </h2>
                  <div className="text-sm text-muted-foreground bg-muted px-4 py-2 rounded-full">
                    <span className="font-bold text-foreground">12</span>{" "}
                    {t("course_details.sections_label")} •{" "}
                    <span className="font-bold text-foreground">85</span>{" "}
                    {t("course_details.lessons_label")}
                  </div>
                </div>

                <div className="space-y-4">
                  {course.curriculum?.map(
                    (section: CurriculumSection, idx: number) => (
                      <div
                        key={idx}
                        className="border border-border/60 rounded-3xl overflow-hidden bg-card/50 backdrop-blur-sm"
                      >
                        <button
                          onClick={() =>
                            setActiveAccordion(
                              activeAccordion === idx ? null : idx
                            )
                          }
                          className="w-full flex items-center justify-between p-6 text-right hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                              {idx + 1}
                            </div>
                            <div className="text-right">
                              <h3 className="font-bold text-lg">
                                {section.title}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {section.lessons.length}{" "}
                                {t("course_details.lessons_label")}
                              </p>
                            </div>
                          </div>
                          <ChevronDown
                            className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${activeAccordion === idx ? "rotate-180" : ""}`}
                          />
                        </button>

                        <AnimatePresence>
                          {activeAccordion === idx && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="p-2 pt-0 space-y-1">
                                {section.lessons.map(
                                  (lesson: Lesson, lIdx: number) => {
                                    const hasAccess = isEnrolled || lesson.free;
                                    const lessonLink = ROUTES.LESSON.replace(
                                      ":courseId",
                                      id || "1"
                                    ).replace(":lessonId", lesson.id);

                                    return hasAccess ? (
                                      <Link
                                        key={lIdx}
                                        to={lessonLink}
                                        className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors group"
                                      >
                                        <div className="flex items-center gap-3">
                                          <div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isEnrolled ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}
                                          >
                                            <PlayCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                          </div>
                                          <span className="text-sm font-medium">
                                            {lesson.title}
                                          </span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                          {!isEnrolled && lesson.free && (
                                            <Badge className="bg-green-500/10 text-green-500 border-none text-[10px] px-2">
                                              {t("course_details.free_label")}
                                            </Badge>
                                          )}
                                          {isEnrolled && (
                                            <div className="w-2 h-2 rounded-full bg-green-500" />
                                          )}
                                          <span className="text-xs text-muted-foreground font-mono">
                                            {lesson.duration}
                                          </span>
                                        </div>
                                      </Link>
                                    ) : (
                                      <div
                                        key={lIdx}
                                        className="flex items-center justify-between p-3 rounded-xl opacity-60 cursor-not-allowed"
                                      >
                                        <div className="flex items-center gap-3">
                                          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-muted text-muted-foreground">
                                            <ShieldCheck className="w-4 h-4" />
                                          </div>
                                          <span className="text-sm font-medium">
                                            {lesson.title}
                                          </span>
                                        </div>
                                        <span className="text-xs text-muted-foreground font-mono">
                                          {lesson.duration}
                                        </span>
                                      </div>
                                    );
                                  }
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  )}
                </div>
              </div>
            </Reveal>

            {/* Requirements & Target */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Reveal>
                <div className="bg-muted/30 p-8 rounded-3xl border border-border/50">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                    <Info className="w-5 h-5 text-primary" />
                    {t("course_details.requirements_title")}
                  </h3>
                  <div className="space-y-4">
                    {course.requirements?.map((req: string, i: number) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 bg-muted/30 p-4 rounded-2xl border border-border/50"
                      >
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="font-medium">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="bg-muted/30 p-8 rounded-3xl border border-border/50">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-primary" />
                    {t("course_details.who_is_it_for")}
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3 text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      {t("course_details.target_audience_1")}
                    </li>
                    <li className="flex items-start gap-3 text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      {t("course_details.target_audience_2")}
                    </li>
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Sticky Sidebar - Pricing & Purchase */}
          <div className="lg:col-span-4 rounded-[2.5rem]">
            <div className="sticky top-24 space-y-6 rounded-[2.5rem]">
              <Reveal delay={0.2}>
                <div className="bg-card text-foreground rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary/10 border-4 border-white dark:border-slate-900">
                  <div className="relative aspect-video group cursor-pointer">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center shadow-xl shadow-primary/40 transform scale-75 group-hover:scale-100 transition-transform duration-500">
                        <PlayCircle className="w-8 h-8 fill-current" />
                      </div>
                      <p className="text-white font-bold mt-4 tracking-wide">
                        {t("course_details.preview_course")}
                      </p>
                    </div>
                  </div>

                  <div className="p-8">
                    {isEnrolled ? (
                      <div className="space-y-6">
                        <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
                          <p className="text-sm text-muted-foreground mb-2">
                            {t("course_details.already_enrolled")}
                          </p>
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-2xl font-black text-primary">
                              {course.progress}%
                            </span>
                            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                              {t("course_details.completed_status")}
                            </span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary w-[35%]" />
                          </div>
                        </div>

                        <Link
                          to={ROUTES.LESSON.replace(
                            ":courseId",
                            id || "1"
                          ).replace(":lessonId", "l1")}
                        >
                          <Button className="w-full h-16 rounded-2xl text-xl font-black shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all active:scale-[0.98]">
                            {t("course_details.resume_lectures")}
                          </Button>
                        </Link>

                        <div className="grid grid-cols-2 gap-3">
                          <Button
                            variant="outline"
                            className="h-12 rounded-xl font-bold border-2"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            {t("course_details.resources")}
                          </Button>
                          <Button
                            variant="outline"
                            className="h-12 rounded-xl font-bold border-2"
                          >
                            <MessageSquare className="w-4 h-4 mr-2" />
                            {t("course_details.community")}
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-4 mb-8">
                          <span className="text-4xl font-black text-primary">
                            {course.price}
                          </span>
                          <div className="flex flex-col">
                            <span className="text-lg text-muted-foreground line-through decoration-red-500/50 decoration-2">
                              {course.oldPrice}
                            </span>
                            <Badge className="bg-green-500 text-white border-none w-fit text-[10px] py-0 px-2 rounded-sm">
                              {t("course_details.discount_percent", {
                                percent: 50,
                              })}
                            </Badge>
                          </div>
                        </div>

                        <div className="space-y-4 mb-10">
                          <Button className="w-full h-16 rounded-2xl text-xl font-black shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all active:scale-[0.98]">
                            {t("course_details.start_learning")}
                          </Button>
                          <div className="grid grid-cols-2 gap-3">
                            <Button
                              variant="outline"
                              className="h-12 rounded-xl font-bold border-2"
                            >
                              <Heart className="w-4 h-4 mr-2" />
                              {t("course_details.wishlist")}
                            </Button>
                            <Button
                              variant="outline"
                              className="h-12 rounded-xl font-bold border-2"
                            >
                              <Share2 className="w-4 h-4 mr-2" />
                              {t("course_details.share")}
                            </Button>
                          </div>
                        </div>
                      </>
                    )}

                    <div className="space-y-5 mt-8">
                      <p className="font-black text-sm uppercase tracking-[0.2em] text-muted-foreground border-b pb-2">
                        {t("course_details.features_title")}
                      </p>
                      <div className="space-y-4">
                        {[
                          {
                            icon: Zap,
                            text: t("course_details.lifetime_access"),
                          },
                          {
                            icon: ShieldCheck,
                            text: t("course_details.money_back_guarantee"),
                          },
                          {
                            icon: BarChart,
                            text: t("course_details.practical_projects"),
                          },
                          {
                            icon: MessageSquare,
                            text: t("course_details.direct_support"),
                          },
                        ].map((item, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-3 text-sm font-medium"
                          >
                            <item.icon className="w-5 h-5 text-primary shrink-0" />
                            <span>{item.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Secure Payment Badge */}
              <div className="bg-muted/50 rounded-2xl p-4 flex items-center justify-center gap-4 border border-border/50">
                <div className="flex gap-2 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-help">
                  <div className="w-8 h-5 bg-blue-600 rounded-sm" />
                  <div className="w-8 h-5 bg-orange-500 rounded-sm" />
                  <div className="w-8 h-5 bg-red-600 rounded-sm" />
                </div>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest leading-none">
                  {t("course_details.secure_payment_notice")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Courses Placeholder */}
      <section className="bg-muted/20 py-20 mt-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-black mb-12 text-center">
            {t("course_details.you_may_also_like")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 opacity-50">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-64 bg-card border-2 shadow-md rounded-3xl animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default CourseDetails;
