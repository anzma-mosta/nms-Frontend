import { useTranslation } from "react-i18next";
import {
  ShieldCheck,
  Award,
  BookOpen,
  Star,
  Mail,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";
import { Reveal } from "../../atoms/Reveal";
import { Button } from "../../atoms/Button";

interface InstructorSidebarProps {
  instructorName: string;
}

export const InstructorSidebar = ({
  instructorName,
}: InstructorSidebarProps) => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  return (
    <aside className="lg:col-span-4 space-y-10">
      {/* Achievements Card */}
      <Reveal direction="left">
        <div className="bg-primary rounded-[3.5rem] p-10 text-white shadow-2xl shadow-primary/20 relative overflow-hidden group">
          {/* Decorative Patterns */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2" />

          <h3 className="text-2xl font-black mb-10 flex items-center gap-4 relative z-10">
            <div className="p-3 rounded-2xl bg-white/10">
              <ShieldCheck className="w-7 h-7" />
            </div>
            {t("instructor.achievements")}
          </h3>

          <div className="space-y-6 relative z-10">
            {[
              { title: t("instructor.certified_trainer"), icon: Award },
              { title: t("instructor.best_seller_author"), icon: BookOpen },
              { title: t("instructor.top_instructor"), icon: Star },
            ].map((ach, idx) => (
              <motion.div
                key={idx}
                whileHover={{ x: isAr ? -10 : 10 }}
                className="flex items-center gap-5 bg-white/10 p-5 rounded-3xl border border-white/10 backdrop-blur-sm"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                  <ach.icon className="w-6 h-6" />
                </div>
                <span className="font-bold text-lg">{ach.title}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Quick Contact Form */}
      <Reveal direction="left" delay={0.2}>
        <div className="bg-card/30 glass border border-white/10 rounded-[3.5rem] p-10 space-y-8">
          <h3 className="text-2xl font-black flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-green-500/10 text-green-500">
              <Mail className="w-6 h-6" />
            </div>
            {t("instructor.have_question")}
          </h3>
          <p className="text-muted-foreground font-medium leading-relaxed">
            {t("instructor.contact_consultation", { name: instructorName })}
          </p>

          <div className="space-y-4">
            <input
              type="text"
              placeholder={t("home.contact.form_name_placeholder")}
              className="w-full h-14 px-6 rounded-2xl bg-white/5 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            />
            <textarea
              placeholder={t("home.contact.form_message_placeholder")}
              rows={4}
              className="w-full p-6 rounded-2xl bg-white/5 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
            />
            <Button className="w-full h-14 rounded-2xl font-black">
              {t("instructor.send_message")}
            </Button>
          </div>
        </div>
      </Reveal>

      {/* Verification & Trust */}
      <Reveal direction="left" delay={0.4}>
        <div className="bg-white/5 glass border border-dashed border-white/20 rounded-[3rem] p-8 text-center">
          <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h4 className="text-xl font-black mb-2">
            {t("home.certified_platform")}
          </h4>
          <p className="text-sm text-muted-foreground font-medium">
            {t("home.certified_certificates")}
          </p>
        </div>
      </Reveal>
    </aside>
  );
};
