import { useTranslation } from "react-i18next";
import { Target, Eye, Users, Sparkles, ShieldCheck, Zap } from "lucide-react";
import { cn } from "../../../utils/cn";
import { motion } from "framer-motion";

export const AboutUs = () => {
  const { t, i18n } = useTranslation();

  const features = [
    {
      title: t("home.about.mission_title"),
      desc: t("home.about.mission_desc"),
      icon: Target,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: t("home.about.vision_title"),
      desc: t("home.about.vision_desc"),
      icon: Eye,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      title: t("home.about.community_title"),
      desc: t("home.about.community_desc"),
      icon: Users,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
  ];

  return (
    <section className="py-32 relative overflow-hidden bg-background">
       <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Image Composition */}
            <div className="relative z-10 p-4">
              <div className="absolute inset-0 bg-primary/20 rounded-[4rem] blur-[80px] -z-10 opacity-30"></div>
              <div className="relative rounded-[3.5rem] overflow-hidden shadow-2xl border-8 border-white/5 dark:border-white/5">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                  alt="About WAKP Academy"
                  width={800}
                  height={1000}
                  loading="lazy"
                  decoding="async"
                  className="w-full aspect-[4/5] object-cover transition-transform duration-1000 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                <div className="absolute bottom-8 left-8 right-8 p-8 glass rounded-[2.5rem] border border-white/20">
                  <div className="flex items-center gap-6">
                    <div className="bg-primary p-4 rounded-2xl shadow-xl shadow-primary/30">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="text-3xl font-black text-white leading-none mb-1">
                        10k+
                      </p>
                      <p className="text-sm font-bold text-white/70 uppercase tracking-[0.2em]">
                        {t("home.about.students_community")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Achievement Cards */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className={cn(
                "absolute -top-4 glass p-6 rounded-3xl shadow-2xl border border-white/20 flex items-center gap-5 z-20 hidden md:flex",
                i18n.language === "ar" ? "-left-12" : "-right-12"
              )}
            >
              <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-500">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <p className="text-sm font-black text-foreground uppercase tracking-wider">
                  Quality First
                </p>
                <p className="text-xs text-muted-foreground font-bold">
                  Global Standards
                </p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className={cn(
                "absolute top-1/2 glass p-6 rounded-3xl shadow-2xl border border-white/20 flex items-center gap-5 z-20 hidden md:flex",
                i18n.language === "ar" ? "-right-20" : "-left-20"
              )}
            >
              <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-500">
                <Zap className="w-7 h-7" />
              </div>
              <div>
                <p className="text-sm font-black text-foreground uppercase tracking-wider">
                  Fast Results
                </p>
                <p className="text-xs text-muted-foreground font-bold">
                  Practical Learning
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: i18n.language === "ar" ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 px-6 py-2 rounded-2xl bg-primary/10 text-primary border border-primary/20"
              >
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-black uppercase tracking-[0.2em]">
                  {t("home.about.badge")}
                </span>
              </motion.div>
              <h2 className="text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
                {t("home.about.title")}{" "}
                <span className="text-gradient">WAKP Academy</span>
              </h2>
              <p className="text-lg text-muted-foreground font-bold leading-relaxed opacity-80">
                {t("home.about.main_desc")}
              </p>
            </div>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group flex gap-6 p-8 rounded-3xl hover:bg-secondary/50 transition-all duration-500 border-2 border-transparent hover:border-border/50"
                >
                  <div
                    className={cn(
                      "w-16 h-16 rounded-[1.5rem] flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg shadow-black/5",
                      feature.bg,
                      feature.color
                    )}
                  >
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-black tracking-tight group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground font-bold leading-relaxed text-sm opacity-80">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
