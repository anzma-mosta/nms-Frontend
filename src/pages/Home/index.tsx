import { MainLayout } from "../../layouts/MainLayout";
import { Hero } from "./components/Hero";
import { AboutUs } from "./components/AboutUs";
import { TopInstructors } from "./components/TopInstructors";
import { Classes } from "./components/Classes";
import { FeaturedCourses } from "./components/FeaturedCourses";
import { Subscriptions } from "./components/Subscriptions";
import { Testimonials } from "./components/Testimonials";
import { FAQs } from "./components/FAQs";
import { FinalCTA } from "./components/FinalCTA";
import { ContactUs } from "./components/ContactUs";

const Home = () => {
  return (
    <MainLayout>
      <Hero />
      <AboutUs />
      <TopInstructors />
      <Classes />
      <FeaturedCourses />
      <Subscriptions />
      <Testimonials />
      <FAQs />
      <FinalCTA />
      <ContactUs />
    </MainLayout>
  );
};

export default Home;
