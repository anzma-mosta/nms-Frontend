import { MainLayout } from "../../layouts/MainLayout";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

const Dashboard = () => {
  const { t } = useTranslation();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-8">{t("nav.dashboard")}</h1>
        <div className="bg-secondary/30 p-8 rounded-2xl border border-primary/10">
          <p className="text-xl mb-4">Welcome back, {user?.name}!</p>
          <p className="text-muted-foreground">
            This is your educational dashboard.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
