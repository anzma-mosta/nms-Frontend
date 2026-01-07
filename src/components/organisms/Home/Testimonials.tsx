import { useTranslation } from "react-i18next";
import { Quote } from "lucide-react";

export const Testimonials = () => {
  const { t } = useTranslation();

  const testimonials = [
    {
      text: t("home.testimonials.t1.text"),
      author: t("home.testimonials.t1.author"),
      role: t("home.testimonials.t1.role"),
      image: "https://i.pravatar.cc/150?u=21",
    },
    {
      text: t("home.testimonials.t2.text"),
      author: t("home.testimonials.t2.author"),
      role: t("home.testimonials.t2.role"),
      image: "https://i.pravatar.cc/150?u=22",
    },
    {
      text: t("home.testimonials.t3.text"),
      author: t("home.testimonials.t3.author"),
      role: t("home.testimonials.t3.role"),
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
