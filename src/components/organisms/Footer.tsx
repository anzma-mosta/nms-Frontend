import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  GraduationCap,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
} from "lucide-react";
import { ROUTES } from "../../constants/routes";
import { Button } from "../atoms/Button";

export const Footer = () => {
  const { t } = useTranslation();

  const footerLinks = {
    platform: [
      { name: t("nav.courses"), href: ROUTES.COURSES },
      { name: t("nav.instructors"), href: ROUTES.INSTRUCTORS },
      { name: t("nav.about"), href: ROUTES.ABOUT },
      { name: t("nav.services"), href: ROUTES.SERVICES },
      { name: t("nav.contact"), href: ROUTES.CONTACT },
    ],
    support: [
      { name: t("nav.become_instructor"), href: ROUTES.BECOME_INSTRUCTOR },
      { name: t("home.faq.title"), href: "#" },
      { name: t("footer.terms"), href: ROUTES.TERMS },
      { name: t("footer.privacy"), href: ROUTES.PRIVACY },
    ],
    social: [
      { icon: Facebook, href: "#", name: "Facebook" },
      { icon: Twitter, href: "#", name: "Twitter" },
      { icon: Instagram, href: "#", name: "Instagram" },
      { icon: Linkedin, href: "#", name: "Linkedin" },
      { icon: Github, href: "#", name: "Github" },
    ],
  };

  return (
    <footer className="bg-card border-t border-border/40 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="space-y-8">
            <Link to={ROUTES.HOME} className="flex items-center gap-3 group">
              <div className="bg-primary p-2.5 rounded-2xl text-primary-foreground shadow-lg shadow-primary/30 group-hover:rotate-6 transition-transform">
                <GraduationCap className="w-7 h-7" />
              </div>
              <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-l from-primary to-blue-600">
                NMS Academy
              </span>
            </Link>
            <p className="text-muted-foreground leading-relaxed text-sm">
              {t("footer.platform_desc")}
            </p>
            <div className="flex gap-3">
              {footerLinks.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="w-11 h-11 rounded-2xl bg-secondary/50 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 group hover:-translate-y-1"
                  aria-label={item.name}
                >
                  <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-black text-lg mb-8 tracking-tight">{t("footer.platform")}</h4>
            <ul className="space-y-5">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-all flex items-center gap-3 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover:scale-150 group-hover:bg-primary transition-all"></span>
                    <span className="text-sm font-semibold">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-black text-lg mb-8 tracking-tight">{t("footer.support")}</h4>
            <ul className="space-y-5">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-all flex items-center gap-3 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover:scale-150 group-hover:bg-primary transition-all"></span>
                    <span className="text-sm font-semibold">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-secondary/30 p-8 rounded-[2rem] border border-border/50">
            <h4 className="font-black text-lg mb-4 tracking-tight">{t("footer.newsletter")}</h4>
            <p className="text-sm text-muted-foreground mb-6">{t("footer.newsletter_desc")}</p>
            <div className="space-y-3">
              <input 
                type="email" 
                placeholder={t("footer.email_placeholder")}
                className="w-full bg-background border-2 border-transparent rounded-2xl px-4 py-3 text-sm focus:border-primary outline-none transition-all"
              />
              <Button className="w-full h-12 rounded-xl font-bold">{t("footer.subscribe")}</Button>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm font-bold text-muted-foreground">
            © {new Date().getFullYear()} NMS Academy. {t("common.all_rights_reserved")}
          </p>
          <div className="flex gap-8">
            <Link to={ROUTES.PRIVACY} className="text-xs font-black text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest">
              {t("footer.privacy")}
            </Link>
            <Link to={ROUTES.TERMS} className="text-xs font-black text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest">
              {t("footer.terms")}
            </Link>
            <Link to="/cookies" className="text-xs font-black text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest">
              {t("footer.cookies")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
