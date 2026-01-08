import { useTranslation } from "react-i18next";
import { Briefcase } from "lucide-react";
import { Reveal } from "../../atoms/Reveal";
import type { Experience } from "../../../types";

interface InstructorExperienceProps {
  experience: Experience[];
}

export const InstructorExperience = ({
  experience,
}: InstructorExperienceProps) => {
  const { t } = useTranslation();

  return (
    <Reveal direction="up" delay={0.2}>
      <div className="bg-card/30 glass border border-white/10 rounded-[3.5rem] p-10 h-full relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[5rem]" />

        <h3 className="text-2xl font-black mb-12 flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-primary/10 text-primary">
            <Briefcase className="w-6 h-6" />
          </div>
          {t("instructor.experience")}
        </h3>

        <div className="space-y-12 relative before:absolute before:right-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
          {experience.map((exp, idx) => (
            <div key={idx} className="relative pr-12 group">
              <div className="absolute right-1.5 top-1.5 w-5 h-5 bg-background border-4 border-primary rounded-full z-10 group-hover:scale-125 transition-transform" />
              <span className="inline-block px-4 py-1.5 rounded-xl bg-primary/10 text-primary text-xs font-black mb-3">
                {exp.period}
              </span>
              <h4 className="text-xl font-black mb-1 group-hover:text-primary transition-colors">
                {exp.role}
              </h4>
              <p className="text-sm font-bold text-muted-foreground mb-4">
                {exp.company}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-500">
                {exp.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
};
