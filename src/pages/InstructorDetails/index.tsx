import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MainLayout } from "../../components/templates/MainLayout";
import { InstructorHero } from "../../components/organisms/InstructorDetails/InstructorHero";
import { InstructorAbout } from "../../components/organisms/InstructorDetails/InstructorAbout";
import { InstructorExperience } from "../../components/organisms/InstructorDetails/InstructorExperience";
import { InstructorEducation } from "../../components/organisms/InstructorDetails/InstructorEducation";
import { InstructorCourses } from "../../components/organisms/InstructorDetails/InstructorCourses";
import { InstructorSidebar } from "../../components/organisms/InstructorDetails/InstructorSidebar";
import type {
  Education,
  Experience,
  Course,
  Testimonial,
  Instructor,
} from "../../types";

interface InstructorData {
  name: string;
  role: string;
  rating?: number;
  reviewsCount?: number;
  studentsCount?: number;
  coursesCount?: number;
  location: string;
  joinedYear?: string;
  bio: string;
  skills?: string[];
  experience?: Experience[];
  education?: Education[];
  testimonials?: Testimonial[];
  courses?: Course[];
}

const InstructorDetails = () => {
  const { id = "inst1" } = useParams();
  const { t } = useTranslation();

  // Get translated data for the specific instructor
  const instructorData = t(`instructor.list.${id}`, {
    returnObjects: true,
  }) as unknown as InstructorData;

  // Mock data for instructor with enhanced details
  const instructor: Instructor = {
    id,
    name: instructorData.name,
    role: instructorData.role,
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80",
    coverImage:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&q=80",
    rating: instructorData.rating || 4.9,
    reviewsCount: instructorData.reviewsCount || 4500,
    studentsCount: instructorData.studentsCount || 15000,
    coursesCount: instructorData.coursesCount || 12,
    location: instructorData.location,
    joinedDate: t("instructor.joined", {
      year: instructorData.joinedYear || "2020",
    }),
    bio: instructorData.bio,
    skills: instructorData.skills || [],
    specialty: "all", // Added to match Instructor type
    social: {
      github: "https://github.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      website: "https://example.com",
    },
    experience: instructorData.experience || [],
    education: instructorData.education || [],
    testimonials: (instructorData.testimonials || []).map(
      (test: Testimonial, index: number) => ({
        ...test,
        id: index + 1,
        avatar:
          index === 0
            ? "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
            : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
      })
    ),
    courses: (instructorData.courses || []).map(
      (course: Course, index: number) => ({
        ...course,
        id: (index + 1).toString(),
        instructor: instructorData.name,
        rating: 4.8 + index * 0.1,
        students: index === 0 ? 1200 : 850,
        image:
          index === 0
            ? "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80"
            : "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
      })
    ),
  };

  return (
    <MainLayout>
      <InstructorHero instructor={instructor} />

      <div className="container mx-auto px-4 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-20">
            <InstructorAbout bio={instructor.bio} skills={instructor.skills} />

            <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <InstructorExperience experience={instructor.experience} />
              <InstructorEducation education={instructor.education} />
            </section>

            <InstructorCourses
              instructorName={instructor.name}
              courses={instructor.courses || []}
            />
          </div>

          <InstructorSidebar instructorName={instructor.name} />
        </div>
      </div>
    </MainLayout>
  );
};

export default InstructorDetails;
