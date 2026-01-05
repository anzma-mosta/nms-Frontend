import { useTranslation } from "react-i18next";
import { BookOpen, Users, Clock, Star } from "lucide-react";

export const Stats = () => {
  const { t } = useTranslation();

  const stats = [
    { label: t("home.stats.courses"), value: "500+", icon: BookOpen },
    { label: t("home.stats.instructors"), value: "120+", icon: Users },
    { label: t("home.stats.hours"), value: "10k+", icon: Clock },
    { label: t("home.stats.rating"), value: "4.9/5", icon: Star },
  ];

  return (
    <section className="py-12 border-y bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center space-y-2"
            >
              <div className="p-3 rounded-2xl bg-primary/5 text-primary">
                <stat.icon className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
