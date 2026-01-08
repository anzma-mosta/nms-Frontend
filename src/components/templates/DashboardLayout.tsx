import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import { logout } from "../../store/slices/authSlice";
import { auth } from "../../lib/firebase";
import { signOut } from "firebase/auth";
import { ROUTES } from "../../constants/routes";
import Swal from "sweetalert2";
import { cn } from "../../utils/cn";
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  GraduationCap,
  BarChart3,
  MessageSquare,
  Settings,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Globe,
  Menu,
  X,
  Users as UsersIcon,
  DollarSign,
  PlusCircle,
  Layout as LayoutIcon,
  CreditCard,
  Home,
} from "lucide-react";
import { Button } from "../atoms/Button";
import { ThemeToggle } from "../atoms/ThemeToggle";
import { LanguageToggle } from "../atoms/LanguageToggle";
import { motion } from "framer-motion";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAdminPath = location.pathname.startsWith("/admin");
  const { user } = useSelector((state: RootState) => state.auth);

  const dashNavItems = [
    { 
      name: t("nav.dashboard"), 
      href: isAdminPath ? "/admin" : ROUTES.DASHBOARD, 
      icon: LayoutIcon 
    },
    { 
      name: isAdminPath ? t("admin.payments") : t("nav.courses"), 
      href: isAdminPath ? "/admin/payments" : ROUTES.COURSES, 
      icon: isAdminPath ? CreditCard : BookOpen 
    },
    { 
      name: t("nav.home"), 
      href: ROUTES.HOME, 
      icon: Home 
    },
    { 
      name: t("auth.profile"), 
      href: "/profile", 
      icon: User 
    },
  ];
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: isAr ? "هل أنت متأكد؟" : "Are you sure?",
      text: isAr ? "سوف يتم تسجيل خروجك من النظام" : "You will be logged out of the system",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: isAr ? "نعم، اخرج" : "Yes, logout",
      cancelButtonText: isAr ? "إلغاء" : "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await signOut(auth);
        dispatch(logout());
        navigate(ROUTES.HOME);
      } catch (error) {
        console.error("Logout Error:", error);
      }
    }
  };

  const studentMenuItems = [
    {
      title: t("dashboard.sidebar.dashboard"),
      icon: LayoutDashboard,
      path: ROUTES.DASHBOARD,
    },
    {
      title: t("dashboard.sidebar.courses"),
      icon: BookOpen,
      path: ROUTES.DASHBOARD_COURSES,
    },
    {
      title: t("dashboard.sidebar.assignments"),
      icon: FileText,
      path: ROUTES.DASHBOARD_ASSIGNMENTS,
    },
    {
      title: t("dashboard.sidebar.exams"),
      icon: GraduationCap,
      path: ROUTES.DASHBOARD_EXAMS,
    },
    {
      title: t("dashboard.sidebar.reports"),
      icon: BarChart3,
      path: ROUTES.DASHBOARD_REPORTS,
    },
    {
      title: t("dashboard.sidebar.messages"),
      icon: MessageSquare,
      path: ROUTES.DASHBOARD_MESSAGES,
    },
  ];

  const adminMenuItems = [
    {
      title: t("dashboard.sidebar.dashboard"),
      icon: LayoutDashboard,
      path: ROUTES.ADMIN_DASHBOARD,
    },
    {
      title: t("dashboard.admin.users.title"),
      icon: UsersIcon,
      path: ROUTES.ADMIN_USERS,
    },
    {
      title: t("dashboard.admin.courses.title"),
      icon: BookOpen,
      path: ROUTES.ADMIN_COURSES,
    },
    {
      title: t("dashboard.admin.payments.title"),
      icon: DollarSign,
      path: ROUTES.ADMIN_PAYMENTS,
    },
    {
      title: t("dashboard.sidebar.messages"),
      icon: MessageSquare,
      path: ROUTES.DASHBOARD_MESSAGES,
    },
  ];

  const parentMenuItems = [
    {
      title: t("dashboard.sidebar.dashboard"),
      icon: LayoutDashboard,
      path: ROUTES.DASHBOARD,
    },
    {
      title: t("dashboard.children_progress"),
      icon: UsersIcon,
      path: ROUTES.DASHBOARD, // Or a dedicated children page
    },
    {
      title: t("dashboard.sidebar.reports"),
      icon: BarChart3,
      path: ROUTES.DASHBOARD_REPORTS,
    },
    {
      title: isAr ? "الاشتراكات والمدفوعات" : "Payments",
      icon: DollarSign,
      path: ROUTES.PAYMENT_STATUS,
    },
    {
      title: t("dashboard.sidebar.messages"),
      icon: MessageSquare,
      path: ROUTES.DASHBOARD_MESSAGES,
    },
  ];

  const menuItems = 
    user?.role === "admin" 
      ? adminMenuItems 
      : user?.role === "parent" 
        ? parentMenuItems 
        : studentMenuItems;

  const bottomMenuItems = [
    {
      title: t("dashboard.sidebar.profile"),
      icon: User,
      path: ROUTES.DASHBOARD_PROFILE,
    },
    {
      title: t("dashboard.sidebar.settings"),
      icon: Settings,
      path: ROUTES.DASHBOARD_SETTINGS,
    },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full py-6">
      {/* Logo & Collapse Toggle */}
      <div className="px-6 mb-10 flex items-center justify-between">
        <div className={cn("flex items-center gap-3 transition-all duration-300", !isSidebarOpen && "scale-0 w-0 overflow-hidden")}>
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-black text-xl">
            W
          </div>
          <span className="text-xl font-black tracking-tighter">WAKP</span>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="hidden lg:flex p-2 rounded-xl hover:bg-secondary/80 text-muted-foreground transition-colors"
        >
          {isSidebarOpen ? (
            isAr ? <ChevronRight size={20} /> : <ChevronLeft size={20} />
          ) : (
            isAr ? <ChevronLeft size={20} /> : <ChevronRight size={20} />
          )}
        </button>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all duration-200 group relative",
              location.pathname === item.path || (item.path !== ROUTES.DASHBOARD && location.pathname.startsWith(item.path))
                ? "bg-primary text-white shadow-lg shadow-primary/20"
                : "text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
            )}
          >
            <item.icon size={22} className={cn("shrink-0 transition-transform duration-300", location.pathname !== item.path && "group-hover:scale-110")} />
            <span className={cn("transition-all duration-300 whitespace-nowrap overflow-hidden", !isSidebarOpen && "w-0 opacity-0")}>
              {item.title}
            </span>
            {!isSidebarOpen && (
              <div className={cn(
                "absolute invisible group-hover:visible bg-foreground text-background px-3 py-1.5 rounded-lg text-sm font-bold z-50 whitespace-nowrap shadow-xl",
                isAr ? "right-full mr-4" : "left-full ml-4"
              )}>
                {item.title}
              </div>
            )}
          </Link>
        ))}
      </nav>

      {/* Bottom Nav */}
      <div className="px-4 mt-auto pt-6 border-t border-secondary space-y-2">
        {bottomMenuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all duration-200 group relative",
              location.pathname === item.path
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
            )}
          >
            <item.icon size={22} className="shrink-0" />
            <span className={cn("transition-all duration-300 whitespace-nowrap overflow-hidden", !isSidebarOpen && "w-0 opacity-0")}>
              {item.title}
            </span>
          </Link>
        ))}
        
        {/* Back to Website */}
        <Link
          to={ROUTES.HOME}
          className="flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-muted-foreground hover:bg-secondary/80 hover:text-foreground transition-all duration-200 group relative"
        >
          <Globe size={22} className="shrink-0" />
          <span className={cn("transition-all duration-300 whitespace-nowrap overflow-hidden", !isSidebarOpen && "w-0 opacity-0")}>
            {t("dashboard.back_to_website")}
          </span>
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-destructive hover:bg-destructive/10 hover:cursor-pointer transition-all duration-200 group relative"
        >
          <LogOut size={22} className="shrink-0" />
          <span className={cn("transition-all duration-300 whitespace-nowrap overflow-hidden", !isSidebarOpen && "w-0 opacity-0")}>
            {t("dashboard.sidebar.logout")}
          </span>
        </button>
      </div>
    </div>
  );

  return (
    <div className={cn("min-h-screen bg-background flex", isAr ? "font-vazir" : "font-sans")} dir={isAr ? "rtl" : "ltr"}>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:block fixed inset-y-0 z-50 bg-card border-x border-secondary transition-all duration-300 ease-in-out shadow-sm",
          isSidebarOpen ? "w-72" : "w-24",
          isAr ? "right-0" : "left-0"
        )}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 z-[70] w-72 bg-card border-x border-secondary transition-transform duration-300 ease-in-out lg:hidden",
          isMobileMenuOpen ? "translate-x-0" : isAr ? "translate-x-full" : "-translate-x-full",
          isAr ? "right-0" : "left-0"
        )}
      >
        <div className="absolute top-4 right-4 lg:hidden">
          <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={24} />
          </Button>
        </div>
        <SidebarContent />
      </aside>

      {/* Main Content Area */}
      <main className={cn(
        "flex-1 flex flex-col transition-all duration-300",
        isAr 
          ? (isSidebarOpen ? "lg:mr-72" : "lg:mr-24") 
          : (isSidebarOpen ? "lg:ml-72" : "lg:ml-24")
      )}>
        {/* Top Header */}
        <header className="sticky top-0 z-40 h-16 lg:h-20 bg-background/80 backdrop-blur-xl border-b border-secondary flex items-center justify-between px-4 lg:px-10">
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl hover:bg-secondary/80 text-muted-foreground"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary lg:hidden" />
              <h1 className="text-base lg:text-xl font-black truncate max-w-[150px] sm:max-w-none">
                {t("nav.dashboard")}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 lg:gap-6">
            <div className="flex items-center gap-1 sm:gap-2">
              <LanguageToggle />
              <ThemeToggle />
            </div>
            <div className="h-6 w-px bg-secondary mx-1 sm:mx-2 hidden xs:block" />
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="text-right hidden md:block">
                <p className="text-sm font-black leading-none">{user?.name || "User"}</p>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">
                  {(user?.role === "admin" || isAdminPath)
                    ? t("auth.admin") 
                    : user?.role === "parent" 
                      ? t("auth.parent") 
                      : t("auth.student")}
                </p>
              </div>
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg lg:rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black border border-primary/20 shrink-0 text-sm lg:text-base">
                {user?.name?.[0] || "U"}
              </div>
            </div>
          </div>
        </header>

        {/* Content Container */}
        <div className="p-4 lg:p-10 max-w-[1600px] mx-auto w-full pb-24 lg:pb-10">
          {children}
        </div>

        {/* Bottom Mobile Navigation for Dashboard */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-t border-border/40 px-4 py-2 pb-safe-area-inset-bottom shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-around">
            {dashNavItems.map((item) => {
              const isActive = location.pathname === item.href || (item.href === "/admin" && location.pathname === "/admin");
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex flex-col items-center gap-1 group relative py-1 px-3 rounded-xl transition-all duration-300",
                    isActive ? "text-primary bg-primary/5" : "text-muted-foreground"
                  )}
                >
                  <item.icon className={cn("w-5 h-5 transition-transform duration-300", isActive && "scale-110")} />
                  <span className="text-[10px] font-bold tracking-tight">
                    {item.name}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -top-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};
