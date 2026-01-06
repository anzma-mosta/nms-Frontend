import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import LoginPage from "../pages/Login";
import Courses from "../pages/Courses";
import Instructors from "../pages/Instructors";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Dashboard from "../pages/Dashboard";
import Terms from "../pages/Terms";
import Privacy from "../pages/Privacy";
import Services from "../pages/Services";
import BecomeInstructor from "../pages/BecomeInstructor";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import OrderSuccess from "../pages/OrderSuccess";
import CourseDetails from "../pages/CourseDetails";
import Lesson from "../pages/Lesson";
import InstructorDetails from "../pages/InstructorDetails";
import NotFound from "../pages/NotFound";
import { ROUTES } from "../constants/routes";
import PaymentStatus from "../pages/PaymentStatus";

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <App />,
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
