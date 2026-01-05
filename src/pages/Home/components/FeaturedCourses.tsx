import { useTranslation } from "react-i18next";
import { Button } from "../../../components/ui/Button";
import { cn } from "../../../utils/cn";
import { CourseCard } from "../../../components/common/CourseCard";

export const FeaturedCourses = () => {
  const { t, i18n } = useTranslation();

  const featuredCourses = [
    {
      title:
        i18n.language === "ar"
          ? "أساسيات تطوير الويب المتكامل"
          : "Full-Stack Web Development Basics",
      instructor: i18n.language === "ar" ? "د. أحمد علي" : "Dr. Ahmed Ali",
      rating: 4.8,
      students: 1250,
      price: i18n.language === "ar" ? "مجاني" : "Free",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&q=80",
      category: i18n.language === "ar" ? "برمجة" : "Programming",
    },
    {
      title:
        i18n.language === "ar"
          ? "تصميم واجهات المستخدم الحديثة"
          : "Modern UI/UX Design",
      instructor: i18n.language === "ar" ? "م. سارة حسن" : "Eng. Sarah Hassan",
      rating: 4.9,
      students: 850,
      price: "$199",
      image:
        "https://images.unsplash.com/photo-1541462608141-ad4d05ed08c3?w=500&q=80",
      category: i18n.language === "ar" ? "تصميم" : "Design",
    },
    {
      title:
        i18n.language === "ar"
          ? "إدارة المشاريع باحترافية"
          : "Professional Project Management",
      instructor: i18n.language === "ar" ? "أ. محمود سعد" : "Mr. Mahmoud Saad",
      rating: 4.7,
      students: 2100,
      price: "$99",
      image:
        "https://images.unsplash.com/photo-1454165833767-02a698d1316a?w=500&q=80",
      category: i18n.language === "ar" ? "إدارة أعمال" : "Business",
    },
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-end mb-12">
        <div
          className={cn(
            "space-y-4",
            i18n.language === "ar" ? "text-right" : "text-left"
          )}
        >
          <h2 className="text-3xl font-bold">{t("home.latest_courses")}</h2>
          <p className="text-muted-foreground">{t("home.explore_best")}</p>
        </div>
        <Button variant="outline">{t("home.view_all")}</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredCourses.map((course, i) => (
          <CourseCard key={i} course={course} />
        ))}
      </div>
    </section>
  );
};
