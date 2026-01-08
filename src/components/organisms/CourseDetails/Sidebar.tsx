import { useState } from "react";
import {
  Play,
  Monitor,
  Smartphone,
  Download,
  Trophy,
  MessageSquare,
  Heart,
  Share2,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "../../atoms/Badge";
import { Button } from "../../atoms/Button";
import { Reveal } from "../../atoms/Reveal";
import { cn } from "../../../utils/cn";
import { type Course } from "../../../types";
import { useTranslation } from "react-i18next";

interface CourseSidebarProps {
  course: Course;
}

export const CourseSidebar = ({ course }: CourseSidebarProps) => {
  const { t } = useTranslation();
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="sticky top-32 space-y-8">
      <Reveal delay={0.3}>
        <div className="bg-[#0B0F19]/80 backdrop-blur-3xl border-2 border-white/10 rounded-[3.5rem] p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] overflow-hidden relative group">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-[64px] transition-transform duration-700 group-hover:scale-110" />

          {/* Preview Image/Video Trigger */}
          <div className="relative aspect-video rounded-[2rem] overflow-hidden mb-10 group/preview cursor-pointer shadow-2xl border-2 border-white/5">
            <img
              src={course.image}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover/preview:scale-110"
              alt={course.title}
            />
            <div className="absolute inset-0 bg-black/40 group-hover/preview:bg-black/20 transition-colors duration-500 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center shadow-2xl shadow-primary/50 group-hover/preview:scale-110 transition-transform duration-500">
                <Play className="w-8 h-8 fill-current ml-1" />
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <Badge className="w-full justify-center bg-black/60 backdrop-blur-md border-white/10 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em]">
                {t("course_details.preview_course")}
              </Badge>
            </div>
          </div>

          {/* Pricing */}
          <div className="space-y-8 mb-10">
            <div className="flex items-end gap-4">
              <span className="text-5xl font-black text-white tracking-tighter">
                {course.price}
              </span>
              {course.oldPrice && (
                <span className="text-2xl text-slate-500 line-through font-bold mb-1">
                  {course.oldPrice}
                </span>
              )}
              {course.oldPrice && (
                <Badge className="bg-emerald-400/10 text-emerald-400 border-emerald-400/20 px-4 py-2 rounded-xl text-xs font-black mb-1">
                  {Math.round(
                    ((parseFloat(course.oldPrice.replace(/[^0-9.]/g, "")) -
                      parseFloat(course.price.replace(/[^0-9.]/g, ""))) /
                      parseFloat(course.oldPrice.replace(/[^0-9.]/g, ""))) *
                      100
                  )}
                  % OFF
                </Badge>
              )}
            </div>

            <div className="space-y-4">
              <Button className="w-full h-16 rounded-2xl text-lg font-black shadow-2xl shadow-primary/40 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10">
                  {t("course_details.buy_now")}
                </span>
              </Button>
              <Button
                variant="outline"
                className="w-full h-16 rounded-2xl text-lg font-black border-2 border-white/10 hover:bg-white/5 transition-all"
              >
                {t("course_details.add_to_cart")}
              </Button>
            </div>
          </div>

          {/* Features List */}
          <div className="space-y-6 pt-8 border-t border-white/10">
            <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-black">
              {t("course_details.includes")}
            </p>
            <div className="space-y-5">
              {[
                { icon: Monitor, text: t("course_details.lifetime_access") },
                { icon: Smartphone, text: t("course_details.mobile_access") },
                { icon: Download, text: t("course_details.resources") },
                { icon: Trophy, text: t("course_details.certificate") },
                {
                  icon: MessageSquare,
                  text: t("course_details.direct_support"),
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 group/item cursor-default"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover/item:bg-primary group-hover/item:text-white transition-all duration-300">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="text-slate-400 font-bold group-hover/item:text-white transition-colors">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-10">
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={cn(
                "flex-1 h-14 rounded-2xl border-2 flex items-center justify-center gap-3 font-black text-xs uppercase tracking-widest transition-all duration-500",
                isWishlisted
                  ? "bg-red-500/10 border-red-500/20 text-red-500"
                  : "bg-white/5 border-white/5 text-slate-400 hover:border-white/20"
              )}
            >
              <Heart
                className={cn("w-5 h-5", isWishlisted && "fill-current")}
              />
              {t("course_details.wishlist")}
            </button>
            <button className="flex-1 h-14 rounded-2xl bg-white/5 border-2 border-white/5 text-slate-400 hover:border-white/20 flex items-center justify-center gap-3 font-black text-xs uppercase tracking-widest transition-all duration-500">
              <Share2 className="w-5 h-5" />
              {t("course_details.share")}
            </button>
          </div>
        </div>
      </Reveal>

      {/* Secure Payment Notice */}
      <Reveal delay={0.5}>
        <div className="bg-emerald-400/5 border-2 border-emerald-400/10 rounded-[2.5rem] p-8 flex items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-emerald-400/10 text-emerald-400 flex items-center justify-center shrink-0 shadow-inner">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <p className="text-white font-black text-sm mb-1">
              {t("course_details.secure_payment")}
            </p>
            <p className="text-slate-500 text-xs font-bold leading-relaxed">
              {t("course_details.secure_payment_desc")}
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  );
};
