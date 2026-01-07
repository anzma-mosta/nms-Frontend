import { useTranslation } from "react-i18next";
import { Quote, Star } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../../../utils/cn";

export const Testimonials = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  const testimonials = [
    {
      text: t("home.testimonials.t1.text"),
      author: t("home.testimonials.t1.author"),
      role: t("home.testimonials.t1.role"),
      image: "https://i.pravatar.cc/150?u=21",
      rating: 5,
    },
    {
      text: t("home.testimonials.t2.text"),
      author: t("home.testimonials.t2.author"),
      role: t("home.testimonials.t2.role"),
      image: "https://i.pravatar.cc/150?u=22",
      rating: 5,
    },
    {
      text: t("home.testimonials.t3.text"),
      author: t("home.testimonials.t3.author"),
      role: t("home.testimonials.t3.role"),
      image: "https://i.pravatar.cc/150?u=23",
      rating: 5,
    },
  ];

  return (
    <section className="py-32 relative overflow-hidden bg-background">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm"
          >
            <Star className="w-4 h-4 fill-primary" />
            <span>{isAr ? "آراء طلابنا" : "Student Success Stories"}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-6xl font-black tracking-tight"
          >
            {isAr ? "ماذا يقول" : "What Our"}
            <span className="text-primary"> {isAr ? "طلابنا عنا؟" : "Students Say"}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium"
          >
            {t("home.testimonials_desc")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className="h-full glass p-10 rounded-[3rem] border-2 border-transparent hover:border-primary/20 transition-all duration-500 shadow-xl shadow-primary/5 flex flex-col">
                <div className="flex gap-1 mb-6">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <Quote className={cn(
                  "absolute top-10 w-12 h-12 text-primary/10 transition-transform duration-500 group-hover:scale-110",
                  isAr ? "left-10" : "right-10"
                )} />

                <p className="text-lg text-muted-foreground mb-10 font-medium leading-relaxed italic flex-grow">
                  "{test.text}"
                </p>

                <div className="flex items-center gap-5 pt-6 border-t border-border/50">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                    <img
                      src={test.image}
                      alt={test.author}
                      className="relative w-14 h-14 rounded-2xl object-cover border-2 border-primary/10"
                    />
                  </div>
                  <div>
                    <h4 className="font-black text-lg group-hover:text-primary transition-colors">
                      {test.author}
                    </h4>
                    <p className="text-sm text-muted-foreground font-bold">
                      {test.role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
