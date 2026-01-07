export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
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

export interface Course {
  id: string;
  title: string;
  instructor: string;
  rating: number;
  students: number | string;
  price: string;
  image: string;
  category: string;
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
  location: string;
  joinedDate: string;
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
