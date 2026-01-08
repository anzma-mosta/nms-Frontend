import { useTranslation } from "react-i18next";
import { GraduationCap, Award } from "lucide-react";
import { Reveal } from "../../atoms/Reveal";
import type { Education } from "../../../types";

interface InstructorEducationProps {
  education: Education[];
}

export const InstructorEducation = ({
  education,
}: InstructorEducationProps) => {
  const { t } = useTranslation();

  return (
    <Reveal direction="up" delay={0.4}>
      <div className="bg-card/30 glass border border-white/10 rounded-[3.5rem] p-10 h-full relative overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/5 rounded-br-[5rem]" />

        <h3 className="text-2xl font-black mb-12 flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500">
            <GraduationCap className="w-6 h-6" />
          </div>
          {t("instructor.education")}
        </h3>

        <div className="space-y-10">
          {education.map((edu, idx) => (
            <div key={idx} className="flex gap-6 group">
              <div className="w-16 h-16 rounded-[1.5rem] bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-blue-500/10 group-hover:border-blue-500/30 transition-all duration-500">
                <Award className="w-8 h-8 text-blue-500" />
              </div>
              <div>
                <span className="text-xs font-black text-blue-500 mb-1 block">
                  {edu.year}
                </span>
                <h4 className="text-lg font-black mb-1 group-hover:text-blue-500 transition-colors">
                  {edu.degree}
                </h4>
                <p className="text-sm text-muted-foreground">{edu.school}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
};
