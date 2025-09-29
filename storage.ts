import type { User, Course, Order, Banner, Admin, Settings, AdminSettings } from "./types"
import { mockCourses, mockBanners, mockAdmin, mockSettings, mockUser } from "./mock-data"

// Initialize localStorage with mock data if not exists
export const initializeStorage = () => {
  if (typeof window === "undefined") return

  try {
    // Initialize courses
    if (!localStorage.getItem("skillzup_courses")) {
      localStorage.setItem("skillzup_courses", JSON.stringify(mockCourses))
    }

    // Initialize banners
    if (!localStorage.getItem("skillzup_banners")) {
      localStorage.setItem("skillzup_banners", JSON.stringify(mockBanners))
    }

    // Initialize settings
    if (!localStorage.getItem("skillzup_settings")) {
      localStorage.setItem("skillzup_settings", JSON.stringify(mockSettings))
    }

    // Initialize users
    if (!localStorage.getItem("skillzup_users")) {
      localStorage.setItem("skillzup_users", JSON.stringify([mockUser]))
    }

    // Initialize orders
    if (!localStorage.getItem("skillzup_orders")) {
      localStorage.setItem("skillzup_orders", JSON.stringify([]))
    }

    const adminKey = "skillzup_admin"
    try {
      const existingAdmin = localStorage.getItem(adminKey)

      if (!existingAdmin) {
        // No admin exists, create default
        localStorage.setItem(adminKey, JSON.stringify(mockAdmin))
      } else {
        // Validate existing admin structure
        const parsed = JSON.parse(existingAdmin)

        if (
          !parsed ||
          typeof parsed.id !== "string" ||
          typeof parsed.username !== "string" ||
          typeof parsed.password !== "string" ||
          !parsed.id ||
          !parsed.username ||
          !parsed.password
        ) {
          // Invalid admin structure, reset to default
          console.warn("Invalid admin structure detected, resetting to default")
          localStorage.setItem(adminKey, JSON.stringify(mockAdmin))
        }

        // Ensure admin credentials match expected values for consistency
        if (parsed.username !== mockAdmin.username || parsed.password !== mockAdmin.password) {
          localStorage.setItem(adminKey, JSON.stringify(mockAdmin))
        }
      }
    } catch (adminError) {
      console.error("Error initializing admin:", adminError)
      localStorage.setItem(adminKey, JSON.stringify(mockAdmin))
    }

    // Initialize admin settings if not exists
    if (!localStorage.getItem("skillzup_admin_settings")) {
      const defaultAdminSettings = {
        appName: "SkillzUp",
        appVersion: "1.0.0",
        appLogo: "",
        upiId: "lakkhikanta.m@ptyes",
        supportEmail: "support@skillzup.com",
        supportPhone: "+1-234-567-8900",
        adminProfilePicture: "",
        instagramLink: "https://instagram.com/yourhandle",
        facebookLink: "https://facebook.com/yourpage",
        telegramLink: "https://t.me/yourchannel",
        youtubeLink: "https://youtube.com/@yourchannel",
      }
      localStorage.setItem("skillzup_admin_settings", JSON.stringify(defaultAdminSettings))
    }
  } catch (error) {
    console.error("Error initializing storage:", error)
    // Fallback: try to initialize critical components individually
    try {
      if (!localStorage.getItem("skillzup_admin")) {
        localStorage.setItem("skillzup_admin", JSON.stringify(mockAdmin))
      }
    } catch {
      console.error("Critical error: Cannot initialize admin data")
    }
  }
}

// User management
export const getUsers = (): User[] => {
  if (typeof window === "undefined") return []
  const users = localStorage.getItem("skillzup_users")
  return users ? JSON.parse(users) : []
}

export const saveUser = (user: User): void => {
  if (typeof window === "undefined") return
  const users = getUsers()
  users.push(user)
  localStorage.setItem("skillzup_users", JSON.stringify(users))
}

export const getUserByEmail = (email: string): User | null => {
  const users = getUsers()
  return users.find((user) => user.email === email) || null
}

export const updateUser = (userId: string, updates: Partial<User>): User | null => {
  if (typeof window === "undefined") return null

  try {
    const users = getUsers()
    const userIndex = users.findIndex((user) => user.id === userId)

    if (userIndex === -1) return null

    // Validate updates to prevent data corruption
    const validUpdates = Object.keys(updates).reduce(
      (acc, key) => {
        if (updates[key as keyof User] !== undefined && updates[key as keyof User] !== null) {
          acc[key as keyof User] = updates[key as keyof User]
        }
        return acc
      },
      {} as Partial<User>,
    )

    const updatedUser = { ...users[userIndex], ...validUpdates }
    users[userIndex] = updatedUser

    localStorage.setItem("skillzup_users", JSON.stringify(users))
    return updatedUser
  } catch (error) {
    console.error("Error updating user:", error)
    return null
  }
}

// Course management
export const getCourses = (): Course[] => {
  if (typeof window === "undefined") return mockCourses
  const courses = localStorage.getItem("skillzup_courses")
  return courses ? JSON.parse(courses) : mockCourses
}

export const getCourseById = (id: string): Course | null => {
  const courses = getCourses()
  return courses.find((course) => course.id === id) || null
}

