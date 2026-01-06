import { useTranslation } from "react-i18next";
import { Video, Calendar, User, Clock, ArrowRight } from "lucide-react";
import { Button } from "../../atoms/Button";
import { cn } from "../../../utils/cn";

export const Classes = () => {
  const { t, i18n } = useTranslation();

  const liveClasses = [
    {
      title:
        i18n.language === "ar"
          ? "مراجعة شاملة للغة الإنجليزية"
          : "Comprehensive English Review",
      instructor: i18n.language === "ar" ? "أ. سارة أحمد" : "Mrs. Sarah Ahmed",
      date: "2026-01-10",
      time: "18:00",
      students: 45,
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&q=80",
    },
    {
      title:
        i18n.language === "ar"
          ? "أساسيات الفيزياء للثانوية"
          : "High School Physics Basics",
      instructor: i18n.language === "ar" ? "د. علي منصور" : "Dr. Ali Mansour",
      date: "2026-01-12",
      time: "20:00",
      students: 120,
      image:
        "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=500&q=80",
    },
    {
      title:
        i18n.language === "ar"
          ? "مهارات التحدث أمام الجمهور"
          : "Public Speaking Skills",
      instructor: i18n.language === "ar" ? "أ. محمود صقر" : "Mr. Mahmoud Saqr",
      date: "2026-01-15",
      time: "17:30",
      students: 88,
      image:
        "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=500&q=80",
    },
  ];

  return (
    <section className="py-24 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div
            className={cn(
              "space-y-4",
              i18n.language === "ar" ? "text-right" : "text-left"
            )}
          >
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Video className="text-red-500 animate-pulse" />
              {t("home.classes.title")}
            </h2>
            <p className="text-muted-foreground">
              {t("home.classes.description")}
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            {t("home.classes.view_schedule")}
            <Calendar className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {liveClasses.map((live, i) => (
            <div
              key={i}
              className="bg-card border rounded-3xl overflow-hidden hover:shadow-xl transition-all group"
            >
              <div className="relative aspect-video">
                <img
                  src={live.image}
                  alt={live.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
                  LIVE
                </div>
              </div>
              <div className="p-6 space-y-4">
                <h3 className="font-bold text-xl line-clamp-1">{live.title}</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="w-4 h-4" />
                    <span>{live.instructor}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{live.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{live.time}</span>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t flex items-center justify-between">
                  <span className="text-sm font-medium text-primary">
                    {live.students} {t("home.classes.students_joined")}
                  </span>
                  <Button size="sm" className="gap-2">
                    {t("home.classes.book_seat")}
                    <ArrowRight
                      className={cn(
                        "w-4 h-4",
                        i18n.language === "ar" && "rotate-180"
                      )}
                    />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
