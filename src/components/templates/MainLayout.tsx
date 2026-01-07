import { type ReactNode, useState } from "react";
import { ThemeToggle } from "../atoms/ThemeToggle";
import { LanguageToggle } from "../atoms/LanguageToggle";
import { Footer } from "../organisms/Footer";
import { useTranslation } from "react-i18next";
import {
  BookOpen,
  Search,
  Menu,
  X,
  User,
  GraduationCap,
  Layout as LayoutIcon,
  Users,
  Info,
  Phone,
  ShoppingBag,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ROUTES } from "../../constants/routes";
import { cn } from "../../utils/cn";
import { Button } from "../atoms/Button";
import { useAppSelector } from "../../store";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const { t, i18n } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { items } = useAppSelector((state) => state.cart);

  const navigation = [
    { name: t("nav.home"), href: ROUTES.HOME, icon: LayoutIcon },
    { name: t("nav.courses"), href: ROUTES.COURSES, icon: BookOpen },
    { name: t("nav.instructors"), href: ROUTES.INSTRUCTORS, icon: Users },
    { name: t("nav.about"), href: ROUTES.ABOUT, icon: Info },
    { name: t("nav.contact"), href: ROUTES.CONTACT, icon: Phone },
  ];

  return (
    <div
      className={cn(
        "min-h-screen bg-background transition-colors duration-300 flex flex-col font-sans",
        i18n.language === "ar" ? "font-vazirmatn" : "font-sans"
      )}
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 w-full glass border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo & Desktop Nav */}
            <div className="flex items-center gap-12">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="bg-primary p-2 rounded-2xl text-primary-foreground shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <span className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-l from-primary to-blue-600">
                  NMS Academy
                </span>
              </Link>

              <div className="hidden lg:flex items-center gap-2">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={cn(
                        "px-5 py-2.5 text-sm font-bold rounded-full transition-all relative group",
                        isActive
                          ? "text-primary bg-primary/5"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                      )}
                    >
                      {item.name}
                      {isActive && (
                        <motion.div
                          layoutId="nav-active"
                          className="absolute inset-0 bg-primary/5 rounded-full -z-10"
                        />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Search & Actions */}
            <div className="hidden md:flex flex-1 max-w-sm mx-8">
              <div className="relative w-full group">
                <Search
                  className={cn(
                    "absolute top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors",
                    i18n.language === "ar" ? "right-4" : "left-4"
                  )}
                />
                <input
                  type="text"
                  placeholder={t("common.search")}
                  className={cn(
                    "w-full bg-secondary/50 border-2 border-transparent rounded-2xl py-2.5 text-sm outline-none transition-all focus:bg-background focus:border-primary focus:shadow-lg focus:shadow-primary/5",
                    i18n.language === "ar" ? "pr-11 pl-4" : "pl-11 pr-4"
                  )}
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 border-r pr-3 dark:border-gray-800">
                <LanguageToggle />
                <ThemeToggle />
              </div>

              <Link to={ROUTES.CART} className="relative group">
                <Button variant="ghost" size="icon" className="rounded-2xl">
                  <ShoppingBag className="w-5 h-5" />
                  {items.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-background animate-in zoom-in">
                      {items.length}
                    </span>
                  )}
                </Button>
              </Link>

              <div className="hidden sm:block">
                <Link to={ROUTES.LOGIN}>
                  <Button variant="ghost" size="md" className="gap-2">
                    <User className="w-4 h-4" />
                    {t("common.login")}
                  </Button>
                </Link>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden rounded-2xl"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden absolute top-20 inset-x-0 bg-card border-b overflow-hidden"
            >
              <div className="px-4 py-6 space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="flex items-center gap-4 px-4 py-4 text-base font-bold rounded-2xl hover:bg-secondary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="p-2 bg-primary/10 rounded-xl text-primary">
                      <item.icon className="w-5 h-5" />
                    </div>
                    {item.name}
                  </Link>
                ))}
                <div className="pt-6 border-t mt-6 space-y-3">
                  <Button variant="outline" className="w-full rounded-2xl h-12 font-bold">
                    {t("common.login")}
                  </Button>
                  <Button className="w-full rounded-2xl h-12 font-bold">{t("common.start_learning")}</Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="flex-1 w-full">{children}</main>

      <Footer />
    </div>
  );
};

export default MainLayout;
