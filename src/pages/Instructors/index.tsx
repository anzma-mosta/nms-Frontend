import { useState, useMemo } from "react";
import { MainLayout } from "../../components/templates/MainLayout";
import { useTranslation } from "react-i18next";
import { Star, BookOpen, Users, ArrowRight, ArrowLeft, Search, Filter } from "lucide-react";
import { Button } from "../../components/atoms/Button";
import { Reveal } from "../../components/atoms/Reveal";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

const Instructors = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const [searchQuery, setSearchQuery] = useState("");

  const instructors = [
    {
      id: "inst1",
      name: isAr ? "د. أحمد علي" : "Dr. Ahmed Ali",
      role: isAr ? "خبير تطوير الويب" : "Web Development Expert",
      rating: 4.9,
      students: "15,000+",
      courses: 12,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
      bio: isAr
        ? "أكثر من 10 سنوات خبرة في تطوير المواقع وتدريب الآلاف من المبرمجين حول العالم."
        : "Over 10 years of experience in web development and training thousands of developers worldwide.",
    },
    {
      id: "inst2",
      name: isAr ? "م. سارة حسن" : "Eng. Sarah Hassan",
      role: isAr ? "مصممة تجربة مستخدم" : "UI/UX Designer",
      rating: 4.8,
      students: "8,500+",
      courses: 8,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
      bio: isAr
        ? "متخصصة في بناء واجهات مستخدم جذابة وسهلة الاستخدام للشركات الناشئة."
        : "Specialized in building attractive and user-friendly interfaces for startups.",
    },
    {
      id: "inst3",
      name: isAr ? "أ. محمود سعد" : "Mr. Mahmoud Saad",
      role: isAr ? "مستشار إدارة مشاريع" : "Project Management Consultant",
      rating: 4.7,
      students: "12,000+",
      courses: 15,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
      bio: isAr
        ? "خبير في منهجيات Agile و PMP مع خبرة واسعة في إدارة المشاريع التقنية."
        : "Expert in Agile and PMP methodologies with extensive experience in managing tech projects.",
    },
    {
      id: "inst4",
      name: isAr ? "د. ليلى خالد" : "Dr. Layla Khaled",
      role: isAr ? "عالمة بيانات" : "Data Scientist",
      rating: 4.9,
      students: "6,000+",
      courses: 6,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
      bio: isAr
        ? "باحثة في مجال الذكاء الاصطناعي وخبيرة في تحليل البيانات الضخمة."
        : "AI researcher and big data analysis expert.",
    },
  ];

  const filteredInstructors = useMemo(() => {
    return instructors.filter(inst => 
      inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.role.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, instructors]);

  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <Reveal direction="up">
            <h1 className="text-4xl md:text-6xl font-black mb-6">{t("nav.instructors")}</h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed">
              {t("instructor.hero_desc")}
            </p>
            
            <div className="max-w-2xl mx-auto relative group">
              <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("instructor.search_placeholder")}
                className="w-full h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-14 outline-none focus:ring-2 focus:ring-primary/50 transition-all text-lg"
              />
              <button className="absolute left-4 top-1/2 -translate-y-1/2 bg-primary text-white p-2 rounded-xl">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredInstructors.map((instructor, i) => (
            <Reveal key={instructor.id} delay={i * 0.1}>
              <div className="group bg-card border border-border rounded-3xl p-8 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <div className="absolute inset-0 bg-primary/20 rounded-full scale-110 group-hover:scale-125 transition-transform duration-500 blur-xl opacity-0 group-hover:opacity-100" />
                  <img
                    src={instructor.image}
                    alt={instructor.name}
                    className="relative w-full h-full object-cover rounded-full border-4 border-background shadow-xl"
                  />
                </div>
                
                <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">{instructor.name}</h3>
                <p className="text-primary font-medium text-sm mb-4">
                  {instructor.role}
                </p>
                
                <div className="flex items-center justify-center gap-4 mb-6 py-4 border-y border-border/50">
                  <div className="text-center">
                    <p className="font-bold text-lg">{instructor.courses}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{t("instructor.course")}</p>
                  </div>
                  <div className="w-px h-8 bg-border/50"></div>
                  <div className="text-center">
                    <p className="font-bold text-lg">{instructor.rating}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{t("instructor.rating")}</p>
                  </div>
                  <div className="w-px h-8 bg-border/50"></div>
                  <div className="text-center">
                    <p className="font-bold text-lg">{instructor.students}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{t("instructor.student")}</p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2 mb-6 h-10">
                  {instructor.bio}
                </p>

                <Link to={`${ROUTES.INSTRUCTOR_DETAILS.replace(":id", instructor.id)}`}>
                  <Button variant="outline" className="w-full rounded-xl gap-2 group/btn">
                    {t("common.details")}
                    {isAr ? <ArrowLeft className="w-4 h-4 group-hover/btn:-translate-x-1 transition-transform" /> : <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />}
                  </Button>
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        {filteredInstructors.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-2">{t("instructor.no_results_title")}</h3>
            <p className="text-muted-foreground">{t("instructor.no_results_desc")}</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Instructors;
