import { MainLayout } from "../../components/templates/MainLayout";
import { useTranslation } from "react-i18next";
import { Reveal } from "../../components/atoms/Reveal";
import { Video, Users, Trophy, Target } from "lucide-react";

const Services = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: <Video className="w-8 h-8" />,
      title: t("services.list.recorded.title"),
      description: t("services.list.recorded.desc"),
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: t("services.list.live.title"),
      description: t("services.list.live.desc"),
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: t("services.list.certified.title"),
      description: t("services.list.certified.desc"),
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: t("services.list.paths.title"),
      description: t("services.list.paths.desc"),
    },
  ];

  return (
    <MainLayout>
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Reveal>
              <h1 className="text-4xl font-black mb-6">
                {t("services.title")}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t("services.description")}
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div className="p-10 rounded-[2.5rem] bg-card border border-border hover:border-primary/50 transition-all duration-300 group">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Services;
