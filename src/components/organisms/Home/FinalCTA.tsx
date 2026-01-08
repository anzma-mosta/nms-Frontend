import { useTranslation } from "react-i18next";
import { Sparkles, Rocket, Zap } from "lucide-react";
import { Button } from "../../atoms/Button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";

export const FinalCTA = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  return (
    <section className="py-32 relative overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[4rem] bg-primary px-8 py-20 lg:py-28 overflow-hidden text-center shadow-2xl shadow-primary/20"
        >
          {/* Animated Background Elements */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-0 left-0 w-[500px] h-[500px] bg-white/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-[120px]"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-400/20 rounded-full translate-x-1/2 translate-y-1/2 blur-[120px]"
          />

          <div className="relative z-10 max-w-4xl mx-auto space-y-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 font-bold text-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isAr ? "ابدأ رحلة النجاح اليوم" : "Start Your Success Journey Today"}</span>
            </motion.div>

            <div className="space-y-6">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-4xl lg:text-7xl font-black text-white leading-tight tracking-tight"
              >
                {t("home.final_cta_title")}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-primary-foreground/90 text-xl lg:text-2xl font-medium max-w-2xl mx-auto leading-relaxed"
              >
                {t("home.final_cta_desc")}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center gap-6 pt-4"
            >
              <Link to={ROUTES.LOGIN}>
                <Button
                  size="lg"
                  className="h-18 px-12 rounded-2xl bg-white text-primary hover:bg-white/90 text-xl font-black gap-3 shadow-xl hover:shadow-2xl transition-all duration-500 group"
                >
                  <Rocket className="w-6 h-6 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                  <span>{t("home.join_now")}</span>
                </Button>
              </Link>
              <Link to={ROUTES.COURSES}>
                <Button
                  size="lg"
                  className="h-18 px-12 rounded-2xl bg-primary-foreground/10 hover:bg-primary-foreground/20 text-white border-2 border-white/30 backdrop-blur-md text-xl font-black gap-3 transition-all duration-500 group"
                >
                  <Zap className="w-6 h-6 transition-transform group-hover:scale-110" />
                  <span>{t("home.browse_courses")}</span>
                </Button>
              </Link>
            </motion.div>

            {/* Stats/Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="pt-12 flex flex-wrap justify-center gap-8 lg:gap-16 opacity-60"
            >
              <div className="flex items-center gap-2 text-white">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="font-bold">+10k {isAr ? "طالب" : "Students"}</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="font-bold">+500 {isAr ? "دورة" : "Courses"}</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="font-bold">+100 {isAr ? "معلم" : "Instructors"}</span>
              </div>
            </motion.div>
          </div>

          {/* Decorative icons in background */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-20 -right-20 opacity-10 pointer-events-none"
          >
            <Sparkles className="w-64 h-64 text-white" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
