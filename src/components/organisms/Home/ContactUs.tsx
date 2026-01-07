import { useTranslation } from "react-i18next";
import {
  Mail,
  Phone,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MessageSquare,
  Sparkles,
  Headphones,
  User
} from "lucide-react";
import { Button } from "../../atoms/Button";
import { cn } from "../../../utils/cn";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";

const contactSchema = z.object({
  name: z.string().min(2, "الاسم يجب أن يكون حرفين على الأقل"),
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  subject: z.string().min(5, "الموضوع يجب أن يكون 5 أحرف على الأقل"),
  message: z.string().min(10, "الرسالة يجب أن تكون 10 أحرف على الأقل"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export const ContactUs = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    reset();
  };

  const contactInfo = [
    {
      icon: <Mail className="w-7 h-7" />,
      label: t("home.contact.email"),
      value: "support@nmsacademy.com",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      desc: isAr ? "تواصل معنا عبر البريد الإلكتروني" : "Contact us via email"
    },
    {
      icon: <Phone className="w-7 h-7" />,
      label: t("home.contact.phone"),
      value: "+20 123 456 7890",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      desc: isAr ? "متاحون للرد على استفساراتكم" : "Available for your inquiries"
    },
    {
      icon: <Headphones className="w-7 h-7" />,
      label: isAr ? "الدعم الفني" : "Technical Support",
      value: isAr ? "دعم مباشر 24/7" : "24/7 Live Support",
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      desc: isAr ? "نحن هنا لمساعدتك دائماً" : "We are here to help always"
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Info Section */}
          <div className="lg:col-span-5 space-y-12">
            <div className={cn("space-y-8", isAr ? "text-right" : "text-left")}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-black text-sm uppercase tracking-widest backdrop-blur-md"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isAr ? "تواصل معنا" : "Get in Touch"}</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl lg:text-6xl font-black leading-tight tracking-tight"
              >
                {isAr ? "نحن بانتظار" : "We are Waiting"}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500 block">
                  {isAr ? "سماع صوتك" : "to Hear From You"}
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-xl text-muted-foreground font-medium leading-relaxed max-w-xl"
              >
                {isAr 
                  ? "سواء كان لديك سؤال أو اقتراح، فريقنا جاهز للرد عليك في أسرع وقت ممكن. رضاكم هو غايتنا." 
                  : "Whether you have a question or a suggestion, our team is ready to respond as soon as possible. Your satisfaction is our goal."}
              </motion.p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isAr ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="group flex items-center gap-6 p-8 rounded-[2.5rem] bg-card glass border-2 border-transparent hover:border-primary/20 transition-all duration-500 shadow-xl hover:shadow-2xl"
                >
                  <div className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg shadow-black/5",
                    info.bg,
                    info.color
                  )}>
                    {info.icon}
                  </div>
                  <div className={cn("flex-1", isAr ? "text-right" : "text-left")}>
                    <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-1">
                      {info.label}
                    </h4>
                    <p className="text-xl font-black text-foreground mb-1">{info.value}</p>
                    <p className="text-sm text-muted-foreground font-medium">{info.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className={cn("flex items-center gap-4 pt-6", isAr ? "justify-start" : "justify-start")}
            >
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <motion.a
                  key={i}
                  whileHover={{ y: -8, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href="#"
                  className="w-14 h-14 rounded-2xl bg-secondary/50 glass border-2 border-transparent hover:border-primary/30 flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-500 shadow-lg"
                >
                  <Icon className="w-6 h-6" />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Form Section */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-[4rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative bg-card glass border-2 border-primary/10 rounded-[4rem] p-10 lg:p-16 shadow-2xl shadow-black/5 overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -ml-32 -mb-32" />

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className={cn("block text-sm font-black text-foreground/70 tracking-widest uppercase px-2", isAr ? "text-right" : "text-left")}>
                        {isAr ? "الاسم بالكامل" : "Full Name"}
                      </label>
                      <div className="relative group/input">
                        <div className={cn("absolute top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within/input:text-primary transition-colors", isAr ? "right-6" : "left-6")}>
                          <User className="w-5 h-5" />
                        </div>
                        <input
                          {...register("name")}
                          className={cn(
                            "w-full h-16  bg-secondary/50 border-2 border- border-r-5 focus:border-primary/30 focus:bg-background transition-all outline-none font-bold text-lg",
                            isAr ? "pr-14 pl-6 text-right" : "pl-14 pr-6 text-left",
                            errors.name && "border-destructive/50"
                          )}
                          placeholder={isAr ? "أدخل اسمك" : "Your Name"}
                        />
                      </div>
                      {errors.name && (
                        <p className={cn("text-xs font-bold text-destructive px-2", isAr ? "text-right" : "text-left")}>
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-3">
                      <label className={cn("block text-sm font-black text-foreground/70 tracking-widest uppercase px-2", isAr ? "text-right" : "text-left")}>
                        {isAr ? "البريد الإلكتروني" : "Email Address"}
                      </label>
                      <div className="relative group/input">
                        <div className={cn("absolute top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within/input:text-primary transition-colors", isAr ? "right-6" : "left-6")}>
                          <Mail className="w-5 h-5" />
                        </div>
                        <input
                          {...register("email")}
                          className={cn(
                            "w-full h-16 bg-secondary/50 border-2 border-transparent focus:border-primary/30 focus:bg-background transition-all outline-none font-bold text-lg",
                            isAr ? "pr-14 pl-6 text-right" : "pl-14 pr-6 text-left",
                            errors.email && "border-destructive/50"
                          )}
                          placeholder="example@mail.com"
                        />
                      </div>
                      {errors.email && (
                        <p className={cn("text-xs font-bold text-destructive px-2", isAr ? "text-right" : "text-left")}>
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className={cn("block text-sm font-black text-foreground/70 tracking-widest uppercase px-2", isAr ? "text-right" : "text-left")}>
                      {isAr ? "الموضوع" : "Subject"}
                    </label>
                    <div className="relative group/input">
                      <div className={cn("absolute top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within/input:text-primary transition-colors", isAr ? "right-6" : "left-6")}>
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <input
                        {...register("subject")}
                        className={cn(
                          "w-full h-16 bg-secondary/50 border-2 border-transparent focus:border-primary/30 focus:bg-background transition-all outline-none font-bold text-lg",
                          isAr ? "pr-14 pl-6 text-right" : "pl-14 pr-6 text-left",
                          errors.subject && "border-destructive/50"
                        )}
                        placeholder={isAr ? "كيف يمكننا مساعدتك؟" : "How can we help?"}
                      />
                    </div>
                    {errors.subject && (
                      <p className={cn("text-xs font-bold text-destructive px-2", isAr ? "text-right" : "text-left")}>
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <label className={cn("block text-sm font-black text-foreground/70 tracking-widest uppercase px-2", isAr ? "text-right" : "text-left")}>
                      {isAr ? "الرسالة" : "Message"}
                    </label>
                    <textarea
                      {...register("message")}
                      rows={6}
                      className={cn(
                        "w-full bg-secondary/50 border-2 border-transparent focus:border-primary/30 focus:bg-background transition-all outline-none font-bold text-lg p-6 rounded-2xl resize-none",
                        isAr ? "text-right" : "text-left",
                        errors.message && "border-destructive/50"
                      )}
                      placeholder={isAr ? "اكتب رسالتك هنا..." : "Write your message here..."}
                    />
                    {errors.message && (
                      <p className={cn("text-xs font-bold text-destructive px-2", isAr ? "text-right" : "text-left")}>
                        {errors.message.message}
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
                          {isAr ? "إرسال الرسالة" : "Send Message"}
                          <Send className={cn("w-6 h-6 group-hover:translate-y-[-4px] group-hover:translate-x-[4px] transition-transform", isAr && "rotate-180")} />
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-blue-600 to-primary bg-[length:200%_100%] animate-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
