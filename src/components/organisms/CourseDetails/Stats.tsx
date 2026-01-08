import { Reveal } from "../../atoms/Reveal";
import { Clock, BookOpen, Target, Award } from "lucide-react";
import { cn } from "../../../utils/cn";
import type { TFunction } from "i18next";
import type { Course } from "../../../types";

interface CourseStatsProps {
  course: Course;
  t: TFunction;
}

export const CourseStats = ({ course, t }: CourseStatsProps) => {
  const stats = [
    {
      icon: Clock,
      label: t("course_details.duration_label"),
      value: course.duration,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      icon: BookOpen,
      label: t("course_details.lessons_label"),
      value: "85+",
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
    },
    {
      icon: Target,
      label: t("course_details.level"),
      value: course.level,
      color: "text-purple-400",
      bg: "bg-purple-400/10",
    },
    {
      icon: Award,
      label: t("course_details.certificate"),
      value: t("course_details.certified"),
      color: "text-orange-400",
      bg: "bg-orange-400/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <Reveal key={i} delay={i * 0.1}>
          <div className="bg-card/40 backdrop-blur-2xl border-2 border-white/5 hover:border-primary/20 p-8 rounded-[2.5rem] text-center transition-all duration-500 group shadow-2xl hover:shadow-primary/10">
            <div
              className={cn(
                "w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center transition-all duration-700 group-hover:scale-110 group-hover:rotate-[10deg] shadow-lg",
                stat.bg,
                stat.color
              )}
            >
              <stat.icon className="w-8 h-8" />
            </div>
            <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-black mb-2 group-hover:text-primary transition-colors">
              {stat.label}
            </p>
            <p className="font-black text-xl text-white">{stat.value}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
};
