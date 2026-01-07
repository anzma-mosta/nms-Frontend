import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import App from "../App";
import { LoadingScreen } from "../components/atoms/LoadingScreen";
import { ROUTES } from "../constants/routes";

// Lazy load page components
const Home = lazy(() => import("../pages/Home"));
const LoginPage = lazy(() => import("../pages/Login"));
const Courses = lazy(() => import("../pages/Courses"));
const Instructors = lazy(() => import("../pages/Instructors"));
const About = lazy(() => import("../pages/About"));
const Contact = lazy(() => import("../pages/Contact"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Terms = lazy(() => import("../pages/Terms"));
const Privacy = lazy(() => import("../pages/Privacy"));
const Services = lazy(() => import("../pages/Services"));
const BecomeInstructor = lazy(() => import("../pages/BecomeInstructor"));
const Cart = lazy(() => import("../pages/Cart"));
const Checkout = lazy(() => import("../pages/Checkout"));
const OrderSuccess = lazy(() => import("../pages/OrderSuccess"));
const CourseDetails = lazy(() => import("../pages/CourseDetails"));
const Lesson = lazy(() => import("../pages/Lesson"));
const InstructorDetails = lazy(() => import("../pages/InstructorDetails"));
const NotFound = lazy(() => import("../pages/NotFound"));
const PaymentStatus = lazy(() => import("../pages/PaymentStatus"));

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <App />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: ROUTES.LOGIN,
        element: <LoginPage />,
      },
      {
        path: ROUTES.COURSES,
        element: <Courses />,
      },
      {
        path: ROUTES.INSTRUCTORS,
        element: <Instructors />,
      },
      {
        path: ROUTES.ABOUT,
        element: <About />,
      },
      {
        path: ROUTES.CONTACT,
        element: <Contact />,
      },
      {
        path: ROUTES.DASHBOARD,
        element: <Dashboard />,
      },
      {
        path: ROUTES.TERMS,
        element: <Terms />,
      },
      {
        path: ROUTES.PRIVACY,
        element: <Privacy />,
      },
      {
        path: ROUTES.SERVICES,
        element: <Services />,
      },
      {
        path: ROUTES.BECOME_INSTRUCTOR,
        element: <BecomeInstructor />,
      },
      {
        path: ROUTES.CART,
        element: <Cart />,
      },
      {
        path: ROUTES.CHECKOUT,
        element: <Checkout />,
      },
      {
        path: ROUTES.ORDER_SUCCESS,
        element: <OrderSuccess />,
      },
      {
        path: ROUTES.PAYMENT_STATUS,
        element: <PaymentStatus />,
      },
      {
        path: ROUTES.COURSE_DETAILS,
        element: <CourseDetails />,
      },
      {
        path: ROUTES.LESSON,
        element: <Lesson />,
      },
      {
        path: ROUTES.INSTRUCTOR_DETAILS,
        element: <InstructorDetails />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
