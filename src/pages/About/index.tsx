import { MainLayout } from "../../components/templates/MainLayout";
import { useTranslation } from "react-i18next";
import { Reveal } from "../../components/atoms/Reveal";
import { Button } from "../../components/atoms/Button";
import { useAlert } from "../../providers/AlertContext";
import { Target, Eye, Users, Award, Shield, Zap, BellRing, Sparkles, Rocket } from "lucide-react";
import { SEO } from "../../components/atoms/SEO";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

const About = () => {
  const { i18n, t } = useTranslation();
  const { showAlert } = useAlert();
  const isAr = i18n.language === "ar";

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
    { label: t("about.stats.students"), value: "10K+", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: t("about.stats.instructors"), value: "200+", icon: Award, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: t("about.stats.courses"), value: "500+", icon: Zap, color: "text-orange-500", bg: "bg-orange-500/10" },
    { label: t("about.stats.hours"), value: "20K+", icon: Sparkles, color: "text-purple-500", bg: "bg-purple-500/10" },
  ];

  const values = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: t("about.values.quality_title"),
      description: t("about.values.quality_desc"),
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: t("about.values.innovation_title"),
      description: t("about.values.innovation_desc"),
      color: "from-orange-500 to-amber-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: t("about.values.community_title"),
      description: t("about.values.community_desc"),
      color: "from-emerald-500 to-teal-500"
    },
  ];

  return (
    <MainLayout>
      <SEO
        title={t("about.title")}
        description={t("about.description")}
      />
      
      {/* Premium Hero Section */}
      <section className="relative bg-[#0F172A] pt-32 pb-48 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(white,transparent)] opacity-10" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-black uppercase tracking-widest mb-8 backdrop-blur-md">
              <Sparkles className="w-4 h-4" />
              {isAr ? "نحن نغير مستقبل التعلم" : "We are changing the future of learning"}
            </div>
            <h1 className="text-5xl lg:text-8xl font-black mb-8 text-white leading-[1.1] tracking-tight">
              {t("about.title")}<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                NMS Academy
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-xl md:text-2xl text-slate-400 max-w-4xl mx-auto leading-relaxed mb-12 font-medium">
              {t("about.description")}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-wrap justify-center gap-6">
              <Button
                onClick={handleShowAlert}
                className="rounded-2xl px-10 h-16 text-lg font-black gap-3 shadow-2xl shadow-primary/20 group"
              >
                <BellRing className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                <span>{t("about.show_alert_btn")}</span>
              </Button>
              <Button
                variant="outline"
                className="rounded-2xl px-10 h-16 text-lg font-black gap-3 border-2 border-white/10 text-white hover:bg-white/5 backdrop-blur-md"
              >
                <Rocket className="w-6 h-6" />
                <span>{isAr ? "ابدأ رحلتك" : "Start Your Journey"}</span>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Story & Vision Section */}
      <section className="container mx-auto px-4 -mt-24 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Image Side */}
          <div className="lg:col-span-6">
            <Reveal>
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 to-blue-500/30 rounded-[4rem] blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
                <div className="relative rounded-[3.5rem] overflow-hidden border-4 border-white/10 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80"
                    alt="Our Story"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                
                {/* Floating Experience Card */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  className={cn(
                    "absolute -bottom-10 bg-card/80 glass p-8 rounded-[2.5rem] shadow-2xl border-2 border-primary/20 backdrop-blur-xl hidden md:block",
                    isAr ? "-left-10" : "-right-10"
                  )}
                >
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/30">
                      <Award className="w-9 h-9" />
                    </div>
                    <div>
                      <p className="text-4xl font-black text-foreground">5+</p>
                      <p className="text-sm text-muted-foreground font-bold uppercase tracking-widest">
                        {t("about.stats.years_exp")}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </Reveal>
          </div>

          {/* Content Side */}
          <div className="lg:col-span-6 space-y-12 lg:pl-12">
            <Reveal>
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-black leading-tight">
                  {t("about.vision_mission.title")}
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                  {t("about.vision_mission.description")}
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Reveal delay={0.1}>
                <div className="group p-8 rounded-[2.5rem] bg-card glass border-2 border-transparent hover:border-primary/20 transition-all duration-500 shadow-xl hover:shadow-primary/5">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                    <Target className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-black mb-3">
                    {t("about.vision_mission.mission_title")}
                  </h3>
                  <p className="text-muted-foreground font-medium leading-relaxed">
                    {t("about.vision_mission.mission_desc")}
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="group p-8 rounded-[2.5rem] bg-card glass border-2 border-transparent hover:border-primary/20 transition-all duration-500 shadow-xl hover:shadow-primary/5">
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                    <Eye className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-black mb-3">
                    {t("about.vision_mission.vision_title")}
                  </h3>
                  <p className="text-muted-foreground font-medium leading-relaxed">
                    {t("about.vision_mission.vision_desc")}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl md:text-6xl font-black mb-6">
                {t("about.values.title")}
              </h2>
              <p className="text-xl text-muted-foreground font-medium">
                {isAr 
                  ? "المبادئ التي توجهنا في كل ما نقوم به لخدمة طلابنا" 
                  : "The principles that guide us in everything we do to serve our students"}
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {values.map((value, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div className="relative group h-full">
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 rounded-[3rem] transition-opacity duration-500",
                    value.color
                  )} />
                  <div className="p-12 rounded-[3rem] bg-card glass border-2 border-transparent hover:border-primary/20 text-center transition-all duration-500 h-full flex flex-col items-center shadow-xl hover:shadow-2xl">
                    <div className="w-20 h-20 rounded-[2rem] bg-secondary/50 text-primary flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                      {value.icon}
                    </div>
                    <h3 className="text-2xl font-black mb-6">{value.title}</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                      {value.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Stats Section */}
      <section className="py-32 bg-secondary/20 relative">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5 [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="bg-card glass border-2 border-primary/10 rounded-[4rem] p-12 md:p-20 shadow-2xl shadow-black/5">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-20">
              {stats.map((stat, index) => (
                <Reveal key={index} delay={index * 0.1}>
                  <div className="text-center group">
                    <div className={cn(
                      "w-20 h-20 mx-auto mb-8 rounded-[2rem] flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg",
                      stat.bg,
                      stat.color
                    )}>
                      <stat.icon className="w-10 h-10" />
                    </div>
                    <div className="text-5xl md:text-6xl font-black mb-4 tracking-tighter">
                      {stat.value}
                    </div>
                    <div className="text-sm md:text-base text-muted-foreground font-black uppercase tracking-[0.2em]">
                      {stat.label}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="relative rounded-[4rem] overflow-hidden bg-primary p-12 md:p-24 text-center text-white shadow-2xl shadow-primary/20 group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&q=80')] bg-cover bg-center opacity-20 group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-blue-600 opacity-90" />
            
            <div className="relative z-10 max-w-4xl mx-auto space-y-10">
              <Reveal>
                <h2 className="text-4xl md:text-7xl font-black leading-tight">
                  {isAr ? "جاهز لبدء رحلتك التعليمية معنا؟" : "Ready to start your learning journey with us?"}
                </h2>
                <p className="text-xl md:text-2xl text-white/80 font-medium mt-6">
                  {isAr 
                    ? "انضم إلى آلاف الطلاب الذين حققوا أحلامهم من خلال دوراتنا الاحترافية" 
                    : "Join thousands of students who achieved their dreams through our professional courses"}
                </p>
              </Reveal>
              
              <Reveal delay={0.2}>
                <div className="flex flex-wrap justify-center gap-6">
                  <Button className="bg-white text-primary hover:bg-slate-100 rounded-2xl px-12 h-20 text-xl font-black shadow-2xl transition-all hover:-translate-y-1">
                    {isAr ? "استكشف الدورات الآن" : "Explore Courses Now"}
                  </Button>
                  <Button variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 rounded-2xl px-12 h-20 text-xl font-black backdrop-blur-md">
                    {isAr ? "تواصل معنا" : "Contact Us"}
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default About;
