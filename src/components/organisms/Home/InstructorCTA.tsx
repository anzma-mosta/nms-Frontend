import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap, Users, TrendingUp, Award } from "lucide-react";
import { Button } from "../../atoms/Button";
import { Reveal } from "../../atoms/Reveal";
import { ROUTES } from "../../../constants/routes";
import { cn } from "../../../utils/cn";

export const InstructorCTA = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  const stats = [
    {
      icon: <Users className="w-6 h-6" />,
      label: isAr ? "أكثر من 1000 معلم" : "1000+ Instructors",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      label: isAr ? "نمو مهني مستمر" : "Career Growth",
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      icon: <Award className="w-6 h-6" />,
      label: isAr ? "شهادات معتمدة" : "Certified Platform",
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl -ml-64 -mb-64" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={cn(
          "grid grid-cols-1 lg:grid-cols-2 gap-16 items-center bg-card border border-border rounded-[3rem] p-8 lg:p-16 shadow-2xl shadow-primary/5",
          isAr ? "text-right" : "text-left"
        )}>
          <div className="space-y-8">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm">
                <GraduationCap className="w-4 h-4" />
                <span>{isAr ? "فرص التدريس" : "Teaching Opportunities"}</span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="text-3xl lg:text-5xl font-black leading-tight">
                {isAr ? "هل أنت مستعد لمشاركة" : "Ready to share your"}
                <span className="text-primary block">{isAr ? "خبرتك مع العالم؟" : "expertise with the world?"}</span>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                {isAr 
                  ? "انضم إلى مجتمعنا المتنامي من الخبراء والمعلمين. نحن نوفر لك الأدوات والجمهور لنشر معرفتك وتحقيق دخل إضافي." 
                  : "Join our growing community of experts and instructors. We provide the tools and audience to spread your knowledge and earn extra income."}
              </p>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <Reveal key={index} delay={0.3 + index * 0.1}>
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-secondary/50 border border-border/50">
                    <div className={cn("p-3 rounded-xl", stat.bg, stat.color)}>
                      {stat.icon}
                    </div>
                    <span className="font-bold text-sm">{stat.label}</span>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.6}>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to={ROUTES.BECOME_INSTRUCTOR}>
                  <Button size="lg" className="rounded-full px-10 h-14 text-lg font-bold gap-2 group">
                    <span>{isAr ? "سجل كمعلم الآن" : "Register as Instructor"}</span>
                    <ArrowRight className={cn(
                      "w-5 h-5 transition-transform group-hover:translate-x-1",
                      isAr && "rotate-180 group-hover:-translate-x-1"
                    )} />
                  </Button>
                </Link>
                <Link to={ROUTES.CONTACT}>
                  <Button variant="outline" size="lg" className="rounded-full px-10 h-14 text-lg font-bold">
                    {isAr ? "تعرف على المزيد" : "Learn More"}
                  </Button>
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.4}>
            <div className="relative">
              {/* Decorative Frame */}
              <div className="absolute -inset-4 border-2 border-primary/20 rounded-[2.5rem] -rotate-3 z-0" />
              <div className="absolute -inset-4 border-2 border-blue-500/20 rounded-[2.5rem] rotate-2 z-0" />
              
              <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80" 
                  alt="Instructor teaching" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Floating Card */}
                <div className={cn(
                  "absolute bottom-6 bg-card/90 backdrop-blur-md p-6 rounded-2xl border border-border shadow-xl",
                  isAr ? "left-6 right-auto" : "right-6 left-auto"
                )}>
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-3 rtl:space-x-reverse">
                      {[1, 2, 3].map((i) => (
                        <img 
                          key={i}
                          src={`https://i.pravatar.cc/150?u=${i}`}
                          alt="Instructor"
                          className="w-10 h-10 rounded-full border-2 border-card"
                        />
                      ))}
                    </div>
                    <div>
                      <p className="text-sm font-bold">{isAr ? "انضم إلينا" : "Join them"}</p>
                      <p className="text-xs text-muted-foreground">{isAr ? "أكثر من 500 خبير" : "500+ experts"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
