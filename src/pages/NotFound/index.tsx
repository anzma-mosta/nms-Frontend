import { MainLayout } from "../../components/templates/MainLayout";
import { useTranslation } from "react-i18next";
import { Button } from "../../components/atoms/Button";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { Home } from "lucide-react";

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <MainLayout>
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-9xl font-black text-primary/20">404</h1>
        <h2 className="text-3xl font-bold mt-4 mb-2">
          {t("errors.not_found_title")}
        </h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          {t("errors.not_found_desc")}
        </p>
        <Link to={ROUTES.HOME}>
          <Button className="gap-2">
            <Home className="w-4 h-4" />
            {t("errors.back_home")}
          </Button>
        </Link>
      </div>
    </MainLayout>
  );
};

export default NotFound;
