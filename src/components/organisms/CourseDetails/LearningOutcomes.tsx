import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal } from "../../atoms/Reveal";
import { type Course } from "../../../types";
import { useTranslation } from "react-i18next";

interface LearningOutcomesProps {
  course: Course;
}

export const LearningOutcomes = ({ course }: LearningOutcomesProps) => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  if (!course.learningPoints || course.learningPoints.length === 0) return null;

  return (
    <Reveal>
      <div className="bg-card/40 backdrop-blur-3xl border-2 border-white/5 rounded-[3.5rem] p-10 md:p-16 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-bl-[120px] transition-transform duration-1000 group-hover:scale-110 blur-3xl" />
        <h2 className="text-4xl font-black mb-12 flex items-center gap-6">
          <div className="w-14 h-14 rounded-[1.25rem] bg-primary text-white flex items-center justify-center shadow-2xl shadow-primary/30 rotate-3 group-hover:rotate-0 transition-transform duration-500">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          {t("course_details.learning_outcomes_title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
          {course.learningPoints.map((point: string, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: isAr ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex items-start gap-5 group/item"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-400/10 text-emerald-400 flex items-center justify-center shrink-0 mt-1 transition-all duration-500 group-hover/item:bg-emerald-400 group-hover/item:text-white group-hover/item:scale-110 group-hover/item:rotate-12 shadow-sm">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="text-slate-400 font-bold leading-relaxed group-hover/item:text-white transition-colors text-lg">
                {point}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </Reveal>
  );
};
