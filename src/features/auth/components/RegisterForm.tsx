import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "../../../components/atoms/Button";
import { useTranslation } from "react-i18next";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, GraduationCap, Users } from "lucide-react";
import { useState } from "react";
import { cn } from "../../../utils/cn";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import { auth, db } from "../../../lib/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../../store/slices/authSlice";
import Swal from "sweetalert2";

const registerSchema = z
  .object({
    fullName: z.string().min(3, "auth.errors.name_required"),
    email: z.string().email("auth.errors.email_invalid"),
    password: z.string().min(6, "auth.errors.password_min"),
    confirmPassword: z.string().min(6, "auth.errors.password_min"),
    role: z.enum(["student", "parent"], {
      message: "auth.errors.role_required",
    }),
    acceptTerms: z.boolean().refine((v) => v, "auth.errors.terms_required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "auth.errors.password_mismatch",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      acceptTerms: false,
      role: "student",
    },
  });

  const selectedRole = watch("role");

  const handleUserRedirect = (role: string) => {
    if (role === "admin") {
      navigate(ROUTES.ADMIN_DASHBOARD);
    } else {
      navigate(ROUTES.DASHBOARD);
    }
  };

  const saveUserToFirestore = async (uid: string, data: { email: string, name: string, role: string }) => {
    try {
      await setDoc(doc(db, "users", uid), {
        ...data,
        createdAt: new Date().toISOString(),
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.name}`,
      });
    } catch (error) {
      console.error("Error saving user to Firestore:", error);
      throw error;
    }
  };

  const onSubmit = async (data: RegisterFormValues) => {
    console.log("Starting registration for:", data.email);
    try {
      // 1. Create User in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      console.log("User created in Auth:", userCredential.user.uid);
      
      const token = await userCredential.user.getIdToken();
      
      // 2. Prepare User Data
      const userData = {
        email: data.email,
        name: data.fullName,
        role: data.role,
      };

      // 3. Save to Firestore
      console.log("Saving user to Firestore...");
      await saveUserToFirestore(userCredential.user.uid, userData);
      console.log("User saved to Firestore successfully");
      
      const user = {
        id: userCredential.user.uid,
        ...userData,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.fullName}`,
      };

      // 4. Update Redux State
      dispatch(setCredentials({ user, token }));
      
      Swal.fire({
        icon: 'success',
        title: isAr ? 'تم إنشاء الحساب بنجاح' : 'Account Created Successfully',
        text: isAr ? 'جاري توجيهك إلى لوحة التحكم...' : 'Redirecting to dashboard...',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });

      // 5. Redirect
      console.log("Redirecting user to role-specific dashboard:", user.role);
      handleUserRedirect(user.role);
    } catch (error: any) {
      console.error("Detailed Registration Error:", error);
      let errorMessage = error.message;
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = isAr ? 'البريد الإلكتروني مستخدم بالفعل' : 'Email already in use';
      } else if (error.code === 'permission-denied') {
        errorMessage = isAr ? 'فشل الوصول لقاعدة البيانات. تأكد من إعدادات Firestore' : 'Database access denied. Check Firestore rules.';
      }

      Swal.fire({
        icon: 'error',
        title: isAr ? 'خطأ في إنشاء الحساب' : 'Registration Error',
        text: errorMessage,
      });
    }
  };

  const handleSocialSignup = async (providerName: 'google' | 'facebook') => {
    try {
      const provider = providerName === 'google' 
        ? new GoogleAuthProvider() 
        : new FacebookAuthProvider();
      
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      
      // Check if user already exists to avoid overwriting their role
      const userDoc = await getDoc(doc(db, "users", result.user.uid));
      let user;

      if (!userDoc.exists()) {
        const userData = {
          email: result.user.email!,
          name: result.user.displayName || "User",
          role: "student",
        };
        await saveUserToFirestore(result.user.uid, userData);
        user = {
          id: result.user.uid,
          ...userData,
          avatar: result.user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.name}`,
        };
      } else {
        const existingData = userDoc.data();
        user = {
          id: result.user.uid,
          email: existingData.email,
          name: existingData.name,
          role: existingData.role,
          avatar: existingData.avatar,
        };
      }

      dispatch(setCredentials({ user, token }));
      handleUserRedirect(user.role);
    } catch (error: any) {
      console.error("Social Auth Error:", error);
      Swal.fire({
        icon: 'error',
        title: isAr ? 'خطأ في التسجيل' : 'Registration Error',
        text: error.message,
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-8">
      {/* Social Login Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          type="button"
          variant="outline"
          className="h-14 rounded-2xl font-bold gap-3 border-2 hover:bg-secondary/50"
          onClick={() => handleSocialSignup("google")}
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
          <span className="text-sm">{t("auth.google_login")}</span>
        </Button>
        <Button
          type="button"
          variant="outline"
          className="h-14 rounded-2xl font-bold gap-3 border-2 hover:bg-secondary/50"
          onClick={() => handleSocialSignup("facebook")}
        >
          <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook" className="w-5 h-5" />
          <span className="text-sm">{t("auth.facebook_login")}</span>
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-muted" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground font-bold">
            {t("auth.or_register_with")}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          {/* Role Selection */}
          <div className="space-y-2">
            <label
              className={cn(
                "block text-sm font-black text-foreground/70 uppercase tracking-widest px-2",
                isAr ? "text-right" : "text-left"
              )}
            >
              {t("auth.role")}
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setValue("role", "student")}
                className={cn(
                  "flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all gap-2",
                  selectedRole === "student"
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-secondary bg-secondary/20 text-muted-foreground hover:border-primary/30"
                )}
              >
                <GraduationCap className="w-8 h-8" />
                <span className="font-bold">{t("auth.student")}</span>
              </button>
              <button
                type="button"
                onClick={() => setValue("role", "parent")}
                className={cn(
                  "flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all gap-2",
                  selectedRole === "parent"
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-secondary bg-secondary/20 text-muted-foreground hover:border-primary/30"
                )}
              >
                <Users className="w-8 h-8" />
                <span className="font-bold">{t("auth.parent")}</span>
              </button>
            </div>
            {errors.role && (
              <p className={cn("text-xs font-bold text-destructive px-2", isAr ? "text-right" : "text-left")}>
                {t(errors.role.message as string)}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              className={cn(
                "block text-sm font-black text-foreground/70 uppercase tracking-widest px-2",
                isAr ? "text-right" : "text-left"
              )}
            >
              {t("auth.full_name")}
            </label>
            <div className="relative group/input">
              <div
                className={cn(
                  "absolute top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within/input:text-primary transition-colors",
                  isAr ? "right-6" : "left-6"
                )}
              >
                <User className="w-5 h-5" />
              </div>
              <input
                {...register("fullName")}
                className={cn(
                  "w-full h-16 bg-secondary/50 border-2 border-transparent focus:border-primary/30 focus:bg-background rounded-2xl outline-none transition-all font-bold text-lg",
                  isAr ? "pr-14 pl-6 text-right" : "pl-14 pr-6 text-left",
                  errors.fullName && "border-destructive/50"
                )}
                placeholder={t("auth.enter_name")}
              />
            </div>
            {errors.fullName && (
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={cn(
                  "text-xs font-bold text-destructive px-2",
                  isAr ? "text-right" : "text-left"
                )}
              >
                {t(errors.fullName.message as string)}
              </motion.p>
            )}
          </div>

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

          <div className="space-y-2">
            <label
              className={cn(
                "block text-sm font-black text-foreground/70 uppercase tracking-widest px-2",
                isAr ? "text-right" : "text-left"
              )}
            >
              {t("auth.password")}
            </label>
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

          <div className="space-y-2">
            <label
              className={cn(
                "block text-sm font-black text-foreground/70 uppercase tracking-widest px-2",
                isAr ? "text-right" : "text-left"
              )}
            >
              {t("auth.confirm_password")}
            </label>
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
                {...register("confirmPassword")}
                className={cn(
                  "w-full h-16 bg-secondary/50 border-2 border-transparent focus:border-primary/30 focus:bg-background rounded-2xl outline-none transition-all font-bold text-lg",
                  isAr ? "pr-14 pl-14 text-right" : "pl-14 pr-14 text-left",
                  errors.confirmPassword && "border-destructive/50"
                )}
                placeholder="••••••••"
                type={showConfirm ? "text" : "password"}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className={cn(
                  "absolute top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors",
                  isAr ? "left-6" : "right-6"
                )}
              >
                {showConfirm ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={cn(
                  "text-xs font-bold text-destructive px-2",
                  isAr ? "text-right" : "text-left"
                )}
              >
                {t(errors.confirmPassword.message as string)}
              </motion.p>
            )}
          </div>

          <div
            className={cn(
              "flex items-center gap-3 px-2",
              isAr ? "flex-row-reverse" : "flex-row"
            )}
          >
            <div className="relative flex items-center">
              <input
                type="checkbox"
                {...register("acceptTerms")}
                id="acceptTerms"
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
              htmlFor="acceptTerms"
              className="text-sm font-bold text-muted-foreground cursor-pointer select-none"
            >
              {t("auth.accept_terms")}
            </label>
          </div>
          {errors.acceptTerms && (
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={cn(
                "text-xs font-bold text-destructive px-2",
                isAr ? "text-right" : "text-left"
              )}
            >
              {t(errors.acceptTerms.message as string)}
            </motion.p>
          )}
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
                  {t("auth.register_title")}
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

        <p className="text-center text-muted-foreground font-medium">
          {t("auth.already_have_account")}{" "}
          <Link
            to={ROUTES.LOGIN}
            className="text-primary font-black hover:underline transition-all"
          >
            {t("auth.login_now")}
          </Link>
        </p>
      </form>
    </div>
  );
};
