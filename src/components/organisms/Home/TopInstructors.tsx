import { useTranslation } from "react-i18next";
import { Star, Award, ArrowRight, Users, GraduationCap } from "lucide-react";
import { cn } from "../../../utils/cn";
import { getMockInstructors } from "../../../data/mockData";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "../../atoms/Button";
import { Card } from "../../atoms/Card";

export const TopInstructors = () => {
  const { t, i18n } = useTranslation();

  const instructors = useMemo(
    () => getMockInstructors(i18n.language).slice(0, 4),
    [i18n.language]
  );

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: i18n.language === "ar" ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={cn(
              "max-w-2xl",
              i18n.language === "ar" ? "text-right" : "text-left"
            )}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <GraduationCap className="w-4 h-4" />
              <span className="text-sm font-bold tracking-wide uppercase">
                {t("home.instructors_badge") || "Expert Instructors"}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              {t("home.top_instructors")}
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t("home.learn_from_best")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Button variant="outline" size="lg" className="rounded-full group glass">
              {t("home.view_all_instructors") || "View All Instructors"}
              <ArrowRight className={cn(
                "w-4 h-4 transition-transform group-hover:translate-x-1",
                i18n.language === "ar" && "rotate-180 group-hover:-translate-x-1"
              )} />
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {instructors.map((ins, i) => (
            <motion.div
              key={ins.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Card className="group relative p-8 text-center glass border-2 border-transparent hover:border-primary/20 transition-all duration-500 rounded-[2.5rem] overflow-hidden">
                {/* Hover Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="relative mb-8 inline-block">
                    {/* Image Container with animated border */}
                    <div className="relative w-40 h-40 mx-auto">
                      <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30 animate-[spin_10s_linear_infinite] group-hover:border-primary/60 transition-colors" />
                      <div className="absolute inset-2 rounded-full overflow-hidden border-4 border-background shadow-2xl transition-transform duration-500 group-hover:scale-105">
                        <img
                          src={ins.image}
                          alt={ins.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    
                    {/* Badge */}
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: i * 0.1 + 0.3, type: "spring" }}
                      className="absolute -bottom-2 right-4 bg-primary text-white p-2.5 rounded-2xl shadow-xl shadow-primary/20"
                    >
                      <Award className="w-5 h-5" />
                    </motion.div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                        {ins.name}
                      </h3>
                      <p className="text-sm text-muted-foreground font-medium mt-1">
                        {ins.role}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-border/50 flex items-center justify-center gap-6">
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex items-center gap-1.5 text-orange-500">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="font-bold text-foreground">{ins.rating}</span>
                        </div>
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Rating</span>
                      </div>
                      
                      <div className="w-px h-8 bg-border/50" />

                      <div className="flex flex-col items-center gap-1">
                        <div className="flex items-center gap-1.5 text-primary">
                          <Users className="w-4 h-4" />
                          <span className="font-bold text-foreground">{ins.students}</span>
                        </div>
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Students</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
