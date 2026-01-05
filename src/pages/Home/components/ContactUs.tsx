import { useTranslation } from "react-i18next";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { cn } from "../../../utils/cn";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "الاسم يجب أن يكون حرفين على الأقل"),
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  subject: z.string().min(5, "الموضوع يجب أن يكون 5 أحرف على الأقل"),
  message: z.string().min(10, "الرسالة يجب أن تكون 10 أحرف على الأقل"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export const ContactUs = () => {
  const { t, i18n } = useTranslation();

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
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert(
      i18n.language === "ar"
        ? "تم إرسال رسالتك بنجاح!"
        : "Your message has been sent successfully!"
    );
    reset();
  };

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info Section */}
          <div
            className={cn(
              "space-y-8",
              i18n.language === "ar" ? "text-right" : "text-left"
            )}
          >
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">{t("home.contact.title")}</h2>
              <p className="text-muted-foreground text-lg max-w-md">
                {t("home.contact.description")}
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-muted-foreground">
                    {t("home.contact.email")}
                  </h4>
                  <p className="font-medium">support@nmsacademy.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-green-500/10 text-green-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-muted-foreground">
                    {t("home.contact.phone")}
                  </h4>
                  <p className="font-medium">+20 123 456 7890</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-muted-foreground">
                    {t("home.contact.location")}
                  </h4>
                  <p className="font-medium">
                    {t("home.contact.location_val")}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-8 space-y-4">
              <h4 className="font-bold">{t("home.contact.follow_us")}</h4>
              <div className="flex gap-4">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="bg-card border rounded-3xl p-8 shadow-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold">
                    {t("home.contact.form_name")}
                  </label>
                  <input
                    {...register("name")}
                    type="text"
                    placeholder={t("home.contact.form_name_placeholder")}
                    className={cn(
                      "w-full bg-secondary/50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all",
                      errors.name && "ring-2 ring-red-500"
                    )}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">
                    {t("home.contact.form_email")}
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="example@email.com"
                    className={cn(
                      "w-full bg-secondary/50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all",
                      errors.email && "ring-2 ring-red-500"
                    )}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">
                  {t("home.contact.form_subject")}
                </label>
                <input
                  {...register("subject")}
                  type="text"
                  placeholder={t("home.contact.form_subject_placeholder")}
                  className={cn(
                    "w-full bg-secondary/50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all",
                    errors.subject && "ring-2 ring-red-500"
                  )}
                />
                {errors.subject && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.subject.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">
                  {t("home.contact.form_message")}
                </label>
                <textarea
                  {...register("message")}
                  rows={4}
                  placeholder={t("home.contact.form_message_placeholder")}
                  className={cn(
                    "w-full bg-secondary/50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all resize-none",
                    errors.message && "ring-2 ring-red-500"
                  )}
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full h-12 rounded-xl font-bold gap-2"
                disabled={isSubmitting}
              >
                <span>
                  {isSubmitting
                    ? i18n.language === "ar"
                      ? "جاري الإرسال..."
                      : "Sending..."
                    : t("home.contact.form_send")}
                </span>
                <Send
                  className={cn(
                    "w-4 h-4",
                    i18n.language === "ar" && "rotate-180"
                  )}
                />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
