import { Reveal } from "../../atoms/Reveal";
import { Headphones, Zap, Sparkles } from "lucide-react";
import { cn } from "../../../utils/cn";

interface ContactSupportProps {
  isAr: boolean;
}

export const ContactSupport = ({ isAr }: ContactSupportProps) => {
  const supportItems = [
    {
      icon: Headphones,
      title: isAr ? "دعم فني مباشر" : "Live Support",
      desc: isAr
        ? "تحدث مع عملائنا مباشرة للحصول على مساعدة فورية"
        : "Chat with our support team for immediate assistance",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      icon: Zap,
      title: isAr ? "استجابة سريعة" : "Fast Response",
      desc: isAr
        ? "نضمن الرد على جميع رسائل البريد خلال أقل من 24 ساعة"
        : "We guarantee a response to all emails in less than 24 hours",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      icon: Sparkles,
      title: isAr ? "مركز المساعدة" : "Help Center",
      desc: isAr
        ? "تصفح الأسئلة الشائعة والمقالات التعليمية"
        : "Browse FAQs and educational articles",
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
  ];

  return (
    <section className="pb-32 container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {supportItems.map((item, idx) => (
          <Reveal key={idx} delay={idx * 0.1}>
            <div className="bg-card glass border-2 border-transparent hover:border-primary/20 p-10 rounded-[3rem] text-center transition-all duration-500 group shadow-xl">
              <div
                className={cn(
                  "w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6",
                  item.bg,
                  item.color
                )}
              >
                <item.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black mb-4">{item.title}</h3>
              <p className="text-muted-foreground font-medium leading-relaxed">
                {item.desc}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};
