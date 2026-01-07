import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Users,
  TrendingUp,
  Award,
  Rocket,
  Globe,
} from "lucide-react";
import { Button } from "../../atoms/Button";
import { ROUTES } from "../../../constants/routes";
import { cn } from "../../../utils/cn";
import { motion } from "framer-motion";

export const InstructorCTA = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  const features = [
    {
      icon: <Users className="w-5 h-5" />,
      title: isAr ? "مجتمع واسع" : "Large Community",
      desc: isAr ? "صل إلى آلاف الطلاب المهتمين" : "Reach thousands of students",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: isAr ? "دخل مرن" : "Flexible Income",
      desc: isAr ? "حدد أسعارك وحقق أرباحاً متزايدة" : "Set your prices & earn more",
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
      desc: isAr ? "شارك معرفتك مع طلاب من كل مكان" : "Share knowledge worldwide",
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
              <span>{isAr ? "ابدأ مسيرتك التدريسية" : "Launch Your Teaching Career"}</span>
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
                className="text-xl text-muted-foreground leading-relaxed max-w-xl"
              >
                {isAr
                  ? "انضم إلى نخبة المعلمين في الوطن العربي. نحن نوفر لك كل ما تحتاجه للنجاح، من أدوات البث المباشر إلى إدارة الدورات والمدفوعات."
                  : "Join the elite instructors in the MENA region. We provide everything you need to succeed, from live streaming tools to course management and payments."}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-6 pt-4"
            >
              <Link to={ROUTES.BECOME_INSTRUCTOR}>
                <Button
                  size="lg"
                  className="rounded-2xl px-12 h-16 text-xl font-black gap-3 group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    {isAr ? "انضم إلينا الآن" : "Join Us Now"}
                    <ArrowRight className={cn(
                      "w-6 h-6 transition-transform group-hover:translate-x-1",
                      isAr && "rotate-180 group-hover:-translate-x-1"
                    )} />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Button>
              </Link>
              <Link to={ROUTES.CONTACT}>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-2xl px-12 h-16 text-xl font-black glass border-2"
                >
                  {isAr ? "تعرف على المزيد" : "Learn More"}
                </Button>
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
            {features.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="group p-8 rounded-[2.5rem] bg-background/50 border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5"
              >
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6",
                  item.bg,
                  item.color
                )}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-black mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground font-semibold leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}

            {/* Floating Elements for visual interest */}
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/20 rounded-full blur-2xl animate-pulse" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-secondary/20 rounded-full blur-2xl animate-pulse delay-700" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
