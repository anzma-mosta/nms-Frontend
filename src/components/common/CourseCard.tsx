import { Star, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "../../utils/cn";

interface CourseCardProps {
  course: {
    title: string;
    instructor: string;
    rating: number;
    students: number;
    price: string;
    image: string;
    category: string;
  };
}

export const CourseCard = ({ course }: CourseCardProps) => {
  const { i18n } = useTranslation();

  return (
    <div className="group bg-card border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div
          className={cn(
            "absolute top-4 px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur rounded-full text-xs font-bold text-primary",
            i18n.language === "ar" ? "right-4" : "left-4"
          )}
        >
          {course.category}
        </div>
      </div>
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
          {course.title}
        </h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
            <Users className="w-3 h-3" />
          </div>
          <span>{course.instructor}</span>
        </div>
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-1 text-orange-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-bold">{course.rating}</span>
            <span className="text-xs text-muted-foreground">
              ({course.students})
            </span>
          </div>
          <div className="text-lg font-black text-primary">{course.price}</div>
        </div>
      </div>
    </div>
  );
};
