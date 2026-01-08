import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  BarChart3,
  ChevronDown,
  LayoutGrid,
  List,
} from "lucide-react";
import { Input } from "../../atoms/Input";
import { Button } from "../../atoms/Button";
import { cn } from "../../../utils/cn";
import type { TFunction } from "i18next";

interface CoursesSearchFilterProps {
  isAr: boolean;
  t: TFunction;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  isSortOpen: boolean;
  setIsSortOpen: (open: boolean) => void;
  currentSortLabel?: string;
  sortOptions: { value: string; label: string }[];
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
}

export const CoursesSearchFilter = ({
  isAr,
  t,
  searchQuery,
  setSearchQuery,
  categories,
  selectedCategory,
  setSelectedCategory,
  isSidebarOpen,
  setIsSidebarOpen,
  sortBy,
  setSortBy,
  isSortOpen,
  setIsSortOpen,
  currentSortLabel,
  sortOptions,
  viewMode,
  setViewMode,
}: CoursesSearchFilterProps) => {
  return (
    <div className="sticky top-24 z-40 mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-4 md:p-6 rounded-[2.5rem] border border-white/10 shadow-2xl shadow-black/40 backdrop-blur-2xl"
      >
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search
              className={cn(
                "absolute top-1/2 -translate-y-1/2 text-primary w-5 h-5",
                isAr ? "right-6" : "left-6"
              )}
            />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                "h-14 rounded-2xl bg-white/5 border-white/10 focus:border-primary/50 focus:bg-white/10 transition-all text-lg text-white placeholder:text-slate-500",
                isAr ? "pr-14 pl-6" : "pl-14 pr-6"
              )}
              placeholder={t("courses.search_placeholder")}
            />
          </div>

          {/* Quick Categories */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full lg:w-auto pb-2 lg:pb-0">
            {categories.slice(0, 5).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-6 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap border",
                  selectedCategory === cat
                    ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                    : "bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10"
                )}
              >
                {cat === "All" ? (isAr ? "الكل" : "All") : cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto">
            {/* Advanced Filter Trigger */}
            <Button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              variant="outline"
              className={cn(
                "h-14 flex-1 lg:flex-none rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold flex items-center gap-2 px-6",
                isSidebarOpen && "border-primary text-primary bg-primary/10"
              )}
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span className="hidden sm:inline">{t("courses.filter")}</span>
            </Button>

            {/* Sort Dropdown */}
            <div className="relative flex-1 lg:flex-none">
              <Button
                onClick={() => setIsSortOpen(!isSortOpen)}
                variant="outline"
                className="h-14 w-full rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold flex items-center justify-between gap-4 px-6"
              >
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <span className="truncate">{currentSortLabel}</span>
                </div>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform",
                    isSortOpen && "rotate-180"
                  )}
                />
              </Button>

              <AnimatePresence>
                {isSortOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full mt-2 right-0 w-56 glass border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-50"
                  >
                    {sortOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          setSortBy(opt.value);
                          setIsSortOpen(false);
                        }}
                        className={cn(
                          "w-full text-right p-4 text-sm font-bold transition-colors hover:bg-white/10",
                          sortBy === opt.value
                            ? "text-primary bg-primary/5"
                            : "text-slate-300"
                        )}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* View Mode */}
            <div className="hidden md:flex bg-white/5 p-1.5 rounded-2xl border border-white/10">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-2.5 rounded-xl transition-all",
                  viewMode === "grid"
                    ? "bg-primary text-white shadow-lg"
                    : "text-slate-500 hover:text-white"
                )}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "p-2.5 rounded-xl transition-all",
                  viewMode === "list"
                    ? "bg-primary text-white shadow-lg"
                    : "text-slate-500 hover:text-white"
                )}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
