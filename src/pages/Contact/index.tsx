import { MainLayout } from "../../components/templates/MainLayout";
import { ContactUs } from "../../components/organisms/Home/ContactUs";
import { SEO } from "../../components/atoms/SEO";
import { useTranslation } from "react-i18next";
import { Reveal } from "../../components/atoms/Reveal";
import { Sparkles, MessageSquare, Headphones, Zap } from "lucide-react";
import { cn } from "../../utils/cn";

const Contact = () => {
  const { i18n, t } = useTranslation();
  const isAr = i18n.language === "ar";

  return (
    <MainLayout>
      <SEO
        title={t("home.contact.title")}
        description={t("home.contact.description")}
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
              <MessageSquare className="w-4 h-4" />
              {isAr ? "نحن هنا من أجلك" : "We are here for you"}
            </div>
            <h1 className="text-5xl lg:text-8xl font-black mb-8 text-white leading-[1.1] tracking-tight">
              {isAr ? "تواصل" : "Get in"}<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                {isAr ? "مع خبراء المنصة" : "Touch With Us"}
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-xl md:text-2xl text-slate-400 max-w-4xl mx-auto leading-relaxed mb-12 font-medium">
              {isAr 
                ? "لديك استفسار أو تحتاج إلى مساعدة؟ فريق الدعم الفني والخبراء لدينا جاهزون للرد على جميع تساؤلاتكم على مدار الساعة." 
                : "Have a question or need help? Our support team and experts are ready to answer all your questions around the clock."}
            </p>
          </Reveal>
        </div>
      </section>

      <div className="-mt-32 relative z-20 pb-32">
        <ContactUs />
      </div>

      {/* FAQ Quick Links or Support Stats */}
      <section className="pb-32 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Headphones,
              title: isAr ? "دعم فني مباشر" : "Live Support",
              desc: isAr ? "تحدث مع عملائنا مباشرة للحصول على مساعدة فورية" : "Chat with our support team for immediate assistance",
              color: "text-blue-500",
              bg: "bg-blue-500/10"
            },
            {
              icon: Zap,
              title: isAr ? "استجابة سريعة" : "Fast Response",
              desc: isAr ? "نضمن الرد على جميع رسائل البريد خلال أقل من 24 ساعة" : "We guarantee a response to all emails in less than 24 hours",
              color: "text-emerald-500",
              bg: "bg-emerald-500/10"
            },
            {
              icon: Sparkles,
              title: isAr ? "مركز المساعدة" : "Help Center",
              desc: isAr ? "تصفح الأسئلة الشائعة والمقالات التعليمية" : "Browse FAQs and educational articles",
              color: "text-purple-500",
              bg: "bg-purple-500/10"
            }
          ].map((item, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <div className="bg-card glass border-2 border-transparent hover:border-primary/20 p-10 rounded-[3rem] text-center transition-all duration-500 group shadow-xl">
                <div className={cn(
                  "w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6",
                  item.bg,
                  item.color
                )}>
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black mb-4">{item.title}</h3>
                <p className="text-muted-foreground font-medium leading-relaxed">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </MainLayout>
  );
};

export default Contact;
