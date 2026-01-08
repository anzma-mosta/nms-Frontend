import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  Star,
  Users,
  BookOpen,
  Github,
  Twitter,
  Linkedin,
  MapPin,
  Globe,
  MessageCircle,
  Share2,
  Calendar,
  Quote,
} from "lucide-react";
import { Button } from "../../atoms/Button";
import { Reveal } from "../../atoms/Reveal";
import { cn } from "../../../utils/cn";
import type { Instructor } from "../../../types";

interface InstructorHeroProps {
  instructor: Instructor;
}

export const InstructorHero = ({ instructor }: InstructorHeroProps) => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 pb-32 overflow-hidden">
      {/* Animated Background Layers */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.15 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
        >
          <img
            src={instructor.coverImage}
            alt=""
            className="w-full h-full object-cover blur-sm"
          />
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
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
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
                    <span className="text-2xl font-black text-foreground">
                      {instructor.rating}
                    </span>
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
                {
                  label: t("instructor.total_students"),
                  value: instructor.studentsCount.toLocaleString(),
                  icon: Users,
                  color: "text-blue-500",
                },
                {
                  label: t("instructor.total_courses"),
                  value: instructor.coursesCount,
                  icon: BookOpen,
                  color: "text-primary",
                },
                {
                  label: t("instructor.rating"),
                  value: instructor.rating,
                  icon: Star,
                  color: "text-orange-400",
                },
                {
                  label: t("instructor.reviews"),
                  value: instructor.reviewsCount.toLocaleString(),
                  icon: Quote,
                  color: "text-purple-500",
                },
              ].map((stat, idx) => (
                <Reveal key={idx} delay={0.4 + idx * 0.1}>
                  <div className="group relative bg-card/30 glass border border-white/10 rounded-[2.5rem] p-6 hover:bg-primary/5 transition-all duration-500">
                    <div
                      className={cn(
                        "mb-3 p-3 rounded-2xl bg-white/5 w-fit mx-auto lg:mx-0 lg:mr-0 group-hover:scale-110 transition-transform",
                        stat.color
                      )}
                    >
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-3xl font-black mb-1">{stat.value}</h4>
                    <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
                      {stat.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Quick Actions */}
            <Reveal delay={0.8}>
              <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                <Button className="h-16 px-12 rounded-2xl text-xl font-black shadow-2xl shadow-primary/20 hover:scale-105 transition-all group">
                  <MessageCircle
                    className={cn("w-6 h-6", isAr ? "ml-3" : "mr-3")}
                  />
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
  );
};
