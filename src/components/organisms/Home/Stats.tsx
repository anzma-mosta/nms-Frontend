import { useTranslation } from "react-i18next";
import { BookOpen, Users, Clock, Star, TrendingUp, Award, Globe, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../../../utils/cn";

export const Stats = () => {
  const { t, i18n } = useTranslation();

  const stats = [
    { 
      label: t("home.stats.courses"), 
      value: "500+", 
      icon: BookOpen,
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    { 
      label: t("home.stats.instructors"), 
      value: "120+", 
      icon: Users,
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    },
    { 
      label: t("home.stats.hours"), 
      value: "10k+", 
      icon: Clock,
      color: "text-orange-500",
      bg: "bg-orange-500/10"
    },
    { 
      label: t("home.stats.rating"), 
      value: "4.9/5", 
      icon: Star,
      color: "text-yellow-500",
      bg: "bg-yellow-500/10"
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Element */}
      <div className="absolute inset-0 bg-primary/[0.02] -skew-y-3 transform origin-left"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative"
            >
              <div className="flex flex-col items-center text-center space-y-4 p-8 rounded-[2.5rem] bg-card border border-border/50 hover:border-primary/30 hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] transition-all duration-500">
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3",
                  stat.bg,
                  stat.color
                )}>
                  <stat.icon className="w-8 h-8" />
                </div>
                
                <div className="space-y-1">
                  <motion.h3 
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 100, delay: i * 0.1 + 0.2 }}
                    className="text-4xl lg:text-5xl font-black text-foreground tracking-tight"
                  >
                    {stat.value}
                  </motion.h3>
                  <p className="text-sm font-bold text-muted-foreground uppercase tracking-[0.2em]">
                    {stat.label}
                  </p>
                </div>

                {/* Decorative dots */}
                <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/20"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/40"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/60"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom trust badges */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-20 flex flex-wrap justify-center items-center gap-8 lg:gap-16 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
        >
          <div className="flex items-center gap-2 font-bold text-foreground">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span>Top Rated Academy</span>
          </div>
          <div className="flex items-center gap-2 font-bold text-foreground">
            <Award className="w-5 h-5 text-primary" />
            <span>ISO Certified</span>
          </div>
          <div className="flex items-center gap-2 font-bold text-foreground">
            <Globe className="w-5 h-5 text-primary" />
            <span>Global Community</span>
          </div>
          <div className="flex items-center gap-2 font-bold text-foreground">
            <Heart className="w-5 h-5 text-primary" />
            <span>Student First</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
