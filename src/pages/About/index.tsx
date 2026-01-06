import { MainLayout } from "../../components/templates/MainLayout";
import { useTranslation } from "react-i18next";
import { Reveal } from "../../components/atoms/Reveal";
import { Button } from "../../components/atoms/Button";
import { useAlert } from "../../providers/AlertProvider";
import { Target, Eye, Users, Award, Shield, Zap, BellRing } from "lucide-react";

const About = () => {
  const { i18n } = useTranslation();
  const { showAlert } = useAlert();
  const isAr = i18n.language === "ar";

  const handleShowAlert = () => {
    showAlert({
      title: isAr ? "تنبيه ذكي (SweetAlert2)" : "Smart Alert (SweetAlert2)",
      message: isAr 
        ? "لقد تم تحديث نظام التنبيهات لاستخدام SweetAlert2 مع تصميم مخصص. هل ترغب في رؤية تنبيه نجاح؟" 
        : "The alert system has been updated to use SweetAlert2 with a custom design. Would you like to see a success alert?",
      type: "question",
      actions: [
        {
          label: isAr ? "نعم، أرني" : "Yes, show me",
          onClick: () => {
            showAlert({
              title: isAr ? "عمل رائع!" : "Great Job!",
              message: isAr ? "تم تشغيل تنبيه النجاح بنجاح." : "Success alert triggered successfully.",
              type: "success"
            });
          },
          variant: "default",
        },
        {
          label: isAr ? "لا شكراً" : "No thanks",
          onClick: () => console.log("Cancelled"),
          variant: "outline",
        },
      ],
    });
  };

  const stats = [
    { label: isAr ? "طالب" : "Students", value: "10K+" },
    { label: isAr ? "معلم" : "Instructors", value: "200+" },
    { label: isAr ? "دورة" : "Courses", value: "500+" },
    { label: isAr ? "ساعة تدريبية" : "Training Hours", value: "20K+" },
  ];

  const values = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: isAr ? "الجودة" : "Quality",
      description: isAr 
        ? "نلتزم بتقديم أعلى مستويات الجودة في محتوانا التعليمي." 
        : "We are committed to providing the highest quality in our educational content.",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: isAr ? "الابتكار" : "Innovation",
      description: isAr 
        ? "نستخدم أحدث التقنيات والأساليب لجعل التعلم ممتعاً وفعالاً." 
        : "We use the latest technologies and methods to make learning fun and effective.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: isAr ? "المجتمع" : "Community",
      description: isAr 
        ? "نؤمن بقوة التعاون والتعلم الجماعي في بناء جيل واعد." 
        : "We believe in the power of collaboration and collective learning in building a promising generation.",
    },
  ];

  return (
    <MainLayout>
      <div className="pt-20 pb-24">
        {/* Hero Section */}
        <section className="bg-primary/5 py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <Reveal>
              <h1 className="text-4xl lg:text-6xl font-black mb-6">
                {isAr ? "عن" : "About"} <span className="text-primary">NMS Academy</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-10">
                {isAr 
                  ? "نحن منصة تعليمية رائدة تهدف إلى تمكين العقول العربية وتزويدها بالمهارات اللازمة للنجاح في سوق العمل الحديث." 
                  : "We are a leading educational platform aiming to empower Arabic minds and equip them with the skills needed for success in the modern labor market."}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="flex justify-center">
                <Button 
                  onClick={handleShowAlert}
                  className="rounded-full px-8 h-12 font-bold gap-2"
                >
                  <BellRing className="w-5 h-5" />
                  <span>{isAr ? "عرض التنبيه الذكي" : "Show Smart Alert"}</span>
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
                    className="rounded-[3rem] shadow-2xl border border-border"
                  />
                  <div className="absolute -bottom-8 -right-8 bg-card p-8 rounded-3xl shadow-xl border border-border hidden md:block">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 p-3 rounded-2xl text-primary">
                        <Award className="w-8 h-8" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">5+</p>
                        <p className="text-sm text-muted-foreground">{isAr ? "سنوات خبرة" : "Years Experience"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-3xl font-bold">{isAr ? "رؤيتنا ورسالتنا" : "Our Vision & Mission"}</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {isAr 
                        ? "بدأت رحلتنا برؤية بسيطة: جعل التعليم عالي الجودة متاحاً للجميع في أي مكان وزمان. نحن نسعى جاهدين لسد الفجوة بين التعليم التقليدي ومتطلبات سوق العمل." 
                        : "Our journey began with a simple vision: making high-quality education accessible to everyone, anywhere, anytime. We strive to bridge the gap between traditional education and labor market requirements."}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-2xl bg-secondary/30 border border-border">
                      <Target className="w-8 h-8 text-primary mb-4" />
                      <h3 className="font-bold mb-2">{isAr ? "مهمتنا" : "Our Mission"}</h3>
                      <p className="text-sm text-muted-foreground">{isAr ? "تمكين الطلاب من خلال توفير أفضل الموارد التعليمية." : "Empowering students by providing the best educational resources."}</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-secondary/30 border border-border">
                      <Eye className="w-8 h-8 text-primary mb-4" />
                      <h3 className="font-bold mb-2">{isAr ? "رؤيتنا" : "Our Vision"}</h3>
                      <p className="text-sm text-muted-foreground">{isAr ? "أن نكون المنصة التعليمية المفضلة في الوطن العربي." : "To be the preferred educational platform in the Arab world."}</p>
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
                <h2 className="text-3xl font-bold mb-4">{isAr ? "قيمنا الجوهرية" : "Our Core Values"}</h2>
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
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
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
                    <div className="text-5xl font-black text-primary mb-4">{stat.value}</div>
                    <div className="text-muted-foreground font-bold uppercase tracking-wider">{stat.label}</div>
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
