import { useTranslation } from "react-i18next";
import { Search } from "lucide-react";
import { Button } from "../../atoms/Button";
import { Badge } from "../../atoms/Badge";
import { Reveal } from "../../atoms/Reveal";
import { cn } from "../../../utils/cn";
import { motion } from "framer-motion";

interface InstructorsHeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const InstructorsHero = ({
  searchQuery,
  setSearchQuery,
}: InstructorsHeroProps) => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  return (
    <section className="relative bg-[#0F172A] pt-40 pb-52 overflow-hidden">
      {/* Animated Background Gradients */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"
      />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(white,transparent)] opacity-10" />

      <div className="container mx-auto px-4 relative z-10">
        <Reveal>
          <div className="max-w-4xl mx-auto text-center">
            <Badge
              variant="outline"
              className="mb-6 px-6 py-2 border-primary/30 text-primary bg-primary/10 rounded-full text-sm font-black tracking-widest uppercase"
            >
              {t("home.top_instructors")}
            </Badge>
            <h1 className="text-6xl md:text-8xl font-black mb-8 text-white tracking-tighter leading-none">
              {t("nav.instructors")}
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto mb-16 leading-relaxed font-medium">
              {t("instructor.hero_desc")}
            </p>
          </div>

          {/* Premium Search Bar */}
          <div className="max-w-3xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-blue-500 to-purple-600 rounded-[2.5rem] blur opacity-25 group-focus-within:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex items-center bg-[#1E293B]/80 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-3 overflow-hidden shadow-2xl">
              <div
                className={cn(
                  "flex items-center flex-1 px-6",
                  isAr ? "flex-row" : "flex-row-reverse"
                )}
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t("instructor.search_placeholder")}
                  className="w-full h-14 bg-transparent outline-none text-white text-xl placeholder:text-slate-500 font-bold"
                />
                <Search className="w-8 h-8 text-slate-400 group-focus-within:text-primary transition-all transform group-focus-within:scale-110" />
              </div>
              <Button className="h-16 px-12 rounded-[1.5rem] font-black text-lg shadow-2xl shadow-primary/40 bg-primary hover:bg-primary/90 transition-all active:scale-95">
                {isAr ? "ابحث الآن" : "Search Now"}
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
