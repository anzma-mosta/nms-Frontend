import { Reveal } from "../../atoms/Reveal";
import { Users, BookOpen, Globe, Star } from "lucide-react";
import { type TFunction } from "i18next";

interface BecomeInstructorStatsProps {
  t: TFunction;
}

export const BecomeInstructorStats = ({ t }: BecomeInstructorStatsProps) => {
  const stats = [
    {
      label: t("become_instructor.stats.students"),
      value: "50K+",
      icon: Users,
    },
    {
      label: t("become_instructor.stats.courses"),
      value: "1K+",
      icon: BookOpen,
    },
    {
      label: t("become_instructor.stats.countries"),
      value: "25+",
      icon: Globe,
    },
    { label: t("become_instructor.stats.rating"), value: "4.9/5", icon: Star },
  ];

  return (
    <section className="container mx-auto px-4 mb-32 ">
      <div className="relative py-20  bg-indigo-500 rounded-[4rem] overflow-hidden m-auto bg-gray">
        <div className="absolute d-flex justify-center align-items-center inset-0 bg-amber-800 glass border-2 border-white/5 shadow-2xl"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -ml-48 -mb-48"></div>

        <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-8 place-items-center text-center">
          {stats.map((stat, index) => (
            <Reveal key={index} delay={index * 0.1}>
              <div className="space-y-4 group">
                <div className="text-4xl lg:text-6xl font-black  mb-2 group-hover:scale-110 transition-transform duration-500">
                  {stat.value}
                </div>
                <div className="text-primary font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2">
                  <stat.icon className="w-4 h-4" />
                  {stat.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
