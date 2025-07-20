"use client"

import { useState } from "react"
import { Home, Settings, Grid3X3, Bookmark, Book, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LeftNavigation() {
  const [activeItem, setActiveItem] = useState("categories")

  const navigationItems = [
    {
      id: "home",
      icon: Home,
      label: "Home",
    },
    {
      id: "categories",
      icon: Grid3X3,
      label: "All Duas",
    },
    {
      id: "memorize",
      icon: Book,
      label: "Memorize",
    },
    {
      id: "bookmark",
      icon: Bookmark,
      label: "Bookmark",
    },
    {
      id: "ruqyah",
      icon: Settings,
      label: "Ruqyah",
    },
  ]

  return (
    <div className="w-[80px] bg-[#e8f5e8] h-[calc(100vh-64px)] flex flex-col items-center py-6 border-r border-[#d4e6d4]">
      {/* Logo/App Icon */}
      <div className="mb-8">
        <div className="w-12 h-12 bg-[#1fa45b] rounded-xl flex items-center justify-center shadow-sm">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 2C12 2 8 6 8 12C8 16 10 18 12 18C14 18 16 16 16 12C16 6 12 2 12 2Z"
              fill="white"
              opacity="0.9"
            />
            <path
              d="M12 18C12 18 8 22 8 22C8 22 12 20 12 18ZM12 18C12 18 16 22 16 22C16 22 12 20 12 18Z"
              fill="white"
              opacity="0.7"
            />
          </svg>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 flex flex-col space-y-4">
        {navigationItems.map((item) => {
          const IconComponent = item.icon
          const isActive = activeItem === item.id

          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              onClick={() => setActiveItem(item.id)}
              className={`w-12 h-12 p-0 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-[#1fa45b] text-white shadow-md hover:bg-[#1a8f4f]"
                  : "text-[#6c757d] hover:bg-[#d4e6d4] hover:text-[#1fa45b]"
              }`}
              title={item.label}
            >
              <IconComponent className="h-5 w-5" />
            </Button>
          )
        })}
      </div>

      {/* Menu Button at Bottom */}
      <div className="mt-auto">
        <Button
          variant="ghost"
          size="sm"
          className="w-12 h-12 p-0 rounded-xl text-[#6c757d] hover:bg-[#d4e6d4] hover:text-[#1fa45b] transition-all duration-200"
          title="Menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
