import { LoginForm } from "../../features/auth/components/LoginForm";
import { MainLayout } from "../../components/templates/MainLayout";

const LoginPage = () => {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center py-12">
        <h1 className="text-3xl font-bold mb-8">تسجيل الدخول</h1>
        <LoginForm />
      </div>
    </MainLayout>
  );
};

export default LoginPage;
