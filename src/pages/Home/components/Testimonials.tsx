import { useTranslation } from "react-i18next";
import { Quote } from "lucide-react";

export const Testimonials = () => {
  const { t, i18n } = useTranslation();

  const testimonials = [
    {
      text:
        i18n.language === "ar"
          ? "المنصة غيرت حياتي المهنية بالكامل. الدورات عملية جداً والمحتوى محدث باستمرار."
          : "The platform completely changed my career. The courses are very practical and the content is constantly updated.",
      author: i18n.language === "ar" ? "أحمد سمير" : "Ahmed Samir",
      role: i18n.language === "ar" ? "مطور واجهات" : "Frontend Developer",
      image: "https://i.pravatar.cc/150?u=21",
    },
    {
      text:
        i18n.language === "ar"
          ? "أفضل تجربة تعليمية عربية خضتها. المدربون متعاونون جداً والشرح مبسط."
          : "The best Arabic educational experience I've had. The instructors are very helpful and the explanation is simplified.",
      author: i18n.language === "ar" ? "منى محمود" : "Mona Mahmoud",
      role: i18n.language === "ar" ? "مصممة جرافيك" : "Graphic Designer",
      image: "https://i.pravatar.cc/150?u=22",
    },
    {
      text:
        i18n.language === "ar"
          ? "المشاريع العملية في الدورات ساعدتني في بناء معرض أعمال قوي حصلت من خلاله على وظيفة أحلامي."
          : "The practical projects in the courses helped me build a strong portfolio through which I got my dream job.",
      author: i18n.language === "ar" ? "خالد وليد" : "Khaled Walid",
      role: i18n.language === "ar" ? "محلل بيانات" : "Data Analyst",
      image: "https://i.pravatar.cc/150?u=23",
    },
  ];

  return (
    <section className="py-24 bg-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl font-bold">{t("home.what_students_say")}</h2>
          <p className="text-muted-foreground">{t("home.testimonials_desc")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, i) => (
            <div
              key={i}
              className="bg-card p-8 rounded-3xl border relative shadow-sm hover:shadow-md transition-shadow"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/10" />
              <p className="text-muted-foreground mb-8 relative z-10 italic leading-relaxed">
                "{test.text}"
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={test.image}
                  alt={test.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-sm">{test.author}</h4>
                  <p className="text-xs text-muted-foreground">{test.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
