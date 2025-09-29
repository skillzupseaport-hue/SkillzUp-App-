"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getUserSession } from "@/lib/auth"
import { getCourseById, initializeStorage } from "@/lib/storage"
import type { Course } from "@/lib/types"

export default function PaymentSuccessPage() {
  const [course, setCourse] = useState<Course | null>(null)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const initializePageData = async () => {
      try {
        initializeStorage()

        const currentUser = getUserSession()
        setUser(currentUser)

        if (!currentUser) {
          router.push("/login")
          return
        }

        const courseId = searchParams.get("courseId")
        const orderId = searchParams.get("orderId")

        if (!courseId || !orderId) {
          router.push("/")
          return
        }

        if (courseId === "ALL_COURSES_BUNDLE") {
          setCourse(null) // render bundle UI
        } else {
          const courseData = getCourseById(courseId)
          if (courseData) {
            setCourse(courseData)
          }
        }
      } catch (error) {
        console.error("Error initializing payment success page:", error)
      } finally {
        setLoading(false)
      }
    }

    initializePageData()
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  if (loading || !user) {
    return null
  }

  const status = searchParams.get("status")
  const isPending = status === "pending"

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center space-y-6">
          {/* Success/Pending Icon */}
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto ${
              isPending ? "bg-yellow-100" : "bg-green-100"
            }`}
          >
            <i className={`fas text-3xl ${isPending ? "fa-clock text-yellow-600" : "fa-check text-green-600"}`}></i>
          </div>

          {/* Success/Pending Message */}
          <div className="space-y-2">
            {isPending ? (
              <>
                <h1 className="text-2xl font-bold text-yellow-600">Payment Submitted!</h1>
                <p className="text-muted-foreground">
                  Your UTR has been submitted successfully. {course ? "Course" : "Bundle"} access will be granted after
                  admin approval.
                </p>
                <Badge variant="secondary" className="mt-2">
                  <i className="fas fa-clock mr-1"></i>
                  Pending Approval
                </Badge>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-green-600">Payment Successful!</h1>
                <p className="text-muted-foreground">
                  {course ? "You have successfully purchased the course." : "You have unlocked all courses."}
                </p>
              </>
            )}
          </div>

          {/* Course/Bundle Info */}
          {course ? (
            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-8 rounded overflow-hidden flex-shrink-0">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-sm line-clamp-1">{course.title}</h3>
                  <p className="text-sm text-muted-foreground">{formatPrice(course.price)}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-muted rounded-lg p-4 text-left">
              <h3 className="font-semibold text-sm">All Courses Bundle</h3>
              <p className="text-xs text-muted-foreground">
                Lifetime access to all current courses and this device’s account.
              </p>
            </div>
          )}

          {/* Order Details */}
          <div className="text-sm text-muted-foreground space-y-1">
            <p>Order ID: {searchParams.get("orderId")}</p>
            <p>Payment Date: {new Date().toLocaleDateString()}</p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {isPending ? (
              <>
                <Button onClick={() => router.push("/mycourses")} className="w-full" size="lg">
                  <i className="fas fa-graduation-cap mr-2"></i>
                  Check My Courses
                </Button>
                <Button variant="outline" onClick={() => router.push("/")} className="w-full">
                  <i className="fas fa-home mr-2"></i>
                  Back to Home
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => router.push("/mycourses")} className="w-full" size="lg">
                  <i className="fas fa-layer-group mr-2"></i>
                  View All Courses
                </Button>
                <Button variant="outline" onClick={() => router.push("/")} className="w-full">
                  <i className="fas fa-home mr-2"></i>
                  Back to Home
                </Button>
              </>
            )}
          </div>

          {/* Additional Info */}
          <div className="text-xs text-muted-foreground">
            {isPending ? (
              <p>You will receive a notification once your payment is approved and access is granted.</p>
            ) : (
              <>
                <p>You now have lifetime access to all current courses.</p>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