export const addCourse = (courseData: Omit<Course, "id" | "createdAt">): Course => {
  if (typeof window === "undefined") throw new Error("Cannot add course on server side")

  const courses = getCourses()
  const newCourse: Course = {
    ...courseData,
    id: `course_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
  }

  courses.push(newCourse)
  localStorage.setItem("skillzup_courses", JSON.stringify(courses))
  return newCourse
}

export const updateCourse = (courseId: string, updates: Partial<Omit<Course, "id" | "createdAt">>): Course | null => {
  if (typeof window === "undefined") return null

  const courses = getCourses()
  const courseIndex = courses.findIndex((course) => course.id === courseId)

  if (courseIndex === -1) return null

  const updatedCourse = { ...courses[courseIndex], ...updates }
  courses[courseIndex] = updatedCourse

  localStorage.setItem("skillzup_courses", JSON.stringify(courses))
  return updatedCourse
}

export const deleteCourse = (courseId: string): boolean => {
  if (typeof window === "undefined") return false

  const courses = getCourses()
  const courseIndex = courses.findIndex((course) => course.id === courseId)

  if (courseIndex === -1) return false

  courses.splice(courseIndex, 1)
  localStorage.setItem("skillzup_courses", JSON.stringify(courses))
  return true
}

// Order management
export const getOrders = (): Order[] => {
  if (typeof window === "undefined") return []
  const orders = localStorage.getItem("skillzup_orders")
  return orders ? JSON.parse(orders) : []
}

export const saveOrder = (order: Order): void => {
  if (typeof window === "undefined") return
  const orders = getOrders()
  orders.push(order)
  localStorage.setItem("skillzup_orders", JSON.stringify(orders))
}

export const getUserOrders = (userId: string): Order[] => {
  const orders = getOrders()
  return orders.filter((order) => order.userId === userId && order.status === "success")
}

export const getAllOrders = (): Order[] => {
  return getOrders()
}

export const updateOrderStatus = (orderId: string, status: "success" | "failed" | "pending"): Order | null => {
  if (typeof window === "undefined") return null

  try {
    const orders = getOrders()
    const orderIndex = orders.findIndex((order) => order.id === orderId)

    if (orderIndex === -1) return null

    // Validate status
    if (!["success", "failed", "pending"].includes(status)) {
      console.error("Invalid order status:", status)
      return null
    }

    const updatedOrder = { ...orders[orderIndex], status }
    orders[orderIndex] = updatedOrder

    localStorage.setItem("skillzup_orders", JSON.stringify(orders))
    return updatedOrder
  } catch (error) {
    console.error("Error updating order status:", error)
    return null
  }
}

// Banner management
export const getBanners = (): Banner[] => {
  if (typeof window === "undefined") return mockBanners
  const banners = localStorage.getItem("skillzup_banners")
  return banners ? JSON.parse(banners) : mockBanners
}

// Admin management
export const getAdmin = (): Admin => {
  if (typeof window === "undefined") return mockAdmin
  const admin = localStorage.getItem("skillzup_admin")
  return admin ? JSON.parse(admin) : mockAdmin
}

// Settings management
export const getSettings = (): Settings => {
  if (typeof window === "undefined") return mockSettings
  const settings = localStorage.getItem("skillzup_settings")
  return settings ? JSON.parse(settings) : mockSettings
}

// Admin settings management
export const saveAdminSettings = (settings: AdminSettings): void => {
  if (typeof window === "undefined") return

  try {
    // Validate required fields
    const requiredFields = ["appName", "upiId", "supportEmail"]
    const isValid = requiredFields.every(
      (field) =>
        settings[field as keyof AdminSettings] && String(settings[field as keyof AdminSettings]).trim().length > 0,
    )

    if (!isValid) {
      console.error("Missing required admin settings fields")
      return
    }

    localStorage.setItem("skillzup_admin_settings", JSON.stringify(settings))
  } catch (error) {
    console.error("Error saving admin settings:", error)
  }
}

export const getAdminSettings = (): AdminSettings => {
  if (typeof window === "undefined") {
    return {
      appName: "SkillzUp",
      appVersion: "1.0.0",
      appLogo: "https://example.com/logo.png",
      upiId: "lakkhikanta.m@ptyes",
      supportEmail: "support@skillzup.com",
      supportPhone: "+1-234-567-8900",
      adminProfilePicture: "",
      instagramLink: "https://instagram.com/yourhandle",
      facebookLink: "https://facebook.com/yourpage",
      telegramLink: "https://t.me/yourchannel",
      youtubeLink: "https://youtube.com/@yourchannel",
    }
  }

  const settings = localStorage.getItem("skillzup_admin_settings")
  if (settings) {
    return JSON.parse(settings)
  }

  // Initialize with default values if not exists
  const defaultSettings: AdminSettings = {
    appName: "SkillzUp",
    appVersion: "1.0.0",
    appLogo: "https://example.com/logo.png",
    upiId: "lakkhikanta.m@ptyes",
    supportEmail: "support@skillzup.com",
    supportPhone: "+1-234-567-8900",
    adminProfilePicture: "",
    instagramLink: "https://instagram.com/yourhandle",
    facebookLink: "https://facebook.com/yourpage",
    telegramLink: "https://t.me/yourchannel",
    youtubeLink: "https://youtube.com/@yourchannel",
  }

  saveAdminSettings(defaultSettings)
  return defaultSettings
}
