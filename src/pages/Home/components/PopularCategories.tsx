import { useTranslation } from "react-i18next";
import {
  Code,
  Palette,
  BarChart,
  Camera,
  Music,
  Globe,
  Briefcase,
  Heart,
} from "lucide-react";
import { cn } from "../../../utils/cn";

export const PopularCategories = () => {
  const { t, i18n } = useTranslation();

  const categories = [
    {
      name: t("home.categories.programming"),
      icon: Code,
      count: "120+",
      color: "bg-blue-500",
    },
    {
      name: t("home.categories.design"),
      icon: Palette,
      count: "85+",
      color: "bg-purple-500",
    },
    {
      name: t("home.categories.business"),
      icon: BarChart,
      count: "64+",
      color: "bg-green-500",
    },
    {
      name: t("home.categories.marketing"),
      icon: Globe,
      count: "42+",
      color: "bg-orange-500",
    },
    {
      name: t("home.categories.photography"),
      icon: Camera,
      count: "28+",
      color: "bg-red-500",
    },
    {
      name: t("home.categories.music"),
      icon: Music,
      count: "15+",
      color: "bg-pink-500",
    },
    {
      name: t("home.categories.management"),
      icon: Briefcase,
      count: "36+",
      color: "bg-cyan-500",
    },
    {
      name: t("home.categories.health"),
      icon: Heart,
      count: "22+",
      color: "bg-emerald-500",
    },
  ];

  return (
    <section className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "mb-12",
            i18n.language === "ar" ? "text-right" : "text-left"
          )}
        >
          <h2 className="text-3xl font-bold mb-4">
            {t("home.popular_categories")}
          </h2>
          <p className="text-muted-foreground">{t("home.browse_categories")}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="group bg-card p-6 rounded-2xl border hover:border-primary hover:shadow-lg transition-all cursor-pointer"
            >
              <div
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4 transition-transform group-hover:scale-110",
                  cat.color
                )}
              >
                <cat.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold mb-1">{cat.name}</h3>
              <p className="text-xs text-muted-foreground">
                {cat.count} {t("common.courses")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
