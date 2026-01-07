import i18n from "../i18n";
import type { Course, Instructor } from "../types";

export const getMockCourses = (lang: string): Course[] => {
  const coursesData = i18n.t("courses.list", {
    lng: lang,
    returnObjects: true,
  }) as Record<string, Course>;

  return Object.keys(coursesData).map((key, index) => {
    const course = coursesData[key];
    return {
      ...course,
      id: (index + 1).toString(),
      rating: 4.9,
      reviews: index === 0 ? 1240 : 850,
      students: index === 0 ? 5430 : 4200,
      progress: index === 0 ? 35 : 0,
      price: index === 0 ? "$149.99" : "$199",
      oldPrice: index === 0 ? "$299.99" : "$399",
      image:
        index === 0
          ? "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80"
          : "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?w=1200&q=80",
      category: course.category || "Development",
    };
  });
};

export const getMockInstructors = (lang: string): Instructor[] => {
  const instructorsData = i18n.t("instructor.list", {
    lng: lang,
    returnObjects: true,
  }) as Record<string, Instructor>;

  const images = [
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
  ];

  return Object.keys(instructorsData).map((key, index) => {
    const instructor = instructorsData[key];
    return {
      id: key,
      name: instructor.name || "Instructor",
      role: instructor.role || "Expert",
      specialty: instructor.specialty || "all",
      rating: instructor.rating || 4.7,
      reviewsCount: instructor.reviewsCount || 120,
      studentsCount: instructor.studentsCount || 5000,
      coursesCount: instructor.coursesCount || 5,
      image: images[index] || images[0],
      coverImage:
        "https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&q=80",
      location: "Casablanca, Morocco",
      joinedDate: "2023",
      bio:
        instructor.bio ||
        "Professional instructor with years of experience in the field.",
      skills: ["React", "TypeScript", "Node.js"],
      social: {
        github: "#",
        twitter: "#",
        linkedin: "#",
        website: "#",
      },
      experience: [
        {
          period: "2020 - Present",
          role: "Senior Developer",
          company: "Tech Solutions",
          desc: "Leading development teams and architecting scalable solutions.",
        },
      ],
      education: [
        {
          year: "2018",
          degree: "Master in Computer Science",
          school: "University of Technology",
        },
      ],
      testimonials: [],
      courses: [],
    };
  });
};
