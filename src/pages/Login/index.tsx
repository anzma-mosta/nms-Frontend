import { LoginForm } from "../../features/auth/components/LoginForm";
import { MainLayout } from "../../components/templates/MainLayout";
import { Reveal } from "../../components/atoms/Reveal";
import { useTranslation } from "react-i18next";
import { Sparkles, ShieldCheck } from "lucide-react";
import { cn } from "../../utils/cn";

const LoginPage = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  return (
    <MainLayout>
      <div className="min-h-screen relative flex items-center justify-center py-20 overflow-hidden bg-[#0F172A]">
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(white,transparent)] opacity-10" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side: Content */}
            <div className={cn("hidden lg:block space-y-10", isAr ? "text-right" : "text-left")}>
              <Reveal>
                <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-black uppercase tracking-widest backdrop-blur-md mb-6">
                  <Sparkles className="w-4 h-4" />
                  {isAr ? "مرحباً بك مجدداً" : "Welcome Back"}
                </div>
                <h1 className="text-6xl font-black text-white leading-tight">
                  {isAr ? "سجل دخولك إلى" : "Login to Your"}<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                    NMS Academy
                  </span>
                </h1>
                <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-lg mt-8">
                  {isAr 
                    ? "تابع رحلتك التعليمية واستكمل مهاراتك مع أفضل الخبراء والمدربين في الوطن العربي." 
                    : "Continue your learning journey and complete your skills with the best experts and instructors in the Arab world."}
                </p>
              </Reveal>

              <div className="space-y-6 pt-10">
                {[
                  {
                    icon: ShieldCheck,
                    title: isAr ? "بياناتك في أمان" : "Your Data is Secure",
                    desc: isAr ? "نستخدم أحدث تقنيات التشفير لحماية خصوصيتك" : "We use the latest encryption technologies to protect your privacy"
                  },
                  {
                    icon: Sparkles,
                    title: isAr ? "تجربة مخصصة" : "Personalized Experience",
                    desc: isAr ? "احصل على اقتراحات تعليمية تناسب اهتماماتك" : "Get educational suggestions that fit your interests"
                  }
                ].map((item, idx) => (
                  <Reveal key={idx} delay={0.2 + idx * 0.1}>
                    <div className="flex items-start gap-6 group">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-white group-hover:scale-110">
                        <item.icon className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-white mb-1">{item.title}</h3>
                        <p className="text-slate-500 font-medium">{item.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Right Side: Login Form */}
            <Reveal delay={0.3}>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-[3rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative bg-card glass border-2 border-white/10 rounded-[3rem] p-10 md:p-16 shadow-2xl">
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-black mb-4">
                      {isAr ? "تسجيل الدخول" : "Sign In"}
                    </h2>
                    <p className="text-muted-foreground font-medium">
                      {isAr ? "أدخل بياناتك للوصول إلى حسابك" : "Enter your details to access your account"}
                    </p>
                  </div>
                  <LoginForm />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default LoginPage;
