import { MainLayout } from "../../components/templates/MainLayout";
import { useTranslation } from "react-i18next";
import { Button } from "../../components/atoms/Button";
import { GraduationCap, BookOpen, Users, Star, CheckCircle2, ArrowLeft, Send, User, Mail, Briefcase, FileText } from "lucide-react";
import { Reveal } from "../../components/atoms/Reveal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAlert } from "../../providers/AlertProvider";
import { cn } from "../../utils/cn";

const instructorSchema = z.object({
  fullName: z.string().min(3, { message: "الاسم الكامل يجب أن يكون 3 أحرف على الأقل" }),
  email: z.string().email({ message: "البريد الإلكتروني غير صالح" }),
  specialty: z.string().min(2, { message: "يرجى تحديد التخصص" }),
  experience: z.string().min(10, { message: "يرجى تقديم نبذة مختصرة عن خبرتك" }),
});

type InstructorFormValues = z.infer<typeof instructorSchema>;

const BecomeInstructor = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const { showAlert } = useAlert();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InstructorFormValues>({
    resolver: zodResolver(instructorSchema),
  });

  const onSubmit = async (data: InstructorFormValues) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Form Data:", data);
    
    showAlert({
      title: isAr ? "تم إرسال طلبك بنجاح!" : "Application Sent Successfully!",
      message: isAr 
        ? "شكراً لاهتمامك بالانضمام إلينا. سيقوم فريقنا بمراجعة طلبك والتواصل معك قريباً." 
        : "Thank you for your interest in joining us. Our team will review your application and contact you soon.",
      type: "success",
    });
    
    reset();
  };

  const benefits = [
    {
      icon: <Users className="w-6 h-6" />,
      title: isAr ? "جمهور واسع" : "Global Audience",
      description: isAr ? "صل إلى آلاف الطلاب المتحمسين للتعلم من مختلف أنحاء العالم." : "Reach thousands of students eager to learn from around the world.",
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: isAr ? "دخل إضافي" : "Extra Income",
      description: isAr ? "حقق دخلاً مجزياً من خلال مشاركة خبراتك ومعارفك مع الآخرين." : "Earn significant income by sharing your expertise and knowledge.",
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: isAr ? "أدوات متطورة" : "Advanced Tools",
      description: isAr ? "استخدم أدواتنا الحديثة لإنشاء وإدارة دوراتك التدريبية بكل سهولة." : "Use our modern tools to create and manage your courses with ease.",
    },
  ];

  return (
    <MainLayout>
      <div className="pt-20 pb-24">
        {/* Hero Section */}
        <section className="bg-primary/5 py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <Reveal>
                <div className={isAr ? "text-right" : "text-left"}>
                  <h1 className="text-4xl lg:text-6xl font-black mb-6 text-foreground leading-tight">
                    {isAr ? "شارك خبرتك مع" : "Share your knowledge with"}
                    <span className="text-primary block">{isAr ? "جيل المستقبل" : "the next generation"}</span>
                  </h1>
                  <p className="text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
                    {isAr 
                      ? "انضم إلى نخبة من المعلمين والخبراء وساهم في بناء مجتمع تعليمي عربي متميز." 
                      : "Join a community of elite instructors and help build a distinguished Arabic educational community."}
                  </p>
                  <Button 
                    size="lg" 
                    className="rounded-full px-8 h-12 text-lg font-bold"
                    onClick={() => document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    {isAr ? "ابدأ التدريس اليوم" : "Start Teaching Today"}
                    <ArrowLeft className={`mr-2 w-5 h-5 ${!isAr && "rotate-180"}`} />
                  </Button>
                </div>
              </Reveal>
              <Reveal>
                <div className="relative">
                  <div className="absolute -inset-4 bg-primary/20 rounded-full blur-3xl opacity-50 animate-pulse"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80" 
                    alt="Instructor" 
                    className="rounded-3xl shadow-2xl relative z-10 border border-border"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Reveal>
                <h2 className="text-3xl font-bold mb-4">{isAr ? "لماذا تنضم إلينا؟" : "Why Join Us?"}</h2>
                <p className="text-muted-foreground">{isAr ? "نحن نوفر لك كل ما تحتاجه للنجاح في مسيرتك التعليمية" : "We provide everything you need to succeed in your teaching career"}</p>
              </Reveal>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <Reveal key={index} delay={index * 0.1}>
                  <div className="p-8 rounded-2xl border border-border bg-card hover:shadow-lg transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-foreground/10 text-background py-20 rounded-[3rem] mx-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {[
                { label: isAr ? "طالب" : "Students", value: "50K+" },
                { label: isAr ? "دورة" : "Courses", value: "1K+" },
                { label: isAr ? "دولة" : "Countries", value: "25+" },
                { label: isAr ? "تقييم" : "Rating", value: "4.9/5" },
              ].map((stat, index) => (
                <Reveal key={index} delay={index * 0.1}>
                  <div>
                    <div className="text-4xl lg:text-5xl font-black text-primary mb-2">{stat.value}</div>
                    <div className="text-muted-foreground uppercase tracking-wider text-sm">{stat.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section id="apply-form" className="py-24 bg-secondary/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Reveal>
                <h2 className="text-3xl lg:text-4xl font-black mb-4">
                  {isAr ? "قدم طلبك الآن" : "Apply Now"}
                </h2>
                <p className="text-muted-foreground">
                  {isAr 
                    ? "املأ النموذج أدناه وسنقوم بمراجعة طلبك خلال 48 ساعة." 
                    : "Fill out the form below and we will review your application within 48 hours."}
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.2}>
              <div className="bg-card border border-border rounded-[2.5rem] p-8 lg:p-12 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-16 -mt-16"></div>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <label className="text-sm font-bold flex items-center gap-2">
                        <User className="w-4 h-4 text-primary" />
                        {isAr ? "الاسم الكامل" : "Full Name"}
                      </label>
                      <input
                        {...register("fullName")}
                        placeholder={isAr ? "أدخل اسمك الكامل" : "Enter your full name"}
                        className={cn(
                          "w-full bg-secondary/50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary outline-none transition-all",
                          errors.fullName && "ring-2 ring-red-500"
                        )}
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-sm font-bold flex items-center gap-2">
                        <Mail className="w-4 h-4 text-primary" />
                        {isAr ? "البريد الإلكتروني" : "Email Address"}
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="example@mail.com"
                        className={cn(
                          "w-full bg-secondary/50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary outline-none transition-all",
                          errors.email && "ring-2 ring-red-500"
                        )}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Specialty */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-primary" />
                      {isAr ? "التخصص التعليمي" : "Educational Specialty"}
                    </label>
                    <input
                      {...register("specialty")}
                      placeholder={isAr ? "مثلاً: تطوير الويب، التصميم، التسويق" : "e.g., Web Development, Design, Marketing"}
                      className={cn(
                        "w-full bg-secondary/50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary outline-none transition-all",
                        errors.specialty && "ring-2 ring-red-500"
                      )}
                    />
                    {errors.specialty && (
                      <p className="text-red-500 text-xs mt-1">{errors.specialty.message}</p>
                    )}
                  </div>

                  {/* Experience */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold flex items-center gap-2">
                      <FileText className="w-4 h-4 text-primary" />
                      {isAr ? "نبذة عن خبرتك" : "About Your Experience"}
                    </label>
                    <textarea
                      {...register("experience")}
                      rows={4}
                      placeholder={isAr ? "حدثنا قليلاً عن خبرتك المهنية والتعليمية..." : "Tell us a bit about your professional and educational experience..."}
                      className={cn(
                        "w-full bg-secondary/50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary outline-none transition-all resize-none",
                        errors.experience && "ring-2 ring-red-500"
                      )}
                    ></textarea>
                    {errors.experience && (
                      <p className="text-red-500 text-xs mt-1">{errors.experience.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 rounded-2xl text-lg font-bold gap-2 shadow-lg shadow-primary/20"
                  >
                    <span>
                      {isSubmitting 
                        ? (isAr ? "جاري إرسال الطلب..." : "Sending Application...") 
                        : (isAr ? "إرسال طلب الانضمام" : "Submit Application")}
                    </span>
                    {!isSubmitting && <Send className={cn("w-5 h-5", isAr && "rotate-180")} />}
                  </Button>
                </form>
              </div>
            </Reveal>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Reveal>
              <div className="bg-primary/10 rounded-[2rem] p-12 border border-primary/20">
                <GraduationCap className="w-16 h-16 text-primary mx-auto mb-6" />
                <h2 className="text-3xl font-bold mb-6">{isAr ? "جاهز لمشاركة خبرتك؟" : "Ready to share your expertise?"}</h2>
                <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                  {isAr 
                    ? "انضم إلى مئات المعلمين الذين يحققون أهدافهم معنا كل يوم." 
                    : "Join hundreds of instructors who are achieving their goals with us every day."}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="rounded-full px-10 h-14 text-lg font-bold"
                    onClick={() => document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    {isAr ? "سجل الآن كمعلم" : "Register as Instructor"}
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-full px-10 h-14 text-lg font-bold">
                    {isAr ? "تواصل معنا" : "Contact Us"}
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default BecomeInstructor;
