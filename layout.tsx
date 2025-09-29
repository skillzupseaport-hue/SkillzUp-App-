"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { getAdminSession } from "@/lib/auth"
import { initializeStorage } from "@/lib/storage"

function AdminAuthWrapper({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    initializeStorage()

    // Skip auth check for login page
    if (pathname === "/admin/login") {
      setIsAuthenticated(true)
      return
    }

    const adminSession = getAdminSession()
    if (!adminSession) {
      router.replace("/admin/login")
      setIsAuthenticated(false)
    } else {
      setIsAuthenticated(true)
    }
  }, [router, pathname])

  // Show loading while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Verifying admin access...</p>
        </div>
      </div>
    )
  }

  // Don't render children if not authenticated (except for login page)
  if (!isAuthenticated && pathname !== "/admin/login") {
    return null
  }

  return <>{children}</>
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="admin-layout">
      <AdminAuthWrapper>{children}</AdminAuthWrapper>
    </div>
  )
}
