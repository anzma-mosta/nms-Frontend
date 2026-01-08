export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "student" | "parent" | "instructor";
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

export interface Experience {
  period: string;
  role: string;
  company: string;
  desc: string;
}

export interface Education {
  year: string;
  degree: string;
  school: string;
}

export interface Testimonial {
  id: number;
  content: string;
  name: string;
  role: string;
  avatar: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  isPreview?: boolean;
  free?: boolean;
}

export interface CurriculumSection {
  duration: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  instructorImage?: string;
  rating: number;
  students: number;
  price: string;
  oldPrice?: string;
  image: string;
  category: string;
  description?: string;
  learningPoints?: string[];
  duration?: string;
  lessonsCount?: number;
  isPurchased?: boolean;
  progress?: number;
  curriculum?: CurriculumSection[];
  level?: string;
  language?: string;
  lastUpdated?: string;
  reviews?: number;
  requirements?: string[];
}

export interface Instructor {
  id: string;
  name: string;
  role: string;
  image: string;
  coverImage: string;
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  coursesCount: number;
  students?: string;
  location: string;
  joinedDate: string;
  specialty: string;
  bio: string;
  skills: string[];
  social: {
    github: string;
    twitter: string;
    linkedin: string;
    website: string;
  };
  experience: Experience[];
  education: Education[];
  testimonials: Testimonial[];
  courses: Course[];
}
