import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "../../../components/atoms/Button";
import { useTranslation } from "react-i18next";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Chrome, Facebook } from "lucide-react";
import { useState } from "react";
import { cn } from "../../../utils/cn";
import { motion } from "framer-motion";

const loginSchema = z.object({
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false,
    }
  });

  const onSubmit = async (data: LoginFormValues) => {
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-8">
      {/* Social Login */}
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          className="flex items-center justify-center gap-3 h-14 rounded-2xl bg-secondary/50 glass border-2 border-transparent hover:border-primary/30 transition-all duration-500 font-bold group"
        >
          <Chrome className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
          <span className="text-sm">{isAr ? "جوجل" : "Google"}</span>
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-3 h-14 rounded-2xl bg-secondary/50 glass border-2 border-transparent hover:border-primary/30 transition-all duration-500 font-bold group"
        >
          <Facebook className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
          <span className="text-sm">{isAr ? "فيسبوك" : "Facebook"}</span>
        </button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-4 text-muted-foreground font-black tracking-widest">
            {isAr ? "أو المتابعة بـ" : "Or continue with"}
          </span>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div className="space-y-4">
          {/* Email Field */}
          <div className="space-y-2">
            <label className={cn("block text-sm font-black text-foreground/70 uppercase tracking-widest px-2", isAr ? "text-right" : "text-left")}>
              {isAr ? "البريد الإلكتروني" : "Email Address"}
            </label>
            <div className="relative group/input">
              <div className={cn("absolute top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within/input:text-primary transition-colors", isAr ? "right-6" : "left-6")}>
                <Mail className="w-5 h-5" />
              </div>
              <input
                {...register("email")}
                className={cn(
                  "w-full h-16 bg-secondary/50 border-2 border-transparent focus:border-primary/30 focus:bg-background rounded-2xl outline-none transition-all font-bold text-lg",
                  isAr ? "pr-14 pl-6 text-right" : "pl-14 pr-6 text-left",
                  errors.email && "border-destructive/50"
                )}
                placeholder="example@mail.com"
                type="email"
              />
            </div>
            {errors.email && (
              <motion.p 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={cn("text-xs font-bold text-destructive px-2", isAr ? "text-right" : "text-left")}
              >
                {errors.email.message}
              </motion.p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-2">
              <label className={cn("block text-sm font-black text-foreground/70 uppercase tracking-widest")}>
                {isAr ? "كلمة المرور" : "Password"}
              </label>
              <button type="button" className="text-xs font-black text-primary hover:underline transition-all">
                {isAr ? "نسيت كلمة المرور؟" : "Forgot Password?"}
              </button>
            </div>
            <div className="relative group/input">
              <div className={cn("absolute top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within/input:text-primary transition-colors", isAr ? "right-6" : "left-6")}>
                <Lock className="w-5 h-5" />
              </div>
              <input
                {...register("password")}
                className={cn(
                  "w-full h-16 bg-secondary/50 border-2 border-transparent focus:border-primary/30 focus:bg-background rounded-2xl outline-none transition-all font-bold text-lg",
                  isAr ? "pr-14 pl-14 text-right" : "pl-14 pr-14 text-left",
                  errors.password && "border-destructive/50"
                )}
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={cn("absolute top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors", isAr ? "left-6" : "right-6")}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <motion.p 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={cn("text-xs font-bold text-destructive px-2", isAr ? "text-right" : "text-left")}
              >
                {errors.password.message}
              </motion.p>
            )}
          </div>

          {/* Remember Me */}
          <div className={cn("flex items-center gap-3 px-2", isAr ? "flex-row-reverse" : "flex-row")}>
            <div className="relative flex items-center">
              <input
                type="checkbox"
                {...register("rememberMe")}
                id="rememberMe"
                className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-white/10 bg-secondary/50 transition-all checked:border-primary checked:bg-primary"
              />
              <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
              </div>
            </div>
            <label htmlFor="rememberMe" className="text-sm font-bold text-muted-foreground cursor-pointer select-none">
              {isAr ? "تذكرني على هذا الجهاز" : "Remember me on this device"}
            </label>
          </div>
        </div>

        <div className="pt-4">
          <Button 
            type="submit" 
            className="w-full h-16 rounded-2xl text-xl font-black gap-3 shadow-xl shadow-primary/20 group relative overflow-hidden" 
            disabled={isSubmitting}
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              {isSubmitting ? (
                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  {isAr ? "تسجيل الدخول" : "Sign In"}
                  <ArrowRight className={cn("w-6 h-6 group-hover:translate-x-2 transition-transform", isAr && "rotate-180 group-hover:-translate-x-2")} />
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-blue-600 to-primary bg-[length:200%_100%] animate-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Button>
        </div>

        <p className="text-center text-muted-foreground font-medium">
          {isAr ? "ليس لديك حساب؟" : "Don't have an account?"}{" "}
          <button type="button" className="text-primary font-black hover:underline transition-all">
            {isAr ? "أنشئ حساباً الآن" : "Create Account"}
          </button>
        </p>
      </form>
    </div>
  );
};
