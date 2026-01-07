import { Star, Users, ShoppingCart, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { cn } from "../../utils/cn";
import { Button } from "../atoms/Button";
import { useAppDispatch, useAppSelector } from "../../store";
import { addToCart } from "../../store/slices/cartSlice";
import { ROUTES } from "../../constants/routes";
import { t } from "i18next";
import type { Course } from "../../types";

interface CourseCardProps {
  course: Course;
}

export const CourseCard = ({ course }: CourseCardProps) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const isAr = i18n.language === "ar";
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.cart);
  const isInCart = items.some((item) => item.id === course.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isInCart) {
      dispatch(addToCart(course));
    }
  };

  const handleCardClick = () => {
    navigate(ROUTES.COURSE_DETAILS.replace(":id", course.id));
  };

  return (
    <div
      onClick={handleCardClick}
      className="group bg-card border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full cursor-pointer"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div
          className={cn(
            "absolute top-4 px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur rounded-full text-xs font-bold text-primary",
            isAr ? "right-4" : "left-4"
          )}
        >
          {/* {course.category} */}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors mb-4">
          {course.title}
        </h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
            <Users className="w-3 h-3" />
          </div>
          <span>{course.instructor}</span>
        </div>

        <div className="mt-auto space-y-4">
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-1 text-orange-500">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-bold">{course.rating}</span>
              <span className="text-xs text-muted-foreground">
                ({course.students})
              </span>
            </div>
            <div className="text-lg font-black text-primary">
              {course.price}
            </div>
          </div>

          <Button
            className={cn(
              "w-full rounded-xl gap-2 h-11 font-bold transition-all",
              isInCart
                ? "bg-green-500 hover:bg-green-600"
                : "shadow-lg shadow-primary/20"
            )}
            onClick={handleAddToCart}
            disabled={isInCart}
          >
            {isInCart ? (
              <>
                <Check className="w-4 h-4" />
                {t("cart.in_cart")}
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                {t("cart.add_to_cart")}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
