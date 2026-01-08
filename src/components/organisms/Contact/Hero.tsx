import { Reveal } from "../../atoms/Reveal";
import { MessageSquare } from "lucide-react";

interface ContactHeroProps {
  isAr: boolean;
}

export const ContactHero = ({ isAr }: ContactHeroProps) => {
  return (
    <section className="relative bg-[#0F172A] pt-32 pb-48 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(white,transparent)] opacity-10" />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-black uppercase tracking-widest mb-8 backdrop-blur-md">
            <MessageSquare className="w-4 h-4" />
            {isAr ? "نحن هنا من أجلك" : "We are here for you"}
          </div>
          <h1 className="text-5xl lg:text-8xl font-black mb-8 text-white leading-[1.1] tracking-tight">
            {isAr ? "تواصل" : "Get in"}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
              {isAr ? "مع خبراء المنصة" : "Touch With Us"}
            </span>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-xl md:text-2xl text-slate-400 max-w-4xl mx-auto leading-relaxed mb-12 font-medium">
            {isAr
              ? "لديك استفسار أو تحتاج إلى مساعدة؟ فريق الدعم الفني والخبراء لدينا جاهزون للرد على جميع تساؤلاتكم على مدار الساعة."
              : "Have a question or need help? Our support team and experts are ready to answer all your questions around the clock."}
          </p>
        </Reveal>
      </div>
    </section>
  );
};
