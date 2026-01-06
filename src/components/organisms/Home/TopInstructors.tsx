import { useTranslation } from "react-i18next";
import { Star, Award } from "lucide-react";
import { cn } from "../../../utils/cn";

export const TopInstructors = () => {
  const { t, i18n } = useTranslation();

  const instructors = [
    {
      name: t("home.instructors.i1.name"),
      role: t("home.instructors.i1.role"),
      rating: 4.9,
      students: "15k+",
      image: "https://i.pravatar.cc/150?u=11",
    },
    {
      name: t("home.instructors.i2.name"),
      role: t("home.instructors.i2.role"),
      rating: 4.8,
      students: "12k+",
      image: "https://i.pravatar.cc/150?u=12",
    },
    {
      name: t("home.instructors.i3.name"),
      role: t("home.instructors.i3.role"),
      rating: 4.9,
      students: "8k+",
      image: "https://i.pravatar.cc/150?u=13",
    },
    {
      name: t("home.instructors.i4.name"),
      role: t("home.instructors.i4.role"),
      rating: 4.7,
      students: "10k+",
      image: "https://i.pravatar.cc/150?u=14",
    },
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        className={cn(
          "mb-12",
          i18n.language === "ar" ? "text-right" : "text-left"
        )}
      >
        <h2 className="text-3xl font-bold mb-4">{t("home.top_instructors")}</h2>
        <p className="text-muted-foreground">{t("home.learn_from_best")}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {instructors.map((ins, i) => (
          <div key={i} className="group text-center">
            <div className="relative mb-6 inline-block">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-background shadow-xl mx-auto transition-transform group-hover:scale-105">
                <img
                  src={ins.image}
                  alt={ins.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-full shadow-lg">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-lg font-bold mb-1">{ins.name}</h3>
            <p className="text-sm text-muted-foreground mb-3">{ins.role}</p>
            <div className="flex items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-1 text-orange-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-bold">{ins.rating}</span>
              </div>
              <div className="text-muted-foreground font-medium">
                {ins.students} {t("home.active_students")}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
