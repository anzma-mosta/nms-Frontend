import { MainLayout } from "../../components/templates/MainLayout";
import { useTranslation } from "react-i18next";
import { SEO } from "../../components/atoms/SEO";
import { Button } from "../../components/atoms/Button";
import {
  GraduationCap,
  BookOpen,
  Users,
  Star,
  ArrowLeft,
  ArrowRight,
  Send,
  User,
  Mail,
  Briefcase,
  FileText,
  Sparkles,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Globe,
} from "lucide-react";
import { Reveal } from "../../components/atoms/Reveal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAlert } from "../../providers/AlertContext";
import { cn } from "../../utils/cn";
import { motion } from "framer-motion";

const BecomeInstructor = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const { showAlert } = useAlert();

  const instructorSchema = z.object({
    fullName: z
      .string()
      .min(3, { message: t("become_instructor.form.validation.name_min") }),
    email: z
      .string()
      .email({ message: t("become_instructor.form.validation.email_invalid") }),
    specialty: z.string().min(2, {
      message: t("become_instructor.form.validation.specialty_required"),
    }),
    experience: z.string().min(10, {
      message: t("become_instructor.form.validation.experience_min"),
    }),
  });

  type InstructorFormValues = z.infer<typeof instructorSchema>;

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
      title: t("become_instructor.form.success_title"),
      message: t("become_instructor.form.success_message"),
      type: "success",
    });

    reset();
  };

  const benefits = [
    {
      icon: <Users className="w-7 h-7" />,
      title: t("become_instructor.benefits.list.audience.title"),
      description: t("become_instructor.benefits.list.audience.desc"),
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      icon: <Star className="w-7 h-7" />,
      title: t("become_instructor.benefits.list.income.title"),
      description: t("become_instructor.benefits.list.income.desc"),
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
    },
    {
      icon: <BookOpen className="w-7 h-7" />,
      title: t("become_instructor.benefits.list.tools.title"),
      description: t("become_instructor.benefits.list.tools.desc"),
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    },
  ];

  return (
    <MainLayout>
      <SEO
        title={t("become_instructor.hero.title")}
        description={t("become_instructor.hero.subtitle")}
      />
      
      {/* Hero Section */}
      <section className="relative bg-[#0F172A] pt-32 pb-48 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(white,transparent)] opacity-10" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div className={cn("space-y-8", isAr ? "text-right" : "text-left")}>
                <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-black uppercase tracking-widest backdrop-blur-md mb-4">
                  <Sparkles className="w-4 h-4" />
                  {isAr ? "انضم إلى نخبة المدربين" : "Join Elite Instructors"}
                </div>
                <h1 className="text-5xl lg:text-7xl font-black text-white leading-[1.1]">
                  {t("become_instructor.hero.title")}{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400 block mt-2">
                    {t("become_instructor.hero.title_highlight")}
                  </span>
                </h1>
                <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-xl">
                  {t("become_instructor.hero.description")}
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Button
                    size="lg"
                    className="rounded-2xl px-10 h-16 text-lg font-black shadow-xl shadow-primary/20 group"
                    onClick={() =>
                      document
                        .getElementById("apply-form")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    {t("become_instructor.hero.cta")}
                    {isAr ? (
                      <ArrowLeft className="mr-3 w-6 h-6 group-hover:-translate-x-2 transition-transform" />
                    ) : (
                      <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    )}
                  </Button>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 to-blue-500/30 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
                <div className="relative rounded-[3rem] overflow-hidden border-2 border-white/10 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80"
                    alt="Instructor"
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className={cn("absolute bottom-8 left-8 right-8 p-6 glass rounded-2xl border border-white/10", isAr ? "text-right" : "text-left")}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-white font-black">{isAr ? "انضم لأكثر من 1000 مدرب" : "Join 1000+ Instructors"}</p>
                        <p className="text-white/70 text-sm font-medium">{isAr ? "في جميع أنحاء الوطن العربي" : "Across the Arab World"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-32 relative -mt-24 z-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <Reveal>
              <h2 className="text-4xl lg:text-5xl font-black mb-6">
                {t("become_instructor.benefits.title")}
              </h2>
              <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
                {t("become_instructor.benefits.description")}
              </p>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div className="p-10 rounded-[3rem] bg-card glass border-2 border-transparent hover:border-primary/20 transition-all duration-500 group shadow-xl">
                  <div className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg",
                    benefit.bg,
                    benefit.color
                  )}>
                    {benefit.icon}
                  </div>
                  <h3 className="text-2xl font-black mb-4">{benefit.title}</h3>
                  <p className="text-muted-foreground font-medium leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto d-flex   px-4 mb-32">
        <div className="relative py-20 rounded-[4rem] overflow-hidden">
          <div className="absolute inset-0 bg-secondary glass border-2 border-white/5 shadow-2xl"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -ml-48 -mb-48"></div>
          
          <div className="relative justify-content-center d-flex aline-items-center  z-10 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center" style={{ display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'}}>
            {[
              { label: t("become_instructor.stats.students"), value: "50K+", icon: Users },
              { label: t("become_instructor.stats.courses"), value: "1K+", icon: BookOpen },
              { label: t("become_instructor.stats.countries"), value: "25+", icon: Globe },
              { label: t("become_instructor.stats.rating"), value: "4.9/5", icon: Star },
            ].map((stat, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div className="space-y-4 group">
                  <div className="text-4xl lg:text-6xl font-black text-white mb-2 group-hover:scale-110 transition-transform duration-500">
                    {stat.value}
                  </div>
                  <div className="text-primary font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2">
                    <stat.icon className="w-4 h-4" />
                    {stat.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="apply-form" className="py-32 relative overflow-hidden bg-secondary/20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('/grid.svg')] bg-center opacity-5" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-20">
              <Reveal>
                <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-black uppercase tracking-widest backdrop-blur-md mb-6">
                  <FileText className="w-4 h-4" />
                  {isAr ? "نموذج التقديم" : "Application Form"}
                </div>
                <h2 className="text-4xl lg:text-6xl font-black mb-6">
                  {t("become_instructor.form.title")}
                </h2>
                <p className="text-xl text-muted-foreground font-medium">
                  {t("become_instructor.form.description")}
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.2}>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-[3rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative bg-card glass border-2 border-white/10 rounded-[3rem] p-10 lg:p-16 shadow-2xl overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -ml-32 -mb-32" />

                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-8 relative z-10"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Full Name */}
                      <div className="space-y-3">
                        <label className={cn("text-sm font-black text-foreground/70 uppercase tracking-widest px-2 block", isAr ? "text-right" : "text-left")}>
                          {t("become_instructor.form.full_name")}
                        </label>
                        <div className="relative group/input">
                          <div className={cn("absolute top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within/input:text-primary transition-colors", isAr ? "right-6" : "left-6")}>
                            <User className="w-5 h-5" />
                          </div>
                          <input
                            {...register("fullName")}
                            placeholder={t("become_instructor.form.full_name_placeholder")}
                            className={cn(
                              "w-full h-16 bg-secondary/50 border-2 border-transparent focus:border-primary/30 focus:bg-background rounded-2xl outline-none transition-all font-bold text-lg",
                              isAr ? "pr-14 pl-6 text-right" : "pl-14 pr-6 text-left",
                              errors.fullName && "border-destructive/50"
                            )}
                          />
                        </div>
                        {errors.fullName && (
                          <p className={cn("text-destructive text-xs font-bold px-2", isAr ? "text-right" : "text-left")}>
                            {errors.fullName.message}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div className="space-y-3">
                        <label className={cn("text-sm font-black text-foreground/70 uppercase tracking-widest px-2 block", isAr ? "text-right" : "text-left")}>
                          {t("become_instructor.form.email")}
                        </label>
                        <div className="relative group/input">
                          <div className={cn("absolute top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within/input:text-primary transition-colors", isAr ? "right-6" : "left-6")}>
                            <Mail className="w-5 h-5" />
                          </div>
                          <input
                            {...register("email")}
                            placeholder="example@mail.com"
                            className={cn(
                              "w-full h-16 bg-secondary/50 border-2 border-transparent focus:border-primary/30 focus:bg-background rounded-2xl outline-none transition-all font-bold text-lg",
                              isAr ? "pr-14 pl-6 text-right" : "pl-14 pr-6 text-left",
                              errors.email && "border-destructive/50"
                            )}
                          />
                        </div>
                        {errors.email && (
                          <p className={cn("text-destructive text-xs font-bold px-2", isAr ? "text-right" : "text-left")}>
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Specialty */}
                    <div className="space-y-3">
                      <label className={cn("text-sm font-black text-foreground/70 uppercase tracking-widest px-2 block", isAr ? "text-right" : "text-left")}>
                        {isAr ? "التخصص" : "Specialty"}
                      </label>
                      <div className="relative group/input">
                        <div className={cn("absolute top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within/input:text-primary transition-colors", isAr ? "right-6" : "left-6")}>
                          <Briefcase className="w-5 h-5" />
                        </div>
                        <input
                          {...register("specialty")}
                          placeholder={isAr ? "مثلاً: تصميم الواجهات، تطوير الويب" : "e.g. UI Design, Web Development"}
                          className={cn(
                            "w-full h-16 bg-secondary/50 border-2 border-transparent focus:border-primary/30 focus:bg-background rounded-2xl outline-none transition-all font-bold text-lg",
                            isAr ? "pr-14 pl-6 text-right" : "pl-14 pr-6 text-left",
                            errors.specialty && "border-destructive/50"
                          )}
                        />
                      </div>
                      {errors.specialty && (
                        <p className={cn("text-destructive text-xs font-bold px-2", isAr ? "text-right" : "text-left")}>
                          {errors.specialty.message}
                        </p>
                      )}
                    </div>

                    {/* Experience */}
                    <div className="space-y-3">
                      <label className={cn("text-sm font-black text-foreground/70 uppercase tracking-widest px-2 block", isAr ? "text-right" : "text-left")}>
                        {isAr ? "نبذة عن خبراتك" : "Experience Summary"}
                      </label>
                      <textarea
                        {...register("experience")}
                        rows={4}
                        placeholder={isAr ? "أخبرنا عن مسيرتك المهنية والتعليمية..." : "Tell us about your professional and educational journey..."}
                        className={cn(
                          "w-full bg-secondary/50 border-2 border-transparent focus:border-primary/30 focus:bg-background rounded-2xl p-6 outline-none transition-all font-bold text-lg resize-none",
                          isAr ? "text-right" : "text-left",
                          errors.experience && "border-destructive/50"
                        )}
                      />
                      {errors.experience && (
                        <p className={cn("text-destructive text-xs font-bold px-2", isAr ? "text-right" : "text-left")}>
                          {errors.experience.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-16 rounded-2xl text-xl font-black gap-3 shadow-xl shadow-primary/20 group relative overflow-hidden mt-4"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        {isSubmitting ? (
                          <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            {isAr ? "إرسال طلب الانضمام" : "Submit Application"}
                            <Send className={cn("w-6 h-6 group-hover:translate-y-[-4px] group-hover:translate-x-[4px] transition-transform", isAr && "rotate-180")} />
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-primary via-blue-600 to-primary bg-[length:200%_100%] animate-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </Button>
                  </form>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};



export default BecomeInstructor;

