import { useTranslation } from "react-i18next";
import { Star, Users, BookOpen, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../../atoms/Button";
import { Badge } from "../../atoms/Badge";
import { Reveal } from "../../atoms/Reveal";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import { cn } from "../../../utils/cn";
import { motion } from "framer-motion";
import type { Instructor } from "../../../types";

interface InstructorsGridProps {
  instructors: Instructor[];
  categories: { id: string; label: string }[];
}

export const InstructorsGrid = ({
  instructors,
  categories,
}: InstructorsGridProps) => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {instructors.map((instructor, i) => (
        <Reveal key={instructor.id} delay={i * 0.1}>
          <motion.div
            whileHover={{ y: -15 }}
            className="group relative h-full bg-card/40 glass border-2 border-transparent hover:border-primary/20 rounded-[3.5rem] p-8 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-primary/5 flex flex-col overflow-hidden"
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[4rem] -translate-y-8 translate-x-8 group-hover:translate-y-0 group-hover:translate-x-0 transition-transform duration-700" />

            {/* Image & Header */}
            <div className="relative mb-8 flex items-center gap-6">
              <div className="relative w-32 h-32 shrink-0">
                <div className="absolute inset-0 bg-primary/20 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border-4 border-background shadow-2xl transition-transform duration-700 group-hover:rotate-6">
                  <img
                    src={instructor.image}
                    alt={instructor.name}
                    className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-700"
                  />
                </div>
              </div>
              <div>
                <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] font-black px-4 py-1.5 rounded-xl mb-3 uppercase tracking-widest">
                  {categories.find((c) => c.id === instructor.specialty)
                    ?.label || instructor.role}
                </Badge>
                <h3 className="text-2xl font-black mb-1 group-hover:text-primary transition-colors leading-tight">
                  {instructor.name}
                </h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={cn(
                          "w-3 h-3",
                          s <= Math.floor(instructor.rating || 0)
                            ? "text-orange-400 fill-current"
                            : "text-slate-300"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-black text-muted-foreground">
                    ({instructor.rating})
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col">
              <p className="text-muted-foreground font-medium text-base line-clamp-3 mb-8 leading-relaxed">
                {instructor.bio}
              </p>

              {/* Premium Stats Bar */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="bg-secondary/30 p-4 rounded-[2rem] text-center border border-border/50 group-hover:bg-primary/5 group-hover:border-primary/20 transition-all duration-500">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Users className="w-4 h-4 text-primary" />
                    <p className="font-black text-xl leading-none">
                      {(instructor.studentsCount || 0).toLocaleString()}
                    </p>
                  </div>
                  <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">
                    {t("instructor.student")}
                  </p>
                </div>
                <div className="bg-secondary/30 p-4 rounded-[2rem] text-center border border-border/50 group-hover:bg-primary/5 group-hover:border-primary/20 transition-all duration-500">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <BookOpen className="w-4 h-4 text-primary" />
                    <p className="font-black text-xl leading-none">
                      {instructor.coursesCount || 0}
                    </p>
                  </div>
                  <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">
                    {t("instructor.course")}
                  </p>
                </div>
              </div>

              <Link
                to={ROUTES.INSTRUCTOR_DETAILS.replace(":id", instructor.id)}
                className="mt-auto"
              >
                <Button className="w-full h-16 rounded-[1.5rem] font-black text-lg group/btn relative overflow-hidden bg-white dark:bg-slate-900 border-2 border-border hover:border-primary hover:bg-primary hover:text-white transition-all duration-500">
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {t("instructor.profile")}
                    {isAr ? (
                      <ArrowLeft className="w-6 h-6 group-hover/btn:-translate-x-2 transition-transform" />
                    ) : (
                      <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-2 transition-transform" />
                    )}
                  </span>
                </Button>
              </Link>
            </div>
          </motion.div>
        </Reveal>
      ))}
    </div>
  );
};
