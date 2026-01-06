export const getMockCourses = (lang: string) => [
  {
    id: 1,
    title: lang === "ar" 
      ? "دبلومة تطوير الويب الشاملة (Full-Stack Developer)" 
      : "Ultimate Full-Stack Web Development Diploma",
    instructor: lang === "ar" ? "د. أحمد علي" : "Dr. Ahmed Ali",
    rating: 4.9,
    reviews: 1240,
    students: 5430,
    progress: 35,
    price: "$149.99",
    oldPrice: "$299.99",
    lastUpdated: "يناير 2026",
    language: lang === "ar" ? "العربية" : "English",
    duration: "48 ساعة",
    level: lang === "ar" ? "من المبتدئ للاحتراف" : "Zero to Hero",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80",
    description: lang === "ar"
      ? "انطلق في رحلة تعليمية مكثفة لتصبح مطور ويب متكامل. سنبدأ من أساسيات HTML و CSS وصولاً إلى بناء تطبيقات معقدة باستخدام React, Node.js و MongoDB."
      : "Embark on an intensive educational journey to become a full-stack web developer. We start from HTML & CSS basics to building complex applications with React, Node.js, and MongoDB.",
    learningPoints: [
      lang === "ar" ? "بناء تطبيقات ويب حقيقية وقابلة للتوسع" : "Build real-world, scalable web applications",
      lang === "ar" ? "إتقان تقنيات الـ Backend باستخدام Node.js و Express" : "Master Backend technologies with Node.js & Express",
      lang === "ar" ? "تصميم واجهات احترافية باستخدام React و Tailwind" : "Design professional UIs with React & Tailwind",
      lang === "ar" ? "إدارة قواعد البيانات SQL و NoSQL" : "Manage SQL & NoSQL databases",
    ],
    requirements: [
      lang === "ar" ? "جهاز كمبيوتر واتصال بالإنترنت" : "A computer and internet connection",
      lang === "ar" ? "لا يشترط وجود خبرة سابقة في البرمجة" : "No prior programming experience required",
    ],
    curriculum: [
      {
        id: "m1",
        title: lang === "ar" ? "الأساسيات القوية (HTML5 & CSS3)" : "Strong Foundations (HTML5 & CSS3)",
        lessons: [
          { id: "l1", title: lang === "ar" ? "مقدمة في عالم الويب الحديث" : "Introduction to Modern Web", duration: "25:00", free: true, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
          { id: "l2", title: lang === "ar" ? "بناء هيكل المواقع الاحترافي" : "Building Professional Structures", duration: "45:00", free: false, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        ]
      },
      {
        id: "m2",
        title: lang === "ar" ? "برمجة الواجهات (JavaScript Mastery)" : "Frontend Programming (JavaScript Mastery)",
        lessons: [
          { id: "l3", title: lang === "ar" ? "أساسيات لغة JavaScript" : "JavaScript Fundamentals", duration: "120:00", free: false, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        ]
      }
    ]
  },
  {
    id: 2,
    title: lang === "ar" ? "تصميم واجهات المستخدم الحديثة" : "Modern UI/UX Design",
    instructor: lang === "ar" ? "م. سارة حسن" : "Eng. Sarah Hassan",
    rating: 4.9,
    reviews: 850,
    students: 4200,
    progress: 0,
    price: "$199",
    oldPrice: "$399",
    lastUpdated: "ديسمبر 2025",
    language: lang === "ar" ? "العربية" : "English",
    duration: "32 ساعة",
    level: lang === "ar" ? "متوسط" : "Intermediate",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?w=1200&q=80",
    description: lang === "ar"
      ? "تعلم أسرار تصميم واجهات المستخدم الجذابة وتجربة المستخدم السلسة باستخدام Figma و Adobe XD."
      : "Learn the secrets of designing attractive UIs and smooth UX using Figma and Adobe XD.",
    learningPoints: [
      lang === "ar" ? "إتقان أدوات Figma الحديثة" : "Master modern Figma tools",
      lang === "ar" ? "فهم مبادئ سيكولوجية المستخدم" : "Understand user psychology principles",
    ],
    requirements: [
      lang === "ar" ? "لا توجد متطلبات سابقة" : "No prior requirements",
    ],
    curriculum: [
      {
        id: "m1",
        title: lang === "ar" ? "أساسيات التصميم" : "Design Fundamentals",
        lessons: [
          { id: "l1", title: lang === "ar" ? "مقدمة في UI/UX" : "Intro to UI/UX", duration: "15:00", free: true, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        ]
      }
    ]
  }
];

export const getMockInstructors = (lang: string) => [
  {
    id: "inst1",
    name: lang === "ar" ? "د. أحمد علي" : "Dr. Ahmed Ali",
    role: lang === "ar" ? "خبير تطوير الويب" : "Web Development Expert",
    rating: 4.9,
    students: "15,000+",
    courses: 12,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    bio: lang === "ar"
      ? "أكثر من 10 سنوات خبرة في تطوير المواقع وتدريب الآلاف من المبرمجين حول العالم."
      : "Over 10 years of experience in web development and training thousands of developers worldwide.",
  },
  {
    id: "inst2",
    name: lang === "ar" ? "م. سارة حسن" : "Eng. Sarah Hassan",
    role: lang === "ar" ? "مصممة تجربة مستخدم" : "UI/UX Designer",
    rating: 4.8,
    students: "8,500+",
    courses: 8,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    bio: lang === "ar"
      ? "متخصصة في بناء واجهات مستخدم جذابة وسهلة الاستخدام للشركات الناشئة."
      : "Specialized in building attractive and user-friendly interfaces for startups.",
  },
  {
    id: "inst3",
    name: lang === "ar" ? "أ. محمود سعد" : "Mr. Mahmoud Saad",
    role: lang === "ar" ? "مستشار إدارة مشاريع" : "Project Management Consultant",
    rating: 4.7,
    students: "12,000+",
    courses: 15,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    bio: lang === "ar"
      ? "خبير في منهجيات Agile و PMP مع خبرة واسعة في إدارة المشاريع التقنية."
      : "Expert in Agile and PMP methodologies with extensive experience in managing tech projects.",
  },
  {
    id: "inst4",
    name: lang === "ar" ? "د. ليلى خالد" : "Dr. Layla Khaled",
    role: lang === "ar" ? "عالمة بيانات" : "Data Scientist",
    rating: 4.9,
    students: "6,000+",
    courses: 6,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    bio: lang === "ar"
      ? "باحثة في مجال الذكاء الاصطناعي وخبيرة في تحليل البيانات الضخمة."
      : "AI researcher and big data analysis expert.",
  },
];
