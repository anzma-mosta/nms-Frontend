import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "../../../components/atoms/Button";
import { useTranslation } from "react-i18next";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import { cn } from "../../../utils/cn";
import { motion } from "framer-motion";
import { ROUTES } from "../../../constants/routes";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../../lib/firebase";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../../store/slices/authSlice";
import Swal from "sweetalert2";

const loginSchema = z.object({
  email: z.string().email("auth.errors.email_invalid"),
  password: z.string().min(6, "auth.errors.password_min"),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false,
    },
  });

  const handleUserRedirect = (role: string) => {
    if (role === "admin") {
      navigate(ROUTES.ADMIN_DASHBOARD);
    } else {
      navigate(ROUTES.DASHBOARD);
    }
  };

  const fetchUserDataAndLogin = async (uid: string, token: string) => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const user = {
          id: uid,
          email: userData.email,
          name: userData.name,
          role: userData.role || "student",
          avatar: userData.avatar,
        };
        
        dispatch(setCredentials({ user, token }));
        handleUserRedirect(user.role);
      } else {
        throw new Error(isAr ? "لم يتم العثور على بيانات المستخدم" : "User data not found");
      }
    } catch (error: any) {
      console.error("Firestore Error:", error);
      if (error.message.includes("offline")) {
        throw new Error(isAr 
          ? "تعذر الاتصال بقاعدة البيانات. تأكد من اتصالك بالإنترنت وحاول مرة أخرى." 
          : "Could not connect to database. Please check your internet connection and try again.");
      }
      throw error;
    }
  };

  const onSubmit = async (data: LoginFormValues) => {
    try {
      // Hardcoded Admin Bypass for testing
      if (data.email === "admin@wakp.com" && data.password === "admin123456") {
        const user = {
          id: "fixed-admin-id",
          email: "admin@wakp.com",
          name: "WAKP Admin",
          role: "admin",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
        };
        dispatch(setCredentials({ user: user as any, token: "fixed-admin-token" }));
        handleUserRedirect("admin");
        return;
      }

      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const token = await userCredential.user.getIdToken();
      await fetchUserDataAndLogin(userCredential.user.uid, token);
      
      Swal.fire({
        icon: 'success',
        title: isAr ? 'تم تسجيل الدخول بنجاح' : 'Login Successful',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: isAr ? 'خطأ في تسجيل الدخول' : 'Login Error',
        text: error.message,
      });
    }
  };

  const handleSocialLogin = async (providerName: 'google' | 'facebook') => {
    try {
      const provider = providerName === 'google' 
        ? new GoogleAuthProvider() 
        : new FacebookAuthProvider();
      
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      await fetchUserDataAndLogin(result.user.uid, token);
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: isAr ? 'خطأ في تسجيل الدخول' : 'Login Error',
        text: error.message,
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-8">
      {/* Social Login */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          type="button"
          variant="outline"
          className="h-14 rounded-2xl font-bold gap-3 border-2 hover:bg-secondary/50"
          onClick={() => handleSocialLogin("google")}
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
          <span className="text-sm">{t("auth.google_login")}</span>
        </Button>
        <Button
          type="button"
          variant="outline"
          className="h-14 rounded-2xl font-bold gap-3 border-2 hover:bg-secondary/50"
          onClick={() => handleSocialLogin("facebook")}
        >
          <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook" className="w-5 h-5" />
          <span className="text-sm">{t("auth.facebook_login")}</span>
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-muted"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-4 text-muted-foreground font-black tracking-widest">
            {t("auth.or_login_with")}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          {/* Email Field */}
          <div className="space-y-2">
            <label
              className={cn(
                "block text-sm font-black text-foreground/70 uppercase tracking-widest px-2",
                isAr ? "text-right" : "text-left"
              )}
            >
              {t("auth.email")}
            </label>
            <div className="relative group/input">
              <div
                className={cn(
                  "absolute top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within/input:text-primary transition-colors",
                  isAr ? "right-6" : "left-6"
                )}
              >
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
                className={cn(
                  "text-xs font-bold text-destructive px-2",
                  isAr ? "text-right" : "text-left"
                )}
              >
                {t(errors.email.message as string)}
              </motion.p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-2">
              <label
                className={cn(
                  "block text-sm font-black text-foreground/70 uppercase tracking-widest"
                )}
              >
                {t("auth.password")}
              </label>
              <button
                type="button"
                className="text-xs font-black text-primary hover:underline transition-all"
              >
                {t("auth.forgot_password")}
              </button>
            </div>
            <div className="relative group/input">
              <div
                className={cn(
                  "absolute top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within/input:text-primary transition-colors",
                  isAr ? "right-6" : "left-6"
                )}
              >
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
                className={cn(
                  "absolute top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors",
                  isAr ? "left-6" : "right-6"
                )}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={cn(
                  "text-xs font-bold text-destructive px-2",
                  isAr ? "text-right" : "text-left"
                )}
              >
                {t(errors.password.message as string)}
              </motion.p>
            )}
          </div>

          {/* Remember Me */}
          <div
            className={cn(
              "flex items-center gap-3 px-2",
              isAr ? "flex-row-reverse" : "flex-row"
            )}
          >
            <div className="relative flex items-center">
              <input
                type="checkbox"
                {...register("rememberMe")}
                id="rememberMe"
                className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-white/10 bg-secondary/50 transition-all checked:border-primary checked:bg-primary"
              />
              <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
            <label
              htmlFor="rememberMe"
              className="text-sm font-bold text-muted-foreground cursor-pointer select-none"
            >
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
                  {t("auth.login_title")}
                  <ArrowRight
                    className={cn(
                      "w-6 h-6 group-hover:translate-x-2 transition-transform",
                      isAr && "rotate-180 group-hover:-translate-x-2"
                    )}
                  />
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-blue-600 to-primary bg-[length:200%_100%] animate-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Button>
        </div>

        <div className="text-center pt-2">
          <p className="text-muted-foreground font-medium">
            {t("auth.dont_have_account")}{" "}
            <Link
              to={ROUTES.REGISTER}
              className="text-primary font-black hover:text-primary/80 transition-colors inline-flex items-center gap-1 group/link"
            >
              <span>{t("auth.register_now")}</span>
              <ArrowRight className={cn(
                "w-4 h-4 transition-transform group-hover/link:translate-x-1",
                isAr && "rotate-180 group-hover/link:-translate-x-1"
              )} />
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};
