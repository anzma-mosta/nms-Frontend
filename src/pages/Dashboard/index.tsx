import { DashboardLayout } from "../../components/templates/DashboardLayout";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation, Routes, Route, Navigate } from "react-router-dom";
import type { RootState } from "../../store";
import { ROUTES } from "../../constants/routes";
import { StudentDashboard } from "../../features/dashboard/components/StudentDashboard";
import { ParentDashboard } from "../../features/dashboard/components/ParentDashboard";
import { StudentCourses } from "../../features/dashboard/components/StudentCourses";
import { StudentAssignments } from "../../features/dashboard/components/StudentAssignments";
import { StudentExams } from "../../features/dashboard/components/StudentExams";
import { StudentReports } from "../../features/dashboard/components/StudentReports";
import { StudentMessages } from "../../features/dashboard/components/StudentMessages";
import { StudentProfile } from "../../features/dashboard/components/StudentProfile";
import { StudentSettings } from "../../features/dashboard/components/StudentSettings";
import { AdminDashboard } from "../../features/dashboard/components/AdminDashboard";
import { AdminUsers } from "../../features/dashboard/components/AdminUsers";
import { AdminCourses } from "../../features/dashboard/components/AdminCourses";
import { AdminPayments } from "../../features/dashboard/components/AdminPayments";

const Dashboard = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.auth);

  const renderContent = () => {
    const isAdminPath = location.pathname.startsWith(ROUTES.ADMIN_DASHBOARD);

    // Admin Sub-routing
    if (user?.role === "admin" || isAdminPath) {
      // If exactly on /dashboard, redirect to /dashboard/admin
      if (location.pathname === ROUTES.DASHBOARD) {
        return <Navigate to={ROUTES.ADMIN_DASHBOARD} replace />;
      }

      switch (location.pathname) {
        case ROUTES.ADMIN_DASHBOARD:
          return <AdminDashboard user={user} />;
        case ROUTES.ADMIN_USERS:
          return <AdminUsers />;
        case ROUTES.ADMIN_COURSES:
          return <AdminCourses />;
        case ROUTES.ADMIN_PAYMENTS:
          return <AdminPayments />;
        case ROUTES.ADMIN_SETTINGS:
          return <StudentSettings />;
        default:
          return <AdminDashboard user={user} />;
      }
    }

    // Basic Role Routing
    if (user?.role === "parent") {
      return <ParentDashboard user={user} />;
    }

    // Student Sub-routing
    switch (location.pathname) {
      case ROUTES.DASHBOARD_COURSES:
        return <StudentCourses />;
      case ROUTES.DASHBOARD_ASSIGNMENTS:
        return <StudentAssignments />;
      case ROUTES.DASHBOARD_EXAMS:
        return <StudentExams />;
      case ROUTES.DASHBOARD_REPORTS:
        return <StudentReports />;
      case ROUTES.DASHBOARD_MESSAGES:
        return <StudentMessages />;
      case ROUTES.DASHBOARD_PROFILE:
        return <StudentProfile />;
      case ROUTES.DASHBOARD_SETTINGS:
        return <StudentSettings />;
      default:
        return <StudentDashboard user={user} />;
    }
  };

  return <DashboardLayout>{renderContent()}</DashboardLayout>;
};

export default Dashboard;
