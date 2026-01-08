import { memo } from "react";
import {
  Star,
  Users,
  ShoppingCart,
  Check,
  Clock,
  BookOpen,
  PlayCircle,
  Heart,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { cn } from "../../utils/cn";
import { Button } from "../atoms/Button";
import { useAppDispatch, useAppSelector } from "../../store";
import { addToCart } from "../../store/slices/cartSlice";
import { ROUTES } from "../../constants/routes";
import { motion, AnimatePresence } from "framer-motion";
import type { Course } from "../../types";
import { Badge } from "../atoms/Badge";

interface CourseCardProps {
  course: Course;
  variant?: "vertical" | "horizontal";
}

export const CourseCard = memo(({
  course,
  variant = "vertical",
}: CourseCardProps) => {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const isAr = i18n.language === "ar";
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.cart);
  const isInCart = items.some((item) => item.id === course.id);

  const isHorizontal = variant === "horizontal";

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isInCart) {
      dispatch(
        addToCart({
          id: course.id,
          title: course.title,
          instructor: course.instructor,
          price: course.price,
          image: course.image,
          level: course.level ?? (isAr ? "احترافي" : "Professional"),
          oldPrice: course.oldPrice,
        })
      );
    }
  };

  const handleCardClick = () => {
    navigate(ROUTES.COURSE_DETAILS.replace(":id", course.id));
  };

  return (
    <motion.div
      whileHover={{
        y: isHorizontal ? 0 : -12,
        x: isHorizontal ? (isAr ? -8 : 8) : 0,
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      onClick={handleCardClick}
      className={cn(
        "group relative flex bg-card glass border-2 border-transparent hover:border-primary/20 rounded-[2.5rem] overflow-hidden transition-all duration-500 cursor-pointer",
        isHorizontal ? "flex-row h-64" : "flex-col h-full"
      )}
    >
      {/* Image Container */}
      <div
        className={cn(
          "relative overflow-hidden m-3 rounded-[2rem] shrink-0 bg-muted",
          isHorizontal ? "w-72 h-auto" : "aspect-[16/10]"
        )}
      >
        <img
          src={course.image}
          alt={course.title}
          width={isHorizontal ? 288 : 400}
          height={isHorizontal ? 224 : 250}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

        {/* Level Badge */}
        <div className={cn("absolute top-4", isAr ? "right-4" : "left-4")}>
          <Badge
            variant="primary"
            className="bg-primary/50 text-white border-white/20 backdrop-blur-md px-4 py-1.5 font-bold uppercase tracking-wider text-[10px]"
          >
            {course.level || (isAr ? "احترافي" : "Professional")}
          </Badge>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={cn(
            "absolute top-4 w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-colors border border-white/10",
            isAr ? "left-4" : "right-4"
          )}
        >
          <Heart className="w-5 h-5" />
        </button>

        {/* Play Icon on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="w-16 h-16 rounded-full bg-primary/90 text-white flex items-center justify-center backdrop-blur-sm transform scale-50 group-hover:scale-100 transition-transform duration-500">
            <PlayCircle className="w-8 h-8" />
          </div>
        </div>
      </div>

      <div
        className={cn(
          "flex flex-col flex-1",
          isHorizontal ? "p-8 justify-center" : "p-8 pt-4 space-y-5"
        )}
      >
        {/* Rating and Students */}
        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center gap-1.5 bg-orange-500/10 text-orange-600 px-3 py-1 rounded-xl text-xs font-black">
            <Star className="w-3.5 h-3.5 fill-current" />
            {course.rating}
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground font-bold text-xs">
            <Users className="w-4 h-4 text-primary/60" />
            {course.students} {t("course.students")}
          </div>
        </div>

        {/* Title */}
        <h3
          className={cn(
            "font-black leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-300 mb-4",
            isHorizontal ? "text-3xl" : "text-2xl"
          )}
        >
          {course.title}
        </h3>

        {/* Instructor and Duration Info */}
        <div
          className={cn(
            "grid grid-cols-2 gap-4 py-5 border-y border-border/50",
            isHorizontal ? "max-w-md mb-6" : "mb-5"
          )}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-secondary/50 flex items-center justify-center text-primary">
              <BookOpen className="w-4.5 h-4.5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-bold">
                {t("course.instructor")}
              </span>
              <span className="text-xs font-bold truncate max-w-[120px]">
                {course.instructor}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-secondary/50 flex items-center justify-center text-primary">
              <Clock className="w-4.5 h-4.5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-bold">
                {t("course.duration")}
              </span>
              <span className="text-xs font-bold">
                {course.duration || "12h 30m"}
              </span>
            </div>
          </div>
        </div>

        {/* Price and Add to Cart */}
        <div
          className={cn(
            "flex items-center justify-between gap-6",
            isHorizontal ? "max-w-md mt-0" : "mt-auto pt-4"
          )}
        >
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground leading-none mb-1.5">
              {t("course.investment")}
            </span>
            <span className="text-2xl font-black text-foreground">
              {course.price}
            </span>
          </div>

          <Button
            onClick={handleAddToCart}
            variant={isInCart ? "outline" : "primary"}
            className={cn(
              "h-12 px-6 rounded-2xl font-black transition-all duration-500",
              isInCart
                ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                : isHorizontal
                  ? "w-48"
                  : "flex-1"
            )}
          >
            <AnimatePresence mode="wait">
              {isInCart ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="flex items-center gap-2"
                >
                  <Check className="w-5 h-5" />
                  <span className="text-sm">{t("course.in_cart")}</span>
                </motion.div>
              ) : (
                <motion.div
                  key="cart"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="flex items-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span className="text-sm">{t("course.add_to_cart")}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </div>
    </motion.div>
  );
});

export default CourseCard;
