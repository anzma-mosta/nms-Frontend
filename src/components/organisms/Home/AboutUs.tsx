import { useTranslation } from "react-i18next";
import { Target, Eye, Users } from "lucide-react";
import { cn } from "../../../utils/cn";

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
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                alt="About NMS Academy"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-8">
                <div className="flex items-center gap-4 text-white">
                  <div className="bg-primary p-3 rounded-2xl">
                    <Users className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">10k+</p>
                    <p className="text-sm opacity-80">
                      {t("home.about.students_community")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={cn(
              "space-y-8",
              i18n.language === "ar" ? "text-right" : "text-left"
            )}
          >
            <div className="space-y-4">
              <h2 className="text-primary font-bold tracking-wider uppercase text-sm">
                {t("home.about.subtitle")}
              </h2>
              <h3 className="text-4xl font-black text-foreground leading-tight">
                {t("home.about.title")}
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t("home.about.description")}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-4 rounded-2xl hover:bg-secondary/50 transition-colors group"
                >
                  <div
                    className={cn(
                      "flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110",
                      feature.bg,
                      feature.color
                    )}
                  >
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{feature.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
