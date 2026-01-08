import { useTranslation } from "react-i18next";
import {
  Calendar,
  User,
  Clock,
  ArrowRight,
  Users,
  PlayCircle,
} from "lucide-react";
import { Button } from "../../atoms/Button";
import { cn } from "../../../utils/cn";
import { motion } from "framer-motion";
import { Card } from "../../atoms/Card";
import { Badge } from "../../atoms/Badge";

export const Classes = () => {
  const { t, i18n } = useTranslation();

  const liveClasses = [
    {
      id: 1,
      title:
        i18n.language === "ar"
          ? "مراجعة شاملة للغة الإنجليزية"
          : "Comprehensive English Review",
      instructor: i18n.language === "ar" ? "أ. سارة أحمد" : "Mrs. Sarah Ahmed",
      date: "2026-01-10",
      time: "18:00",
      students: 45,
      category: i18n.language === "ar" ? "اللغات" : "Languages",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&q=80",
    },
    {
      id: 2,
      title:
        i18n.language === "ar"
          ? "أساسيات الفيزياء للثانوية"
          : "High School Physics Basics",
      instructor: i18n.language === "ar" ? "د. علي منصور" : "Dr. Ali Mansour",
      date: "2026-01-12",
      time: "20:00",
      students: 120,
      category: i18n.language === "ar" ? "العلوم" : "Science",
      image:
        "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=500&q=80",
    },
    {
      id: 3,
      title:
        i18n.language === "ar"
          ? "مهارات التحدث أمام الجمهور"
          : "Public Speaking Skills",
      instructor: i18n.language === "ar" ? "أ. محمود صقر" : "Mr. Mahmoud Saqr",
      date: "2026-01-15",
      time: "17:30",
      students: 88,
      category: i18n.language === "ar" ? "تطوير الذات" : "Self Dev",
      image:
        "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=500&q=80",
    },
  ];

  return (
    <section className="py-32 relative overflow-hidden bg-secondary/5">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.05)_0%,transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: i18n.language === "ar" ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={cn(
              "max-w-2xl",
              i18n.language === "ar" ? "text-right" : "text-left"
            )}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-500 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-sm font-bold tracking-wide uppercase">
                {t("home.classes.live_now") || "Live Sessions"}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              {t("home.classes.title")}
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t("home.classes.description")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Button
              variant="outline"
              size="lg"
              className="rounded-full group glass"
            >
              <Calendar className="w-4 h-4" />
              {t("home.classes.view_schedule")}
              <ArrowRight
                className={cn(
                  "w-4 h-4 transition-transform group-hover:translate-x-1",
                  i18n.language === "ar" &&
                    "rotate-180 group-hover:-translate-x-1"
                )}
              />
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {liveClasses.map((live, i) => (
            <motion.div
              key={live.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="group glass border-2 border-transparent hover:border-primary/20 transition-all duration-500 rounded-[2.5rem] overflow-hidden flex flex-col h-full">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={live.image}
                    alt={live.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  <div className="absolute top-6 left-6 flex gap-2">
                    <Badge
                      variant="glass"
                      className="bg-red-500/90 text-white border-none px-4 py-1.5 backdrop-blur-md"
                    >
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse mr-2 inline-block" />
                      LIVE
                    </Badge>
                    <Badge
                      variant="glass"
                      className="bg-white/10 text-white border-white/20 backdrop-blur-md"
                    >
                      {live.category}
                    </Badge>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-16 h-16 rounded-full bg-primary/90 text-white flex items-center justify-center backdrop-blur-sm transform scale-50 group-hover:scale-100 transition-transform duration-500">
                      <PlayCircle className="w-8 h-8" />
                    </div>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow space-y-6">
                  <h3 className="font-bold text-2xl group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                    {live.title}
                  </h3>

                  <div className="grid grid-cols-2 gap-4 py-6 border-y border-border/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <User className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
                          Instructor
                        </span>
                        <span className="text-sm font-semibold truncate max-w-[100px]">
                          {live.instructor}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                        <Users className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
                          Students
                        </span>
                        <span className="text-sm font-semibold">
                          {live.students}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">{live.date}</span>
                      </div>
                      <div className="w-1 h-1 rounded-full bg-border" />
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">{live.time}</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full rounded-2xl group/btn overflow-hidden relative h-12">
                    <span className="relative z-10 flex items-center gap-2">
                      {t("home.classes.join_now") || "Join Live Class"}
                      <ArrowRight
                        className={cn(
                          "w-4 h-4 transition-transform group-hover/btn:translate-x-1",
                          i18n.language === "ar" &&
                            "rotate-180 group-hover/btn:-translate-x-1"
                        )}
                      />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-emerald-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
