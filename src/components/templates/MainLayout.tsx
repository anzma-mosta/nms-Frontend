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
    // { name: isAr ? "خدماتنا" : "Services", href: ROUTES.SERVICES, icon: Zap },
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
      <nav className="sticky top-0 z-50 w-full bg-card/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo & Desktop Nav */}
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-2">
                <div className="bg-primary p-1.5 rounded-lg text-primary-foreground">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-l from-primary to-blue-600">
                  NMS Academy
                </span>
              </Link>

              <div className="hidden lg:flex items-center gap-1">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={cn(
                        "px-4 py-2 text-sm font-medium rounded-full transition-all hover:bg-secondary",
                        isActive
                          ? "text-primary bg-primary/5"
                          : "text-muted-foreground"
                      )}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Search & Actions */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search
                  className={cn(
                    "absolute top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground",
                    i18n.language === "ar" ? "right-3" : "left-3"
                  )}
                />
                <input
                  type="text"
                  placeholder={t("common.search")}
                  className={cn(
                    "w-full bg-secondary/50 border-none rounded-full py-2 text-sm focus:ring-2 focus:ring-primary transition-all",
                    i18n.language === "ar" ? "pr-10 pl-4" : "pl-10 pr-4"
                  )}
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link to={ROUTES.CART} className="relative p-2 hover:bg-secondary rounded-full transition-all group">
                <ShoppingBag className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                {items.length > 0 && (
                  <span className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in duration-300">
                    {items.length}
                  </span>
                )}
              </Link>
              <LanguageToggle />
              <ThemeToggle />
              <div className="hidden sm:flex items-center gap-2">
                {/*  for notifications */}
                {/* <Button variant="ghost" size="sm" className="relative">
                  <Bell className="w-5 h-5 text-muted-foreground" />
                  <span
                    className={cn(
                      "absolute top-2 w-2 h-2 bg-red-500 rounded-full border-2 border-card",
                      i18n.language === "ar" ? "left-2" : "right-2"
                    )}
                  ></span>
                </Button> */}
                <div className="w-px h-6 bg-border mx-1"></div>
                <Link to={ROUTES.LOGIN}>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User className="w-4 h-4" />
                    <span>{t("common.login")}</span>
                  </Button>
                </Link>
                <Button size="sm">{t("common.start_learning")}</Button>
              </div>

              {/* Mobile menu button */}
              <button
                className="lg:hidden p-2 rounded-lg hover:bg-secondary"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "lg:hidden absolute top-16 inset-x-0 bg-card border-b transition-all duration-300 origin-top overflow-hidden",
            isMobileMenuOpen ? "max-h-[100vh] py-4" : "max-h-0"
          )}
        >
          <div className="px-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center gap-3 px-4 py-3 text-base font-medium rounded-xl hover:bg-secondary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon className="w-5 h-5 text-primary" />
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t mt-4 space-y-2">
              <Button variant="outline" className="w-full">
                {t("common.login")}
              </Button>
              <Button className="w-full">{t("common.start_learning")}</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 w-full">{children}</main>

      <Footer />
    </div>
  );
};

export default MainLayout;
