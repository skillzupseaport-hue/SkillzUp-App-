import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { getUserSession } from "./auth"
import { getCourses as getCoursesFromStorage, getUserOrders } from "./storage"
import type { Order } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getCurrentUser = () => {
  return getUserSession()
}

export const getCourses = getCoursesFromStorage

export const ALL_COURSES_BUNDLE_ID = "ALL_COURSES_BUNDLE"

export const getBundleInfo = () => {
  const courses = getCoursesFromStorage()
  const totalMrp = courses.reduce((sum, c) => sum + (c.mrp || 0), 0)
  const totalPrice = courses.reduce((sum, c) => sum + (c.price || 0), 0)
  // Optional extra discount on top of sum of course prices
  const bundlePrice = Math.max(0, Math.round(totalPrice * 0.9)) // 10% off of summed sale prices
  return {
    id: ALL_COURSES_BUNDLE_ID,
    title: "All Courses Bundle",
    totalCourses: courses.length,
    totalVideos: courses.reduce((sum, c) => sum + c.chapters.reduce((t, ch) => t + ch.videos.length, 0), 0),
    mrp: totalMrp,
    price: bundlePrice,
    courses,
  }
}

export const getPurchases = (): Order[] => {
  const currentUser = getCurrentUser()
  if (!currentUser) {
    return []
  }
  const base = getUserOrders(currentUser.id)

  // If user bought the bundle, create virtual per-course purchases for access checks
  const hasBundle = base.some((o) => o.courseId === ALL_COURSES_BUNDLE_ID && o.status === "success")
  if (!hasBundle) return base

  const allCourses = getCoursesFromStorage()
  const bundleOrder = base
    .filter((o) => o.courseId === ALL_COURSES_BUNDLE_ID && o.status === "success")
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]

  const virtuals: Order[] = allCourses.map((c) => ({
    id: `virtual_${bundleOrder.id}_${c.id}`,
    userId: bundleOrder.userId,
    courseId: c.id,
    amount: 0,
    status: "success",
    createdAt: bundleOrder.createdAt,
  }))

  // Return both original and virtual (ensure uniqueness by courseId + id)
  const combined = [...base, ...virtuals]
  const seen = new Set<string>()
  return combined.filter((o) => {
    const key = `${o.id}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}
