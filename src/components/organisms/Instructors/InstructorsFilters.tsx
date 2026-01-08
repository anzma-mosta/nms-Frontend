import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";
import { Reveal } from "../../atoms/Reveal";
import { cn } from "../../../utils/cn";
import { motion, AnimatePresence } from "framer-motion";

interface Category {
  id: string;
  label: string;
}

interface SortOption {
  id: string;
  label: string;
}

interface InstructorsFiltersProps {
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: (id: string) => void;
  sortBy: string;
  setSortBy: (id: string) => void;
  isSortOpen: boolean;
  setIsSortOpen: (isOpen: boolean) => void;
  sortOptions: SortOption[];
}

export const InstructorsFilters = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  isSortOpen,
  setIsSortOpen,
  sortOptions,
}: InstructorsFiltersProps) => {
  const { t } = useTranslation();

  return (
    <Reveal>
      <div className="bg-card/70 glass backdrop-blur-3xl border-2 border-white/10 rounded-[3rem] p-4 mb-16 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6 sticky top-28">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                "px-8 py-4 rounded-2xl text-sm font-black transition-all duration-300 transform active:scale-95",
                selectedCategory === cat.id
                  ? "bg-primary text-white shadow-xl shadow-primary/20 scale-105"
                  : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="relative w-full lg:w-auto">
          <div className="flex items-center gap-3 px-6">
            <span className="text-sm font-black text-muted-foreground whitespace-nowrap">
              {t("instructor.sort_label")}
            </span>
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center justify-between gap-4 px-6 py-4 bg-secondary/50 hover:bg-secondary rounded-2xl border border-border/50 min-w-[200px] transition-all group"
            >
              <span className="font-black text-sm">
                {sortOptions.find((opt) => opt.id === sortBy)?.label}
              </span>
              <ChevronDown
                className={cn(
                  "w-5 h-5 transition-transform duration-300",
                  isSortOpen && "rotate-180"
                )}
              />
            </button>
          </div>

          <AnimatePresence>
            {isSortOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full right-6 left-6 lg:left-auto mt-2 w-auto min-w-[200px] bg-card glass border-2 border-white/10 rounded-2xl shadow-2xl p-2 z-50 overflow-hidden"
              >
                {sortOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setSortBy(opt.id);
                      setIsSortOpen(false);
                    }}
                    className={cn(
                      "w-full text-right px-6 py-3 rounded-xl text-sm font-bold transition-all",
                      sortBy === opt.id
                        ? "bg-primary text-white"
                        : "hover:bg-primary/10 text-muted-foreground hover:text-primary"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Reveal>
  );
};
