import { Reveal } from "../../atoms/Reveal";
import { Users, Star, BookOpen } from "lucide-react";
import { cn } from "../../../utils/cn";
import type { TFunction } from "i18next";

interface BecomeInstructorBenefitsProps {
  t: TFunction;
}

export const BecomeInstructorBenefits = ({
  t,
}: BecomeInstructorBenefitsProps) => {
  const benefits = [
    {
      icon: <Users className="w-7 h-7" />,
      title: t("become_instructor.benefits.list.audience.title"),
      description: t("become_instructor.benefits.list.audience.desc"),
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      icon: <Star className="w-7 h-7" />,
      title: t("become_instructor.benefits.list.income.title"),
      description: t("become_instructor.benefits.list.income.desc"),
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      icon: <BookOpen className="w-7 h-7" />,
      title: t("become_instructor.benefits.list.tools.title"),
      description: t("become_instructor.benefits.list.tools.desc"),
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
  ];

  return (
    <section className="py-32 relative -mt-24 z-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <Reveal>
            <h2 className="text-4xl lg:text-5xl font-black mb-6">
              {t("become_instructor.benefits.title")}
            </h2>
            <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
              {t("become_instructor.benefits.description")}
            </p>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Reveal key={index} delay={index * 0.1}>
              <div className="p-10 rounded-[3rem] bg-card glass border-2 border-transparent hover:border-primary/20 transition-all duration-500 group shadow-xl">
                <div
                  className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg",
                    benefit.bg,
                    benefit.color
                  )}
                >
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-black mb-4">{benefit.title}</h3>
                <p className="text-muted-foreground font-medium leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
