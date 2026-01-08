import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MainLayout } from "../../components/templates/MainLayout";
import { Card } from "../../components/atoms/Card";
import { ChevronDown, HelpCircle, BookOpen, CreditCard, User, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/cn";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export default function FAQPage() {
  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const [activeId, setActiveId] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      category: "general",
      question: isAr ? "ما هي أكاديمية WAKP؟" : "What is WAKP Academy?",
      answer: isAr 
        ? "أكاديمية WAKP هي منصة تعليمية متطورة تهدف لتوفير أفضل الكورسات التعليمية في مجالات البرمجة والتكنولوجيا مع شهادات معتمدة." 
        : "WAKP Academy is an advanced educational platform aiming to provide the best courses in programming and technology with certified certificates.",
    },
    {
      category: "courses",
      question: isAr ? "كيف يمكنني الاشتراك في كورس؟" : "How can I subscribe to a course?",
      answer: isAr 
        ? "يمكنك تصفح قائمة الكورسات، اختيار الكورس المناسب، ثم الضغط على 'إضافة إلى السلة' وإتمام عملية الدفع." 
        : "You can browse the courses list, choose the right course, then click 'Add to Cart' and complete the payment process.",
    },
    {
      category: "payments",
      question: isAr ? "ما هي وسائل الدفع المتاحة؟" : "What payment methods are available?",
      answer: isAr 
        ? "نحن ندعم البطاقات الائتمانية، المحافظ الإلكترونية، والتحويل البنكي المباشر." 
        : "We support credit cards, e-wallets, and direct bank transfers.",
    },
    {
      category: "account",
      question: isAr ? "هل يمكنني الوصول للكورس مدى الحياة؟" : "Can I access the course for life?",
      answer: isAr 
        ? "نعم، بمجرد الشراء ستحصل على وصول غير محدود لمحتوى الكورس مدى الحياة." 
        : "Yes, once purchased, you get unlimited lifetime access to the course content.",
    },
  ];

  const categories = [
    { id: "general", label: isAr ? "عام" : "General", icon: HelpCircle },
    { id: "courses", label: isAr ? "الكورسات" : "Courses", icon: BookOpen },
    { id: "payments", label: isAr ? "الدفع" : "Payments", icon: CreditCard },
    { id: "account", label: isAr ? "الحساب" : "Account", icon: User },
  ];

  return (
    <MainLayout>
      <div className="py-20 bg-secondary/30 min-h-screen">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-black tracking-widest uppercase">
              <ShieldCheck className="w-4 h-4" />
              {isAr ? "مركز المساعدة" : "Help Center"}
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">
              {isAr ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
              {isAr 
                ? "كل ما تحتاج معرفته عن المنصة والكورسات وكيفية البدء في رحلتك التعليمية." 
                : "Everything you need to know about the platform, courses, and how to start your learning journey."}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {categories.map((cat) => (
              <Card 
                key={cat.id}
                className="p-6 flex flex-col items-center gap-3 border-2 hover:border-primary transition-all cursor-pointer group"
              >
                <div className="p-3 bg-secondary rounded-2xl text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <cat.icon className="w-6 h-6" />
                </div>
                <span className="font-black text-sm">{cat.label}</span>
              </Card>
            ))}
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card 
                key={index} 
                className={cn(
                  "overflow-hidden border-2 transition-all",
                  activeId === index ? "border-primary shadow-lg shadow-primary/5" : "hover:border-primary/50"
                )}
              >
                <button
                  onClick={() => setActiveId(activeId === index ? null : index)}
                  className="w-full p-6 flex items-center justify-between text-right gap-4"
                >
                  <span className={cn(
                    "text-lg font-black tracking-tight transition-colors",
                    activeId === index ? "text-primary" : "text-foreground"
                  )}>
                    {faq.question}
                  </span>
                  <ChevronDown className={cn(
                    "w-5 h-5 text-muted-foreground transition-transform duration-300 shrink-0",
                    activeId === index && "rotate-180 text-primary"
                  )} />
                </button>
                <AnimatePresence>
                  {activeId === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-0 text-muted-foreground font-medium leading-relaxed border-t border-border/50 mt-2 py-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            ))}
          </div>

          <div className="mt-20 p-10 bg-primary rounded-[2.5rem] text-primary-foreground text-center space-y-6 relative overflow-hidden shadow-2xl shadow-primary/40">
            <div className="relative z-10 space-y-4">
              <h2 className="text-3xl font-black">{isAr ? "لا تجد إجابة لسؤالك؟" : "Still have questions?"}</h2>
              <p className="opacity-90 font-medium">{isAr ? "فريقنا مستعد دائماً لمساعدتك في أي وقت." : "Our team is always ready to help you anytime."}</p>
              <button className="bg-white text-primary px-8 py-4 rounded-2xl font-black hover:scale-105 transition-transform">
                {isAr ? "تواصل معنا الآن" : "Contact Us Now"}
              </button>
            </div>
            <HelpCircle className="absolute -bottom-10 -right-10 w-64 h-64 opacity-10 rotate-12" />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
