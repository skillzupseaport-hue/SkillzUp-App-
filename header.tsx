"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getUserSession } from "@/lib/auth"
import { Sidebar } from "./sidebar"

export function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const user = getUserSession()

  return (
    <header className="sticky top-0 z-50 bg-primary/95 text-primary-foreground rounded-b-3xl backdrop-blur supports-[backdrop-filter]:bg-primary/90">
      <div className="flex h-12 items-center justify-between px-4">
        {/* Left: Menu Icon */}
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/80">
              <i className="fas fa-bars text-lg"></i>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-80">
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </SheetContent>
        </Sheet>

        {/* Center: App Name */}
        <h1 className="text-xl font-bold">SkillzUp</h1>

        {/* Right: Profile Icon */}
        <Avatar className="h-8 w-8">
          <AvatarImage src={user?.profilePicture || "/professional-profile-picture-of-a-person.jpg"} alt="Profile" />
          <AvatarFallback className="bg-primary-foreground text-primary text-sm">
            {user ? user.name.charAt(0).toUpperCase() : "U"}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
