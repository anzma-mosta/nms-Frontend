import { MainLayout } from "../../components/templates/MainLayout";
import { Hero } from "../../components/organisms/Home/Hero";
import { AboutUs } from "../../components/organisms/Home/AboutUs";
import { TopInstructors } from "../../components/organisms/Home/TopInstructors";
import { Classes } from "../../components/organisms/Home/Classes";
import { FeaturedCourses } from "../../components/organisms/Home/FeaturedCourses";
import { Subscriptions } from "../../components/organisms/Home/Subscriptions";
import { Testimonials } from "../../components/organisms/Home/Testimonials";
import { InstructorCTA } from "../../components/organisms/Home/InstructorCTA";
import { FAQs } from "../../components/organisms/Home/FAQs";
import { FinalCTA } from "../../components/organisms/Home/FinalCTA";
import { ContactUs } from "../../components/organisms/Home/ContactUs";
import { SEO } from "../../components/atoms/SEO";

const Home = () => {
  return (
    <MainLayout>
      <SEO />
      <Hero />
      <AboutUs />
      <TopInstructors />
      <Classes />
      <FeaturedCourses />
      <Subscriptions />
      <InstructorCTA />
      <Testimonials />
      <FAQs />
      <FinalCTA />
      <ContactUs />
    </MainLayout>
  );
};

export default Home;
