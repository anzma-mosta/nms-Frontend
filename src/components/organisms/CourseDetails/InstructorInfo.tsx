import { ShieldCheck } from "lucide-react";
import { Badge } from "../../atoms/Badge";
import { Reveal } from "../../atoms/Reveal";
import { type Course } from "../../../types";
import { useTranslation } from "react-i18next";

interface InstructorInfoProps {
  course: Course;
}

export const InstructorInfo = ({ course }: InstructorInfoProps) => {
  const { t } = useTranslation();

  return (
    <Reveal>
      <div className="bg-card/40 backdrop-blur-2xl border-2 border-white/5 rounded-[3.5rem] p-10 md:p-16 shadow-2xl overflow-hidden group">
        <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
          <div className="relative">
            <div className="w-48 h-48 rounded-[3rem] overflow-hidden border-4 border-white/10 shadow-2xl group-hover:rotate-3 transition-transform duration-700">
              <img
                src="https://i.pravatar.cc/300?img=12"
                className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
                alt={course.instructor}
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white shadow-2xl border-4 border-[#0B0F19] group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-8 h-8" />
            </div>
          </div>
          <div className="flex-1 space-y-6 text-center md:text-right">
            <div className="space-y-2">
              <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest">
                {t("course_details.instructor")}
              </Badge>
              <h2 className="text-4xl font-black text-white">
                {course.instructor}
              </h2>
              <p className="text-primary font-black uppercase tracking-widest text-xs">
                {t("instructor.list.inst1.role")}
              </p>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed font-medium">
              خبير في تطوير الويب والذكاء الاصطناعي مع أكثر من 15 عاماً من
              الخبرة في بناء المنظمة التقنية الضخمة. قدم مئات الدورات التدريبية
              وساعد أكثر من 50 ألف طالب حول العالم في بدء مسيرتهم المهنية.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-8 pt-4">
              <div className="text-center md:text-right">
                <p className="text-white font-black text-2xl">4.9</p>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
                  {t("instructor.rating")}
                </p>
              </div>
              <div className="text-center md:text-right">
                <p className="text-white font-black text-2xl">12k+</p>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
                  {t("instructor.reviews")}
                </p>
              </div>
              <div className="text-center md:text-right">
                <p className="text-white font-black text-2xl">50k+</p>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
                  {t("instructor.total_students")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
};
