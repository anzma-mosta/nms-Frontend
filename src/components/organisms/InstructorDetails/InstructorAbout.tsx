import { useTranslation } from "react-i18next";
import { Quote, Award } from "lucide-react";
import { Reveal } from "../../atoms/Reveal";
import { motion } from "framer-motion";

interface InstructorAboutProps {
  bio: string;
  skills: string[];
}

export const InstructorAbout = ({ bio, skills }: InstructorAboutProps) => {
  const { t } = useTranslation();

  return (
    <section>
      <Reveal>
        <div className="relative bg-card/30 glass border border-white/10 rounded-[4rem] p-10 md:p-16 overflow-hidden group">
          {/* Decorative Bg */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-bl-[10rem] -z-10 group-hover:scale-110 transition-transform duration-1000" />

          <div className="flex items-center gap-4 mb-10">
            <div className="w-3 h-10 bg-primary rounded-full" />
            <h2 className="text-4xl font-black tracking-tight">
              {t("instructor.profile")}
            </h2>
          </div>

          <div className="prose prose-xl dark:prose-invert max-w-none">
            <p className="text-2xl text-muted-foreground leading-[1.8] font-medium italic mb-12 relative">
              <Quote className="absolute -top-6 -right-8 w-16 h-16 text-primary/10 -scale-x-100" />
              {bio}
            </p>
          </div>

          <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
            <Award className="w-7 h-7 text-primary" />
            {t("instructor.technical_skills")}
          </h3>

          <div className="flex flex-wrap gap-4">
            {skills.map((skill: string, idx: number) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5, scale: 1.05 }}
                className="px-8 py-4 rounded-2xl bg-white/5 glass border border-white/10 font-bold hover:border-primary/50 transition-all flex items-center gap-3 cursor-default"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
                {skill}
              </motion.div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
};
