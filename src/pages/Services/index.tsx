import { MainLayout } from "../../components/templates/MainLayout";
import { useTranslation } from "react-i18next";
import { Reveal } from "../../components/atoms/Reveal";
import { BookOpen, Video, Users, Trophy, Target, Zap } from "lucide-react";

const Services = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  const services = [
    {
      icon: <Video className="w-8 h-8" />,
      title: isAr ? "دورات مسجلة" : "Recorded Courses",
      description: isAr 
        ? "وصول غير محدود إلى مكتبة ضخمة من الدورات المسجلة بجودة عالية." 
        : "Unlimited access to a huge library of high-quality recorded courses.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: isAr ? "حصص مباشرة" : "Live Classes",
      description: isAr 
        ? "تفاعل مباشر مع أفضل المعلمين والخبراء في حصص أسبوعية." 
        : "Live interaction with top instructors and experts in weekly classes.",
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: isAr ? "شهادات معتمدة" : "Certified Certificates",
      description: isAr 
        ? "احصل على شهادات إتمام معتمدة لتعزيز ملفك الشخصي المهني." 
        : "Get certified completion certificates to boost your professional profile.",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: isAr ? "مسارات تعليمية" : "Learning Paths",
      description: isAr 
        ? "مسارات مدروسة بعناية لتنتقل بك من مستوى المبتدئ إلى الاحتراف." 
        : "Carefully designed paths to take you from beginner to professional.",
    },
  ];

  return (
    <MainLayout>
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Reveal>
              <h1 className="text-4xl font-black mb-6">{isAr ? "خدماتنا التعليمية" : "Our Educational Services"}</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {isAr 
                  ? "نقدم حلولاً تعليمية متكاملة مصممة لتناسب احتياجاتك وتساعدك على التطور." 
                  : "We provide integrated educational solutions designed to fit your needs and help you develop."}
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
                  <p className="text-muted-foreground text-lg leading-relaxed">{service.description}</p>
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
