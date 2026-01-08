import { lazy, Suspense, memo } from "react";
import { MainLayout } from "../../components/templates/MainLayout";
import { Hero } from "../../components/organisms/Home/Hero";
import { SEO } from "../../components/atoms/SEO";

// Lazy load components below the fold
const AboutUs = lazy(() => import("../../components/organisms/Home/AboutUs").then(m => ({ default: m.AboutUs })));
const TopInstructors = lazy(() => import("../../components/organisms/Home/TopInstructors").then(m => ({ default: m.TopInstructors })));
const Classes = lazy(() => import("../../components/organisms/Home/Classes").then(m => ({ default: m.Classes })));
const FeaturedCourses = lazy(() => import("../../components/organisms/Home/FeaturedCourses").then(m => ({ default: m.FeaturedCourses })));
const Subscriptions = lazy(() => import("../../components/organisms/Home/Subscriptions").then(m => ({ default: m.Subscriptions })));
const Testimonials = lazy(() => import("../../components/organisms/Home/Testimonials").then(m => ({ default: m.Testimonials })));
const InstructorCTA = lazy(() => import("../../components/organisms/Home/InstructorCTA").then(m => ({ default: m.InstructorCTA })));
const FAQs = lazy(() => import("../../components/organisms/Home/FAQs").then(m => ({ default: m.FAQs })));
const FinalCTA = lazy(() => import("../../components/organisms/Home/FinalCTA").then(m => ({ default: m.FinalCTA })));
const ContactUs = lazy(() => import("../../components/organisms/Home/ContactUs").then(m => ({ default: m.ContactUs })));

// Loading placeholder for lazy components
const SectionLoader = () => (
  <div className="w-full h-48 flex items-center justify-center bg-background/50 animate-pulse rounded-3xl">
    <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
  </div>
);

const Home = memo(() => {
  return (
    <MainLayout>
      <SEO />
      <Hero />
      <Suspense fallback={<SectionLoader />}>
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
      </Suspense>
    </MainLayout>
  );
});

Home.displayName = "Home";

export default Home;
