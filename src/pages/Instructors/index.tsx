import { MainLayout } from "../../layouts/MainLayout";
import { useTranslation } from "react-i18next";
import { Github, Twitter, Linkedin, Star, BookOpen, Users } from "lucide-react";
import { Button } from "../../components/ui/Button";

const Instructors = () => {
  const { t, i18n } = useTranslation();

  const instructors = [
    {
      name: i18n.language === "ar" ? "د. أحمد علي" : "Dr. Ahmed Ali",
      role:
        i18n.language === "ar" ? "خبير تطوير الويب" : "Web Development Expert",
      rating: 4.9,
      students: "15,000+",
      courses: 12,
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
      bio:
        i18n.language === "ar"
          ? "أكثر من 10 سنوات خبرة في تطوير المواقع وتدريب الآلاف من المبرمجين حول العالم."
          : "Over 10 years of experience in web development and training thousands of developers worldwide.",
    },
    {
      name: i18n.language === "ar" ? "م. سارة حسن" : "Eng. Sarah Hassan",
      role: i18n.language === "ar" ? "مصممة تجربة مستخدم" : "UI/UX Designer",
      rating: 4.8,
      students: "8,500+",
      courses: 8,
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
      bio:
        i18n.language === "ar"
          ? "متخصصة في بناء واجهات مستخدم جذابة وسهلة الاستخدام للشركات الناشئة."
          : "Specialized in building attractive and user-friendly interfaces for startups.",
    },
    {
      name: i18n.language === "ar" ? "أ. محمود سعد" : "Mr. Mahmoud Saad",
      role:
        i18n.language === "ar"
          ? "مستشار إدارة مشاريع"
          : "Project Management Consultant",
      rating: 4.7,
      students: "12,000+",
      courses: 15,
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
      bio:
        i18n.language === "ar"
          ? "خبير في منهجيات Agile و PMP مع خبرة واسعة في إدارة المشاريع التقنية."
          : "Expert in Agile and PMP methodologies with extensive experience in managing tech projects.",
    },
    {
      name: i18n.language === "ar" ? "د. ليلى خالد" : "Dr. Layla Khaled",
      role: i18n.language === "ar" ? "عالمة بيانات" : "Data Scientist",
      rating: 4.9,
      students: "6,000+",
      courses: 6,
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
      bio:
        i18n.language === "ar"
          ? "باحثة في مجال الذكاء الاصطناعي وخبيرة في تحليل البيانات الضخمة."
          : "AI researcher and big data analysis expert.",
    },
  ];

  return (
    <MainLayout>
      <div className="bg-primary/5 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">{t("nav.instructors")}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {i18n.language === "ar"
              ? "تعلم من نخبة الخبراء والمتخصصين في مختلف المجالات التقنية والإدارية."
              : "Learn from the elite experts and specialists in various technical and administrative fields."}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {instructors.map((instructor, i) => (
            <div
              key={i}
              className="group bg-card border rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300"
            >
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="absolute inset-0 bg-primary/10 rounded-full scale-110 group-hover:scale-125 transition-transform duration-500" />
                <img
                  src={instructor.image}
                  alt={instructor.name}
                  className="relative w-full h-full object-cover rounded-full border-4 border-background"
                />
              </div>
              <h3 className="text-xl font-bold mb-1">{instructor.name}</h3>
              <p className="text-primary text-sm font-medium mb-4">
                {instructor.role}
              </p>

              <div className="flex items-center justify-center gap-4 mb-6 py-4 border-y border-muted/50">
                <div className="text-center">
                  <div className="flex items-center gap-1 text-orange-500 font-bold justify-center">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-sm">{instructor.rating}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground uppercase">
                    {i18n.language === "ar" ? "تقييم" : "Rating"}
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-1 font-bold justify-center">
                    <Users className="w-3 h-3" />
                    <span className="text-sm">{instructor.students}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground uppercase">
                    {i18n.language === "ar" ? "طالب" : "Students"}
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-1 font-bold justify-center">
                    <BookOpen className="w-3 h-3" />
                    <span className="text-sm">{instructor.courses}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground uppercase">
                    {i18n.language === "ar" ? "دورة" : "Courses"}
                  </p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2 mb-6 h-10">
                {instructor.bio}
              </p>

              <div className="flex justify-center gap-3">
                <Button variant="ghost" className="w-8 h-8 p-0 rounded-full">
                  <Linkedin className="w-4 h-4" />
                </Button>
                <Button variant="ghost" className="w-8 h-8 p-0 rounded-full">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button variant="ghost" className="w-8 h-8 p-0 rounded-full">
                  <Github className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Instructors;
