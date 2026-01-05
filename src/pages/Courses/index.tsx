import { MainLayout } from "../../layouts/MainLayout";
import { useTranslation } from "react-i18next";
import { CourseCard } from "../../components/common/CourseCard";
import { Search, Filter } from "lucide-react";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

const Courses = () => {
  const { t, i18n } = useTranslation();

  const courses = [
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
    {
      title:
        i18n.language === "ar"
          ? "تحليل البيانات باستخدام Python"
          : "Data Analysis with Python",
      instructor: i18n.language === "ar" ? "د. ليلى خالد" : "Dr. Layla Khaled",
      rating: 4.6,
      students: 1500,
      price: "$149",
      image:
        "https://images.unsplash.com/photo-1551288049-bbbda536339a?w=500&q=80",
      category: i18n.language === "ar" ? "بيانات" : "Data Science",
    },
    {
      title:
        i18n.language === "ar"
          ? "التسويق الرقمي الاستراتيجي"
          : "Strategic Digital Marketing",
      instructor: i18n.language === "ar" ? "أ. يوسف صبري" : "Mr. Youssef Sabry",
      rating: 4.8,
      students: 3200,
      price: "$79",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80",
      category: i18n.language === "ar" ? "تسويق" : "Marketing",
    },
    {
      title:
        i18n.language === "ar"
          ? "الأمن السيبراني للمبتدئين"
          : "Cybersecurity for Beginners",
      instructor: i18n.language === "ar" ? "م. عمر فاروق" : "Eng. Omar Farouk",
      rating: 4.9,
      students: 950,
      price: "$129",
      image:
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&q=80",
      category: i18n.language === "ar" ? "تقنية" : "Technology",
    },
  ];

  return (
    <MainLayout>
      <div className="bg-primary/5 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">{t("nav.courses")}</h1>
          <p className="text-muted-foreground max-w-2xl">
            {i18n.language === "ar"
              ? "اكتشف مجموعة واسعة من الدورات التدريبية المصممة لمساعدتك على تطوير مهاراتك والوصول إلى أهدافك المهنية."
              : "Discover a wide range of training courses designed to help you develop your skills and reach your career goals."}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-6 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              className="pl-10"
              placeholder={
                i18n.language === "ar"
                  ? "ابحث عن كورس..."
                  : "Search for a course..."
              }
            />
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              {i18n.language === "ar" ? "تصفية" : "Filter"}
            </Button>
            <select className="bg-background border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary/20">
              <option>{i18n.language === "ar" ? "الأحدث" : "Newest"}</option>
              <option>
                {i18n.language === "ar" ? "الأكثر مبيعاً" : "Best Selling"}
              </option>
              <option>
                {i18n.language === "ar" ? "الأعلى تقييماً" : "Highest Rated"}
              </option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, i) => (
            <CourseCard key={i} course={course} />
          ))}
        </div>

        <div className="mt-16 flex justify-center gap-2">
          <Button variant="outline" disabled>
            1
          </Button>
          <Button variant="ghost">2</Button>
          <Button variant="ghost">3</Button>
          <span className="flex items-end px-2">...</span>
          <Button variant="ghost">10</Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Courses;
