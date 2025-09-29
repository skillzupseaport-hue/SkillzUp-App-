"use client"

import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function BottomNav() {
  const router = useRouter()
  const pathname = usePathname()

  const navItems = [
    { icon: "fas fa-home", label: "Home", path: "/" },
    { icon: "fas fa-graduation-cap", label: "My Courses", path: "/mycourses" },
    { icon: "fas fa-question-circle", label: "Help", path: "/help" },
    { icon: "fas fa-user", label: "Profile", path: "/profile" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-primary/95 rounded-t-3xl backdrop-blur supports-[backdrop-filter]:bg-primary/90">
      <div className="flex items-center justify-around py-2 px-3 gap-1.5">
        {navItems.map((item) => (
          <div key={item.path} className="relative flex-1 flex justify-center">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "flex flex-col items-center gap-1 text-primary-foreground h-auto py-1.5 px-3 rounded-xl hover:bg-primary-foreground/10 transition-colors",
                pathname === item.path && "bg-primary-foreground/10",
              )}
              aria-current={pathname === item.path ? "page" : undefined}
              onClick={() => router.push(item.path)}
            >
              <i className={`${item.icon} text-base`}></i>
              <span className={cn("text-xs", pathname === item.path && "font-medium")}>{item.label}</span>
            </Button>
          </div>
        ))}
      </div>
    </nav>
  )
}
