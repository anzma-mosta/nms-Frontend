import { MainLayout } from "../../components/templates/MainLayout";
import { useTranslation } from "react-i18next";
import { Reveal } from "../../components/atoms/Reveal";
import { Button } from "../../components/atoms/Button";
import { useAlert } from "../../providers/AlertContext";
import { Target, Eye, Users, Award, Shield, Zap, BellRing } from "lucide-react";
import { SEO } from "../../components/atoms/SEO";

const About = () => {
  const { t } = useTranslation();
  const { showAlert } = useAlert();

  const handleShowAlert = () => {
    showAlert({
      title: t("about.alert.title"),
      message: t("about.alert.message"),
      type: "question",
      actions: [
        {
          label: t("about.alert.confirm"),
          onClick: () => {
            showAlert({
              title: t("about.alert.success_title"),
              message: t("about.alert.success_message"),
              type: "success",
            });
          },
          variant: "default",
        },
        {
          label: t("about.alert.cancel"),
          onClick: () => console.log("Cancelled"),
          variant: "outline",
        },
      ],
    });
  };

  const stats = [
    { label: t("about.stats.students"), value: "10K+" },
    { label: t("about.stats.instructors"), value: "200+" },
    { label: t("about.stats.courses"), value: "500+" },
    { label: t("about.stats.hours"), value: "20K+" },
  ];

  const values = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: t("about.values.quality_title"),
      description: t("about.values.quality_desc"),
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: t("about.values.innovation_title"),
      description: t("about.values.innovation_desc"),
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: t("about.values.community_title"),
      description: t("about.values.community_desc"),
    },
  ];

  return (
    <MainLayout>
      <SEO
        title={t("about.title")}
        description={t("about.description")}
      />
      <div className="pt-20 pb-24">
        {/* Hero Section */}
        <section className="bg-primary/5 py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <Reveal>
              <h1 className="text-4xl lg:text-6xl font-black mb-6">
                {t("about.title")}{" "}
                <span className="text-primary">NMS Academy</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-10">
                {t("about.description")}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="flex justify-center">
                <Button
                  onClick={handleShowAlert}
                  className="rounded-full px-8 h-12 font-bold gap-2"
                >
                  <BellRing className="w-5 h-5" />
                  <span>{t("about.show_alert_btn")}</span>
                </Button>
              </div>
            </Reveal>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -ml-48 -mb-48"></div>
        </section>

        {/* Story Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <Reveal>
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
                    alt="Our Story"
                    loading="lazy"
                    className="rounded-[3rem] shadow-2xl border border-border"
                  />
                  <div className="absolute -bottom-8 -right-8 bg-card p-8 rounded-3xl shadow-xl border border-border hidden md:block">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 p-3 rounded-2xl text-primary">
                        <Award className="w-8 h-8" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">5+</p>
                        <p className="text-sm text-muted-foreground">
                          {t("about.stats.years_exp")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-3xl font-bold">
                      {t("about.vision_mission.title")}
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {t("about.vision_mission.description")}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-2xl bg-secondary/30 border border-border">
                      <Target className="w-8 h-8 text-primary mb-4" />
                      <h3 className="font-bold mb-2">
                        {t("about.vision_mission.mission_title")}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {t("about.vision_mission.mission_desc")}
                      </p>
                    </div>
                    <div className="p-6 rounded-2xl bg-secondary/30 border border-border">
                      <Eye className="w-8 h-8 text-primary mb-4" />
                      <h3 className="font-bold mb-2">
                        {t("about.vision_mission.vision_title")}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {t("about.vision_mission.vision_desc")}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 bg-secondary/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Reveal>
                <h2 className="text-3xl font-bold mb-4">
                  {t("about.values.title")}
                </h2>
              </Reveal>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <Reveal key={index} delay={index * 0.1}>
                  <div className="p-10 rounded-[2.5rem] bg-card border border-border text-center hover:shadow-lg transition-all">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-8 mx-auto">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
              {stats.map((stat, index) => (
                <Reveal key={index} delay={index * 0.1}>
                  <div className="text-center">
                    <div className="text-5xl font-black text-primary mb-4">
                      {stat.value}
                    </div>
                    <div className="text-muted-foreground font-bold uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default About;
