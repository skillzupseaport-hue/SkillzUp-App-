import { getUserByEmail, getAdmin, saveUser } from "./storage"

export interface AuthUser {
  id: string
  name: string
  email: string
  phone: string
  profilePicture?: string
}

export interface AuthAdmin {
  id: string
  username: string
}

export const loginUser = (email: string, password: string): AuthUser | null => {
  try {
    if (!email || !password) {
      console.warn("Missing email or password")
      return null
    }

    const user = getUserByEmail(email.trim().toLowerCase())
    if (user && user.password === password.trim()) {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        profilePicture: user.profilePicture,
      }
    }
    return null
  } catch (error) {
    console.error("Error during user login:", error)
    return null
  }
}

export const loginAdmin = (username: string, password: string): AuthAdmin | null => {
  try {
    if (!username || !password) {
      console.warn("Missing username or password")
      return null
    }

    const admin = getAdmin()
    const inputUser = username.trim().toLowerCase()
    const inputPass = password.trim()

    if (
      admin &&
      admin.username &&
      admin.password &&
      admin.username.toLowerCase() === inputUser &&
      admin.password === inputPass
    ) {
      return {
        id: admin.id,
        username: admin.username,
      }
    }
    return null
  } catch (error) {
    console.error("Error during admin login:", error)
    return null
  }
}

export const setUserSession = (user: AuthUser): void => {
  if (typeof window === "undefined") return
  try {
    if (!user || !user.id || !user.email || !user.name) {
      console.error("Invalid user data for session")
      return
    }
    localStorage.setItem("skillzup_user_session", JSON.stringify(user))
  } catch (error) {
    console.error("Failed to set user session:", error)
  }
}

export const setAdminSession = (admin: AuthAdmin): void => {
  if (typeof window === "undefined") return
  try {
    if (!admin || !admin.id || !admin.username) {
      console.error("Invalid admin data for session")
      return
    }
    localStorage.setItem("skillzup_admin_session", JSON.stringify(admin))
  } catch (error) {
    console.error("Failed to set admin session:", error)
  }
}

export const getUserSession = (): AuthUser | null => {
  if (typeof window === "undefined") return null
  try {
    const session = localStorage.getItem("skillzup_user_session")
    if (!session) return null

    const parsed = JSON.parse(session)
    // Enhanced validation
    if (
      parsed &&
      typeof parsed.id === "string" &&
      typeof parsed.email === "string" &&
      typeof parsed.name === "string" &&
      parsed.id.length > 0 &&
      parsed.email.includes("@") &&
      parsed.name.length > 0
    ) {
      return parsed
    }

    // Clear invalid session
    localStorage.removeItem("skillzup_user_session")
    return null
  } catch (error) {
    console.error("Error retrieving user session:", error)
    localStorage.removeItem("skillzup_user_session")
    return null
  }
}

export const getAdminSession = (): AuthAdmin | null => {
  if (typeof window === "undefined") return null
  try {
    const session = localStorage.getItem("skillzup_admin_session")
    if (!session) return null

    const parsed = JSON.parse(session)
    // Enhanced validation for admin session
    if (
      parsed &&
      typeof parsed.id === "string" &&
      typeof parsed.username === "string" &&
      parsed.id.length > 0 &&
      parsed.username.length > 0
    ) {
      return parsed
    }

    localStorage.removeItem("skillzup_admin_session")
    return null
  } catch (error) {
    console.error("Error retrieving admin session:", error)
    localStorage.removeItem("skillzup_admin_session")
    return null
  }
}

export const clearUserSession = (): void => {
  if (typeof window === "undefined") return
  try {
    localStorage.removeItem("skillzup_user_session")
  } catch (error) {
    console.error("Error clearing user session:", error)
  }
}

export const clearAdminSession = (): void => {
  if (typeof window === "undefined") return
  try {
    localStorage.removeItem("skillzup_admin_session")
  } catch (error) {
    console.error("Error clearing admin session:", error)
  }
}

export const isValidUserSession = (): boolean => {
  const user = getUserSession()
  return user !== null
}

export const isValidAdminSession = (): boolean => {
  const admin = getAdminSession()
  return admin !== null
}

// Re-export saveUser for convenience
export { saveUser }
