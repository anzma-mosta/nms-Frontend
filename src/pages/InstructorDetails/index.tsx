import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  Star,
  Users,
  BookOpen,
  Github,
  Twitter,
  Linkedin,
  Award,
  ArrowRight,
  ArrowLeft,
  Mail,
  MapPin,
  Globe,
  Briefcase,
  GraduationCap,
  Quote,
  ShieldCheck,
  CheckCircle2,
  MessageCircle,
  Share2,
  Calendar,
} from "lucide-react";
import { MainLayout } from "../../components/templates/MainLayout";
import { Button } from "../../components/atoms/Button";
import { Reveal } from "../../components/atoms/Reveal";
import { ROUTES } from "../../constants/routes";
import { CourseCard } from "../../components/molecules/CourseCard";
import { cn } from "../../utils/cn";
import type { Education, Experience, Course, Testimonial } from "../../types";

interface InstructorData {
  name: string;
  role: string;
  rating?: number;
  reviewsCount?: number;
  studentsCount?: number;
  coursesCount?: number;
  location: string;
  joinedYear?: string;
  bio: string;
  skills?: string[];
  experience?: Experience[];
  education?: Education[];
  testimonials?: Testimonial[];
  courses?: Course[];
}

const InstructorDetails = () => {
  const { id = "inst1" } = useParams();
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  // Get translated data for the specific instructor
  const instructorData = t(`instructor.list.${id}`, {
    returnObjects: true,
  }) as unknown as InstructorData;

  // Mock data for instructor with enhanced details
  const instructor = {
    id,
    name: instructorData.name,
    role: instructorData.role,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80",
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
    testimonials: (instructorData.testimonials || []).map((test: Testimonial, index: number) => ({
      ...test,
      id: index + 1,
      avatar: index === 0 
        ? "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" 
        : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    })),
    courses: (instructorData.courses || []).map((course: Course, index: number) => ({
      ...course,
      id: (index + 1).toString(),
      instructor: instructorData.name,
      rating: 4.8 + (index * 0.1),
      students: index === 0 ? 1200 : 850,
      image: index === 0 
        ? "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80" 
        : "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    })),
  };

  return (
    <MainLayout>
      {/* Premium Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-32 overflow-hidden">
        {/* Animated Background Layers */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.15 }}
            transition={{ duration: 2 }}
            className="absolute inset-0"
          >
            <img src={instructor.coverImage} alt="" className="w-full h-full object-cover blur-sm" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/80 to-background" />
          
          {/* Decorative Floating Orbs */}
          <motion.div 
            animate={{ y: [0, -20, 0], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]" 
          />
          <motion.div 
            animate={{ y: [0, 20, 0], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]" 
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center lg:items-start">
            {/* Left Side: Immersive Profile Image */}
            <div className="relative group lg:sticky lg:top-32">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="relative z-10"
              >
                {/* Image Container with Decorative Frames */}
                <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px]">
                  {/* Outer Glow */}
                  <div className="absolute inset-0 bg-primary/30 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  {/* Decorative Frames */}
                  <div className="absolute inset-0 border-2 border-primary/20 rounded-[3.5rem] -rotate-6 scale-105 group-hover:rotate-0 transition-transform duration-700" />
                  <div className="absolute inset-0 border-2 border-white/10 rounded-[3.5rem] rotate-3 scale-105 group-hover:rotate-0 transition-transform duration-700" />
                  
                  {/* Main Image */}
                  <div className="relative h-full w-full rounded-[3rem] overflow-hidden border-8 border-background shadow-2xl">
                    <img 
                      src={instructor.image} 
                      alt={instructor.name} 
                      className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Rating Badge */}
                  <motion.div 
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute -bottom-6 -right-6 bg-card/80 glass p-5 rounded-[2rem] shadow-2xl border border-white/20 flex flex-col items-center gap-1 min-w-[100px]"
                  >
                    <div className="flex items-center gap-1.5 text-orange-400">
                      <Star className="w-6 h-6 fill-current" />
                      <span className="text-2xl font-black text-foreground">{instructor.rating}</span>
                    </div>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                      {instructor.reviewsCount}+ {t("instructor.reviews")}
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Right Side: Profile Info */}
            <div className="flex-1 text-center lg:text-right">
              <Reveal direction="down" delay={0.2}>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
                  <span className="px-6 py-2 rounded-2xl bg-primary/10 text-primary border border-primary/20 text-sm font-black uppercase tracking-widest backdrop-blur-md">
                    {instructor.role}
                  </span>
                  <span className="px-6 py-2 rounded-2xl bg-white/5 text-muted-foreground border border-white/10 text-sm font-bold flex items-center gap-2 backdrop-blur-md">
                    <MapPin className="w-4 h-4 text-primary" />
                    {instructor.location}
                  </span>
                  <span className="px-6 py-2 rounded-2xl bg-white/5 text-muted-foreground border border-white/10 text-sm font-bold flex items-center gap-2 backdrop-blur-md">
                    <Calendar className="w-4 h-4 text-primary" />
                    {instructor.joinedDate}
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text">
                  {instructor.name}
                </h1>
              </Reveal>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                {[
                  { label: t("instructor.total_students"), value: instructor.studentsCount.toLocaleString(), icon: Users, color: "text-blue-500" },
                  { label: t("instructor.total_courses"), value: instructor.coursesCount, icon: BookOpen, color: "text-primary" },
                  { label: t("instructor.rating"), value: instructor.rating, icon: Star, color: "text-orange-400" },
                  { label: t("instructor.reviews"), value: instructor.reviewsCount.toLocaleString(), icon: Quote, color: "text-purple-500" },
                ].map((stat, idx) => (
                  <Reveal key={idx} delay={0.4 + (idx * 0.1)}>
                    <div className="group relative bg-card/30 glass border border-white/10 rounded-[2.5rem] p-6 hover:bg-primary/5 transition-all duration-500">
                      <div className={cn("mb-3 p-3 rounded-2xl bg-white/5 w-fit mx-auto lg:mx-0 lg:mr-0 group-hover:scale-110 transition-transform", stat.color)}>
                        <stat.icon className="w-6 h-6" />
                      </div>
                      <h4 className="text-3xl font-black mb-1">{stat.value}</h4>
                      <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* Quick Actions */}
              <Reveal delay={0.8}>
                <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                  <Button className="h-16 px-12 rounded-2xl text-xl font-black shadow-2xl shadow-primary/20 hover:scale-105 transition-all group">
                    <MessageCircle className={cn("w-6 h-6", isAr ? "ml-3" : "mr-3")} />
                    {t("instructor.contact")}
                  </Button>
                  
                  <div className="flex items-center gap-3 p-3 bg-white/5 glass border border-white/10 rounded-2xl">
                    {[
                      { icon: Github, link: instructor.social.github },
                      { icon: Twitter, link: instructor.social.twitter },
                      { icon: Linkedin, link: instructor.social.linkedin },
                      { icon: Globe, link: instructor.social.website },
                    ].map((soc, idx) => (
                      <motion.a
                        key={idx}
                        href={soc.link}
                        whileHover={{ y: -5, scale: 1.1 }}
                        className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 hover:bg-primary hover:text-white transition-all text-muted-foreground"
                      >
                        <soc.icon className="w-5 h-5" />
                      </motion.a>
                    ))}
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-16 h-16 flex items-center justify-center rounded-2xl bg-white/5 glass border border-white/10 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Share2 className="w-6 h-6" />
                  </motion.button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="container mx-auto px-4 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Content (Col 8) */}
          <div className="lg:col-span-8 space-y-20">
            
            {/* About Section */}
            <section>
              <Reveal>
                <div className="relative bg-card/30 glass border border-white/10 rounded-[4rem] p-10 md:p-16 overflow-hidden group">
                  {/* Decorative Bg */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-bl-[10rem] -z-10 group-hover:scale-110 transition-transform duration-1000" />
                  
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-3 h-10 bg-primary rounded-full" />
                    <h2 className="text-4xl font-black tracking-tight">{t("instructor.profile")}</h2>
                  </div>
                  
                  <div className="prose prose-xl dark:prose-invert max-w-none">
                    <p className="text-2xl text-muted-foreground leading-[1.8] font-medium italic mb-12 relative">
                      <Quote className="absolute -top-6 -right-8 w-16 h-16 text-primary/10 -scale-x-100" />
                      {instructor.bio}
                    </p>
                  </div>

                  <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                    <Award className="w-7 h-7 text-primary" />
                    {t("instructor.technical_skills")}
                  </h3>
                  
                  <div className="flex flex-wrap gap-4">
                    {instructor.skills.map((skill: string, idx: number) => (
                      <motion.div 
                        key={idx}
                        whileHover={{ y: -5, scale: 1.05 }}
                        className="px-8 py-4 rounded-2xl bg-white/5 glass border border-white/10 font-bold hover:border-primary/50 transition-all flex items-center gap-3 cursor-default"
                      >
                        <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
                        {skill}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </section>

            {/* Experience & Education Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Experience Timeline */}
              <Reveal direction="up" delay={0.2}>
                <div className="bg-card/30 glass border border-white/10 rounded-[3.5rem] p-10 h-full relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[5rem]" />
                  
                  <h3 className="text-2xl font-black mb-12 flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    {t("instructor.experience")}
                  </h3>

                  <div className="space-y-12 relative before:absolute before:right-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
                    {instructor.experience.map((exp: Experience, idx: number) => (
                      <div key={idx} className="relative pr-12 group">
                        <div className="absolute right-1.5 top-1.5 w-5 h-5 bg-background border-4 border-primary rounded-full z-10 group-hover:scale-125 transition-transform" />
                        <span className="inline-block px-4 py-1.5 rounded-xl bg-primary/10 text-primary text-xs font-black mb-3">
                          {exp.period}
                        </span>
                        <h4 className="text-xl font-black mb-1 group-hover:text-primary transition-colors">{exp.role}</h4>
                        <p className="text-sm font-bold text-muted-foreground mb-4">{exp.company}</p>
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-500">
                          {exp.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Education Timeline */}
              <Reveal direction="up" delay={0.4}>
                <div className="bg-card/30 glass border border-white/10 rounded-[3.5rem] p-10 h-full relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/5 rounded-br-[5rem]" />
                  
                  <h3 className="text-2xl font-black mb-12 flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    {t("instructor.education")}
                  </h3>

                  <div className="space-y-10">
                    {instructor.education.map((edu: Education, idx: number) => (
                      <div key={idx} className="flex gap-6 group">
                        <div className="w-16 h-16 rounded-[1.5rem] bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-blue-500/10 group-hover:border-blue-500/30 transition-all duration-500">
                          <Award className="w-8 h-8 text-blue-500" />
                        </div>
                        <div>
                          <span className="text-xs font-black text-blue-500 mb-1 block">{edu.year}</span>
                          <h4 className="text-lg font-black mb-1 group-hover:text-blue-500 transition-colors">{edu.degree}</h4>
                          <p className="text-sm text-muted-foreground">{edu.school}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </section>

            {/* Courses Section */}
            <section className="space-y-12">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-10 bg-primary rounded-full" />
                  <h2 className="text-4xl font-black tracking-tight">
                    {t("instructor.courses_by", { name: instructor.name })}
                  </h2>
                </div>
                <Link to={ROUTES.COURSES}>
                  <Button variant="ghost" className="rounded-2xl font-black hover:bg-primary/5 group">
                    {t("instructor.view_all_courses")}
                    {isAr ? (
                      <ArrowLeft className="w-5 h-5 mr-3 group-hover:-translate-x-2 transition-transform" />
                    ) : (
                      <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform" />
                    )}
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {instructor.courses.map((course: Course) => (
                  <CourseCard 
                    key={course.id} 
                    course={{
                      ...course,
                      students: typeof course.students === "number" ? course.students : 0
                    }} 
                  />
                ))}
              </div>
            </section>

          </div>

          {/* Sidebar (Col 4) */}
          <aside className="lg:col-span-4 space-y-10">
            {/* Achievements Card */}
            <Reveal direction="left">
              <div className="bg-primary rounded-[3.5rem] p-10 text-white shadow-2xl shadow-primary/20 relative overflow-hidden group">
                {/* Decorative Patterns */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2" />
                
                <h3 className="text-2xl font-black mb-10 flex items-center gap-4 relative z-10">
                  <div className="p-3 rounded-2xl bg-white/10">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  {t("instructor.achievements")}
                </h3>

                <div className="space-y-6 relative z-10">
                  {[
                    { title: t("instructor.certified_trainer"), icon: Award },
                    { title: t("instructor.best_seller_author"), icon: BookOpen },
                    { title: t("instructor.top_instructor"), icon: Star },
                  ].map((ach, idx) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ x: isAr ? -10 : 10 }}
                      className="flex items-center gap-5 bg-white/10 p-5 rounded-3xl border border-white/10 backdrop-blur-sm"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                        <ach.icon className="w-6 h-6" />
                      </div>
                      <span className="font-bold text-lg">{ach.title}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Quick Contact Form */}
            <Reveal direction="left" delay={0.2}>
              <div className="bg-card/30 glass border border-white/10 rounded-[3.5rem] p-10 space-y-8">
                <h3 className="text-2xl font-black flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-green-500/10 text-green-500">
                    <Mail className="w-6 h-6" />
                  </div>
                  {t("instructor.have_question")}
                </h3>
                <p className="text-muted-foreground font-medium leading-relaxed">
                  {t("instructor.contact_consultation", { name: instructor.name })}
                </p>
                
                <div className="space-y-4">
                  <input 
                    type="text" 
                    placeholder={t("home.contact.form_name_placeholder")}
                    className="w-full h-14 px-6 rounded-2xl bg-white/5 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                  <textarea 
                    placeholder={t("home.contact.form_message_placeholder")}
                    rows={4}
                    className="w-full p-6 rounded-2xl bg-white/5 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                  />
                  <Button className="w-full h-14 rounded-2xl font-black">
                    {t("instructor.send_message")}
                  </Button>
                </div>
              </div>
            </Reveal>

            {/* Verification & Trust */}
            <Reveal direction="left" delay={0.4}>
              <div className="bg-white/5 glass border border-dashed border-white/20 rounded-[3rem] p-8 text-center">
                <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h4 className="text-xl font-black mb-2">{t("home.certified_platform")}</h4>
                <p className="text-sm text-muted-foreground font-medium">
                  {t("home.certified_certificates")}
                </p>
              </div>
            </Reveal>
          </aside>
        </div>
      </div>
    </MainLayout>
  );
};

export default InstructorDetails;
