import { useTranslation } from "react-i18next";
import { useLocation, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "../../components/templates/MainLayout";
import { StudentDashboard } from "../../features/dashboard/components/StudentDashboard";
import { StudentCourses } from "../../features/dashboard/components/StudentCourses";
import { StudentExams } from "../../features/dashboard/components/StudentExams";
import { StudentReports } from "../../features/dashboard/components/StudentReports";
import { StudentMessages } from "../../features/dashboard/components/StudentMessages";
import { StudentSettings } from "../../features/dashboard/components/StudentSettings";
import { StudentProfile } from "../../features/dashboard/components/StudentProfile";
import { AdminDashboard } from "../../features/dashboard/components/AdminDashboard";
import { AdminCourses } from "../../features/dashboard/components/AdminCourses";
import { AdminUsers } from "../../features/dashboard/components/AdminUsers";
import { AdminPayments } from "../../features/dashboard/components/AdminPayments";
import { useAppSelector } from "../../store";

const Dashboard = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const isAr = i18n.language === "ar";
  const { user } = useAppSelector((state) => state.auth);

  if (!user) return <Navigate to="/" />;

  const isStudent = user.role === "student" || user.role === "parent";

  const renderContent = () => {
    const path = location.pathname.split("/").pop();

    if (isStudent) {
      switch (path) {
        case "dashboard":
          return <StudentDashboard user={user} />;
        case "courses":
          return <StudentCourses />;
        case "exams":
          return <StudentExams />;
        case "reports":
          return <StudentReports />;
        case "messages":
          return <StudentMessages />;
        case "settings":
          return <StudentSettings />;
        case "profile":
          return <StudentProfile />;
        default:
          return <StudentDashboard user={user} />;
      }
    } else {
      switch (path) {
        case "dashboard":
          return <AdminDashboard user={user} />;
        case "courses":
          return <AdminCourses />;
        case "students":
          return <AdminUsers />;
        case "instructors":
          return <AdminUsers />;
        case "payments":
          return <AdminPayments />;
        case "settings":
          return <StudentSettings />;
        case "profile":
          return <StudentProfile />;
        default:
          return <AdminDashboard user={user} />;
      }
    }
  };

  return (
    <MainLayout>
      <div
        className="min-h-screen bg-background pt-20"
        dir={isAr ? "rtl" : "ltr"}
      >
        <div className="flex h-[calc(100vh-80px)] overflow-hidden">
          {/* Dashboard Sidebar is handled within the feature components or should be added here */}
          <main className="flex-1 overflow-y-auto bg-slate-50/50 dark:bg-slate-900/50 p-4 md:p-8">
            <Routes>
              <Route path="*" element={renderContent()} />
            </Routes>
          </main>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
