export interface User {
  id: string
  name: string
  email: string
  phone: string
  password: string
  profilePicture?: string
  createdAt: string
}

export interface Admin {
  id: string
  username: string
  password: string
}

export interface Course {
  id: string
  title: string
  description: string
  mrp: number
  price: number
  image: string
  category: string
  createdAt: string
  chapters: Chapter[]
}

export interface Chapter {
  id: string
  courseId: string
  title: string
  videos: Video[]
}

export interface Video {
  id: string
  chapterId: string
  title: string
  filename: string
  duration: string
}

export interface Order {
  id: string
  userId: string
  courseId: string
  amount: number
  status: "success" | "failed" | "pending"
  utrNumber?: string
  createdAt: string
}

export interface Banner {
  id: string
  image: string
  link: string
}

export interface Settings {
  appName: string
  upiId: string
  supportEmail: string
  supportPhone: string
}

export interface AdminSettings {
  appName: string
  appVersion: string
  appLogo: string
  upiId: string
  supportEmail: string
  supportPhone: string
  adminProfilePicture: string
  instagramLink: string
  facebookLink: string
  telegramLink: string
  youtubeLink: string
}
