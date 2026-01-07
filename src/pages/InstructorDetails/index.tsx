import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Star,
  Users,
  BookOpen,
  Github,
  Twitter,
  Linkedin,
  Award,
  Calendar,
  ArrowRight,
  ArrowLeft,
  Mail,
  MapPin,
  Globe,
  Briefcase,
  GraduationCap,
  Quote,
  ShieldCheck,
} from "lucide-react";
import { MainLayout } from "../../components/templates/MainLayout";
import { Button } from "../../components/atoms/Button";
import { Reveal } from "../../components/atoms/Reveal";
import { ROUTES } from "../../constants/routes";
import { CourseCard } from "../../components/molecules/CourseCard";
import type { Education, Experience, Course, Testimonial } from "../../types";

const InstructorDetails = () => {
  const { id = "inst1" } = useParams();
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  // Get translated data for the specific instructor
  const instructorData = t(`instructor.list.${id}`, { returnObjects: true }) as any;

  // Mock data for instructor
  const instructor = {
    id,
    name: instructorData.name,
    role: instructorData.role,
    image:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80" ,
    coverImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&q=80",
    rating: instructorData.rating || 4.9,
    reviewsCount: instructorData.reviewsCount || 4500,
    studentsCount: instructorData.studentsCount || 15000,
    coursesCount: instructorData.coursesCount || 12,
    location: instructorData.location,
    joinedDate: t("instructor.joined", { year: instructorData.joinedYear || "2020" }),
    bio: instructorData.bio,
    skills: instructorData.skills || [],
    social: {
      github: "https://github.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      website: "https://example.com",
    },
    experience: instructorData.experience || [],
    education: instructorData.education || [],
    testimonials: (instructorData.testimonials || []).map((test: any, index: number) => ({
      ...test,
      id: index + 1,
      avatar: index === 0 
        ? "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
        : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80"
    })),
    courses: (instructorData.courses || []).map((course: any, index: number) => ({
      ...course,
      id: (index + 1).toString(),
      instructor: instructorData.name,
      rating: 4.8 + (index * 0.1),
      students: index === 0 ? "1,200" : "850",
      image: index === 0
        ? "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80"
        : "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80"
    })),
  };

  return (
    <MainLayout>
      {/* Dynamic Modern Header */}
      <div className="relative min-h-[500px] flex items-center pt-20 pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <img
            src={instructor.coverImage}
            alt="Cover"
            className="w-full h-full object-cover opacity-20 scale-110 blur-sm"
          />
          <div className="absolute inset-0  from-slate-950 via-slate-950/90 to-background"></div>

          {/* Animated Circles */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] animate-pulse delay-700"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-end">
            {/* Profile Image with Ring */}
            <Reveal direction="up">
              <div className="relative group">
                <div className="absolute inset-0 bg-primary rounded-[40px] rotate-6 scale-105 opacity-20 group-hover:rotate-12 transition-transform duration-500"></div>
                <div className="absolute inset-0 bg-blue-500 rounded-[40px] -rotate-3 scale-105 opacity-20 group-hover:-rotate-6 transition-transform duration-500"></div>
                <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-[40px] overflow-hidden border-4 border-background shadow-2xl">
                  <img
                    src={instructor.image}
                    alt={instructor.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-primary text-white p-4 rounded-2xl shadow-xl flex items-center gap-2 font-black">
                  <Star className="w-6 h-6 fill-current text-yellow-300" />
                  <span className="text-xl">{instructor.rating}</span>
                </div>
              </div>
            </Reveal>

            {/* Main Info */}
            <div className="flex-1 text-center lg:text-right">
              <Reveal delay={0.2}>
                <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6">
                  <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold border border-primary/20 backdrop-blur-md">
                    {instructor.role}
                  </span>
                  <span className="bg-primary text-slate-300 px-4 py-1.5 rounded-full text-sm font-bold border border-white/10 backdrop-blur-md flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {instructor.location}
                  </span>
                </div>

                <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
                  {instructor.name}
                </h1>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-8 mb-10">
                  {[
                    {
                      label: t("instructor.total_students"),
                      value: instructor.studentsCount.toLocaleString(),
                      icon: Users,
                    },
                    {
                      label: t("instructor.total_courses"),
                      value: instructor.coursesCount,
                      icon: BookOpen,
                    },
                    {
                      label: t("instructor.rating"),
                      value: instructor.rating,
                      icon: Star,
                    },
                    {
                      label: t("instructor.reviews"),
                      value: instructor.reviewsCount.toLocaleString(),
                      icon: Quote,
                    },
                  ].map((stat, i) => (
                    <div key={i} className="text-center lg:text-right">
                      <p className="text-3xl md:text-4xl font-black text-primary mb-1">
                        {stat.value}
                      </p>
                      <p className="text-xs md:text-sm text-slate-400 font-bold uppercase tracking-wider">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  <Button
                    onClick={() =>
                      document
                        .getElementById("contact-section")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="h-14 px-10 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-all"
                  >
                    {t("instructor.contact")}
                  </Button>
                  <div className="flex items-center gap-3 p-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
                    {[
                      { icon: Github, link: instructor.social.github },
                      { icon: Twitter, link: instructor.social.twitter },
                      { icon: Linkedin, link: instructor.social.linkedin },
                      { icon: Globe, link: instructor.social.website },
                    ].map((soc, i) => (
                      <a
                        key={i}
                        href={soc.link}
                        className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-primary hover:text-white transition-all text-slate-400"
                      >
                        <soc.icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="container mx-auto px-4 -mt-20 relative z-20 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-8 space-y-12">
            {/* About & Bio */}
            <Reveal>
              <div className="bg-card border border-border rounded-[40px] p-8 md:p-12 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-24 h-24 bg-primary/5 rounded-br-[100px] -z-10 group-hover:scale-150 transition-transform duration-700"></div>
                <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
                  <div className="w-2 h-8 bg-primary rounded-full"></div>
                  {t("instructor.profile")}
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed mb-10 first-letter:text-5xl first-letter:font-black first-letter:text-primary first-letter:ml-3">
                  {instructor.bio}
                </p>

                <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  {t("instructor.technical_skills")}
                </h3>
                <div className="flex flex-wrap gap-4">
                  {instructor.skills.map((skill: string, i: number) => (
                    <div key={i} className="group relative">
                      <div className="absolute inset-0 bg-primary rounded-2xl blur-md opacity-0 group-hover:opacity-20 transition-opacity"></div>
                      <span className="relative bg-muted/50 text-foreground px-6 py-3 rounded-2xl font-bold border border-border group-hover:border-primary group-hover:bg-primary/5 transition-all flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Featured Course - New Section */}
            {instructor.courses.length > 0 && (
              <Reveal delay={0.1}>
                <div className="bg-slate-900 text-white rounded-[40px] p-8 md:p-12 overflow-hidden relative group">
                  <div className="absolute top-0 mb-2 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] group-hover:scale-150 transition-transform duration-1000"></div>
                  <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                    <div className="w-full md:w-2/5 aspect-video rounded-3xl overflow-hidden shadow-2xl">
                      <img
                        src={instructor.courses[0]?.image}
                        alt="Featured"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="flex-1 space-y-4">
                      <span className="bg-primary px-4 mb-2 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                        {t("instructor.featured_course")}
                      </span>
                      <h3 className="text-3xl mt-2 font-black">
                        {instructor.courses[0]?.title}
                      </h3>
                      <p className="text-slate-400 line-clamp-2">
                        {t("instructor.featured_desc")}
                      </p>
                      <div className="flex items-center gap-6 pt-2">
                        <div className="flex items-center gap-2">
                          <Star className="w-5 h-5 text-orange-400 fill-current" />
                          <span className="font-bold">
                            {instructor.courses[0]?.rating}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-5 h-5 text-primary" />
                          <span className="font-bold">
                            {instructor.courses[0]?.students}
                          </span>
                        </div>
                      </div>
                      <Link
                        to={`${ROUTES.COURSE_DETAILS.replace(":id", instructor.courses[0]?.id || "")}`}
                        className="block pt-4"
                      >
                        <Button className="rounded-2xl px-8 h-12 font-bold group/btn">
                          {t("instructor.enroll_now")}
                          {isAr ? (
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover/btn:-translate-x-1 transition-transform" />
                          ) : (
                            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                          )}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            )}

            {/* Experience & Education Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Experience */}
              <Reveal delay={0.2}>
                <div className="bg-card border border-border rounded-[40px] p-8 md:p-10 shadow-sm h-full">
                  <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
                    <Briefcase className="w-6 h-6 text-primary" />
                    {t("instructor.experience")}
                  </h2>
                  <div className="space-y-8 relative before:absolute before:right-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
                    {instructor.experience.map((exp: Experience, i: number) => (
                      <div key={i} className="relative pr-10">
                        <div className="absolute right-0 top-1.5 w-6 h-6 bg-background border-4 border-primary rounded-full z-10"></div>
                        <p className="text-sm font-bold text-primary mb-1">
                          {exp.period}
                        </p>
                        <h4 className="text-lg font-black mb-1">{exp.role}</h4>
                        <p className="font-bold text-slate-500 mb-2">
                          {exp.company}
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {exp.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Education */}
              <Reveal delay={0.3}>
                <div className="bg-card border border-border rounded-[40px] p-8 md:p-10 shadow-sm h-full">
                  <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
                    <GraduationCap className="w-6 h-6 text-primary" />
                    {t("instructor.education")}
                  </h2>
                  <div className="space-y-8">
                    {instructor.education.map((edu: Education, i: number) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                          <Award className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-primary mb-1">
                            {edu.year}
                          </p>
                          <h4 className="text-lg font-black mb-1">
                            {edu.degree}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {edu.school}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Courses Section */}
            <Reveal delay={0.4}>
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-black flex items-center gap-3">
                    <div className="w-2 h-8 bg-primary rounded-full"></div>
                    {t("instructor.courses_by", { name: instructor.name })}
                  </h2>
                  <Link
                    to={ROUTES.COURSES}
                    className="text-primary font-bold hover:underline flex items-center gap-2"
                  >
                    {t("instructor.view_all_courses")}
                    {isAr ? (
                      <ArrowLeft className="w-4 h-4" />
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )}
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {instructor.courses.map((course: Course) => (
                    <CourseCard
                      key={course.id}
                      course={{
                        ...course,
                        students: typeof course.students === 'string' 
                          ? parseInt(course.students.replace(/,/g, ""), 10)
                          : course.students,
                      }}
                    />
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Achievements */}
            <Reveal delay={0.5}>
              <div className="bg-primary text-white rounded-[40px] p-8 md:p-10 shadow-xl shadow-primary/20 relative overflow-hidden group">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                  <ShieldCheck className="w-7 h-7" />
                  {t("instructor.achievements")}
                </h3>
                <div className="space-y-6">
                  {[
                    { title: t("instructor.certified_trainer"), icon: Award },
                    {
                      title: t("instructor.best_seller_author"),
                      icon: BookOpen,
                    },
                    { title: t("instructor.top_instructor"), icon: Star },
                  ].map((ach, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/5"
                    >
                      <ach.icon className="w-6 h-6 shrink-0" />
                      <span className="font-bold">{ach.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Student Feedback */}
            <Reveal delay={0.6}>
              <div className="bg-card border border-border rounded-[40px] p-8 md:p-10 shadow-sm">
                <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                  <Quote className="w-6 h-6 text-primary" />
                  {t("instructor.student_feedback")}
                </h3>
                <div className="space-y-8">
                  {instructor.testimonials.map((test: Testimonial) => (
                    <div key={test.id} className="relative">
                      <Quote className="absolute -top-2 -right-2 w-10 h-10 text-primary/5 -z-10" />
                      <p className="text-muted-foreground italic mb-6 leading-relaxed">
                        "{test.content}"
                      </p>
                      <div className="flex items-center gap-4">
                        <img
                          src={test.avatar}
                          alt={typeof test.name === "string" ? test.name : undefined}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-bold text-sm">{test.name}</p>
                          <p className="text-xs text-slate-500">{test.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-10 rounded-2xl h-14 font-bold border-2 group"
                >
                  {t("instructor.view_more_reviews")}
                  {isAr ? (
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                  ) : (
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  )}
                </Button>
              </div>
            </Reveal>

            {/* Contact Card */}
            <Reveal delay={0.7}>
              <div
                id="contact-section"
                className="bg-slate-900 text-white rounded-[40px] p-8 md:p-12 text-center space-y-8 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] group-hover:scale-150 transition-transform duration-1000"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-[80px]"></div>

                <div className="relative z-10 space-y-6">
                  <div className="w-24 h-24 bg-primary/20 rounded-3xl flex items-center justify-center mx-auto group-hover:rotate-12 transition-transform duration-500 border border-primary/30">
                    <Mail className="w-12 h-12 text-primary" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-3xl font-black">
                      {t("instructor.have_question")}
                    </h3>
                    <p className="text-slate-400 text-lg max-w-md mx-auto leading-relaxed">
                      {t("instructor.contact_consultation", {
                        name: instructor.name,
                      })}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-1 gap-4 max-w-2xl mx-auto">
                    <div className="bg-white/5 border border-white/10 p-6 rounded-3xl flex items-center gap-4 hover:bg-white/10 transition-colors">
                      <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-500 font-bold uppercase">
                          {t("contact.email")}
                        </p>
                        <p className="font-bold">ahmed@nms-academy.com</p>
                      </div>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-6 rounded-3xl flex items-center gap-4 hover:bg-white/10 transition-colors">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-blue-400" />
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-500 font-bold uppercase">
                          {t("instructor.joined", { year: "" }).replace(
                            ":",
                            ""
                          )}
                        </p>
                        <p className="font-bold">2020</p>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full h-16 rounded-2xl text-xl font-bold shadow-2xl shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all bg-primary hover:bg-primary/90">
                    {t("instructor.send_message")}
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default InstructorDetails;
