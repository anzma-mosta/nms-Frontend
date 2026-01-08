import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  Users,
  TrendingUp,
  Award,
  Rocket,
  Globe,
} from "lucide-react";
import { cn } from "../../../utils/cn";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import { Button } from "../../atoms/Button";

export const InstructorCTA = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  const features = [
    {
      icon: <Users className="w-5 h-5" />,
      title: isAr ? "مجتمع واسع" : "Large Community",
      desc: isAr
        ? "صل إلى آلاف الطلاب المهتمين"
        : "Reach thousands of students",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: isAr ? "دخل مرن" : "Flexible Income",
      desc: isAr
        ? "حدد أسعارك وحقق أرباحاً متزايدة"
        : "Set your prices & earn more",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      icon: <Award className="w-5 h-5" />,
      title: isAr ? "أدوات احترافية" : "Professional Tools",
      desc: isAr ? "نظام إدارة تعليم متطور وسهل" : "Advanced & easy LMS tools",
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: isAr ? "تأثير عالمي" : "Global Impact",
      desc: isAr
        ? "شارك معرفتك مع طلاب من كل مكان"
        : "Share knowledge worldwide",
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
  ];

  return (
    <section className="py-32 relative overflow-hidden bg-background">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className={cn(
            "relative grid grid-cols-1 lg:grid-cols-2 gap-16 items-center glass border-2 border-primary/10 rounded-[4rem] p-10 lg:p-20 overflow-hidden shadow-2xl shadow-primary/5",
            isAr ? "text-right" : "text-left"
          )}
        >
          {/* Decorative Corner Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-[100px] -ml-32 -mb-32" />

          <div className="space-y-10 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm"
            >
              <Rocket className="w-4 h-4" />
              <span>
                {isAr ? "ابدأ مسيرتك التدريسية" : "Launch Your Teaching Career"}
              </span>
            </motion.div>

            <div className="space-y-6">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl lg:text-6xl font-black leading-tight tracking-tight"
              >
                {isAr ? "حول خبرتك إلى" : "Turn your expertise into"}
                <span className="text-primary block">
                  {isAr ? "تأثير حقيقي ودخل مستدام" : "real impact & income"}
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-xl text-muted-foreground leading-relaxed max-w-lg"
              >
                {isAr
                  ? "انضم إلى نخبة المعلمين في الأكاديمية وساهم في بناء جيل جديد من المبدعين."
                  : "Join our elite instructors and help shape the next generation of creators."}
              </motion.p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isAr ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className={cn("p-3 rounded-2xl shrink-0", feature.bg)}>
                    <div className={feature.color}>{feature.icon}</div>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-foreground">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="pt-6"
            >
              <Link to={ROUTES.BECOME_INSTRUCTOR}>
                <Button size="lg" className="rounded-2xl h-14 px-10 font-bold">
                  {isAr ? "سجل كمعلم الآن" : "Register as Instructor"}
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Right Image/Graphic Side */}
          <div className="relative hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square"
            >
              {/* Complex decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-[3rem] rotate-3" />
              <div className="absolute inset-0 bg-background border-2 border-primary/10 rounded-[3rem] -rotate-3 overflow-hidden shadow-inner">
                <img
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80"
                  alt="Instructor"
                  className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                />
              </div>

              {/* Floating Stats Card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 glass p-6 rounded-3xl border shadow-xl z-20"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <TrendingUp className="text-emerald-500 w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-foreground">
                      +120%
                    </div>
                    <div className="text-xs text-muted-foreground font-bold">
                      {isAr ? "نمو الدخل السنوي" : "Annual Income Growth"}
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -bottom-6 -left-6 glass p-6 rounded-3xl border shadow-xl z-20"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <Users className="text-blue-500 w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-foreground">
                      25K+
                    </div>
                    <div className="text-xs text-muted-foreground font-bold">
                      {isAr ? "طالب نشط" : "Active Students"}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
