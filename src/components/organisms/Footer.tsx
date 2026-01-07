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
    <footer className="bg-card border-t pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to={ROUTES.HOME} className="flex items-center gap-2">
              <div className="bg-primary p-2 rounded-xl text-primary-foreground shadow-lg shadow-primary/20">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-l from-primary to-blue-600">
                NMS Academy
              </span>
            </Link>
            <p className="text-muted-foreground leading-relaxed">
              {t("footer.platform_desc")}
            </p>
            <div className="flex gap-4">
              {footerLinks.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center hover:bg-primary hover:text-white transition-all group"
                  aria-label={item.name}
                >
                  <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">{t("footer.platform")}</h4>
            <ul className="space-y-4">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/20"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">{t("footer.support")}</h4>
            <ul className="space-y-4">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/20"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-bold text-lg mb-6">{t("footer.newsletter")}</h4>
            <p className="text-muted-foreground">
              {t("footer.newsletter_desc")}
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder={t("footer.email_placeholder")}
                className="w-full bg-secondary/50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none transition-all"
              />
              <Button className="w-full h-12 rounded-xl font-bold">
                {t("footer.subscribe")}
              </Button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2026 NMS Academy. {t("common.all_rights_reserved")}</p>
          <div className="flex gap-8">
            <Link to="/terms" className="hover:text-primary transition-colors">
              {t("footer.terms")}
            </Link>
            <Link
              to="/privacy"
              className="hover:text-primary transition-colors"
            >
              {t("footer.privacy")}
            </Link>
            <Link
              to="/cookies"
              className="hover:text-primary transition-colors"
            >
              {t("footer.cookies")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
