import type { Course, Banner, Admin, Settings, User } from "./types"

export const mockCourses: Course[] = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp",
    description: "Learn HTML, CSS, JavaScript, React, Node.js and build amazing web applications from scratch.",
    mrp: 4999,
    price: 2999,
    image: "/web-dev-bootcamp.png",
    category: "Web Development",
    createdAt: "2024-01-15",
    chapters: [
      {
        id: "1",
        courseId: "1",
        title: "HTML Fundamentals",
        videos: [
          { id: "1", chapterId: "1", title: "Introduction to HTML", filename: "html-intro.mp4", duration: "15:30" },
          {
            id: "2",
            chapterId: "1",
            title: "HTML Elements and Tags",
            filename: "html-elements.mp4",
            duration: "22:45",
          },
        ],
      },
      {
        id: "2",
        courseId: "1",
        title: "CSS Styling",
        videos: [
          { id: "3", chapterId: "2", title: "CSS Basics", filename: "css-basics.mp4", duration: "18:20" },
          { id: "4", chapterId: "2", title: "Flexbox and Grid", filename: "css-layout.mp4", duration: "25:10" },
        ],
      },
    ],
  },
  {
    id: "2",
    title: "React Native Mobile Development",
    description:
      "Build cross-platform mobile apps with React Native. Learn navigation, state management, and deployment.",
    mrp: 3999,
    price: 2499,
    image: "/react-native-app-dev.png",
    category: "Mobile Development",
    createdAt: "2024-01-20",
    chapters: [
      {
        id: "3",
        courseId: "2",
        title: "Getting Started with React Native",
        videos: [
          {
            id: "5",
            chapterId: "3",
            title: "Setting up Development Environment",
            filename: "rn-setup.mp4",
            duration: "12:15",
          },
        ],
      },
    ],
  },
  {
    id: "3",
    title: "Python for Data Science",
    description: "Master Python programming for data analysis, visualization, and machine learning applications.",
    mrp: 5999,
    price: 3999,
    image: "/python-data-science-programming.jpg",
    category: "Data Science",
    createdAt: "2024-01-25",
    chapters: [
      {
        id: "4",
        courseId: "3",
        title: "Python Basics",
        videos: [
          {
            id: "6",
            chapterId: "4",
            title: "Variables and Data Types",
            filename: "python-basics.mp4",
            duration: "20:30",
          },
        ],
      },
    ],
  },
  {
    id: "4",
    title: "Digital Marketing Mastery",
    description: "Learn SEO, social media marketing, Google Ads, and content marketing strategies.",
    mrp: 2999,
    price: 1999,
    image: "/digital-marketing-strategy-social-media.jpg",
    category: "Marketing",
    createdAt: "2024-02-01",
    chapters: [
      {
        id: "5",
        courseId: "4",
        title: "SEO Fundamentals",
        videos: [
          { id: "7", chapterId: "5", title: "Keyword Research", filename: "seo-keywords.mp4", duration: "16:45" },
        ],
      },
    ],
  },
]

export const mockBanners: Banner[] = [
  {
    id: "1",
    image: "/online-learning-platform-banner.jpg",
    link: "/courses",
  },
  {
    id: "2",
    image: "/skill-development-courses-banner.jpg",
    link: "/courses",
  },
  {
    id: "3",
    image: "/programming-bootcamp-banner.jpg",
    link: "/courses",
  },
]

export const mockAdmin: Admin = {
  id: "1",
  username: "skillzUpadmin",
  password: "adminskillzUp@1312",
}

export const mockUser: User = {
  id: "demo-user-1",
  name: "Demo User",
  email: "demo@skillzup.com",
  password: "demo123",
  phone: "+1-234-567-8901",
  createdAt: "2024-01-01",
}

export const mockSettings: Settings = {
  appName: "SkillzUp",
  upiId: "lakkhikanta.m@ptyes",
  supportEmail: "support@skillzup.com",
  supportPhone: "+1-234-567-8900",
}
