"use client"

import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  onSettingsToggle: () => void
}

export default function Header({ onSettingsToggle }: HeaderProps) {
  return (
    <header className="bg-[#1fa45b] text-white px-6 py-3 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center shadow-sm">
            <div className="w-8 h-8 bg-[#1fa45b] rounded-lg flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="white" />
                <path
                  d="M12 16L13.09 22.26L20 23L13.09 23.74L12 30L10.91 23.74L4 23L10.91 22.26L12 16Z"
                  fill="white"
                  opacity="0.6"
                />
              </svg>
            </div>
          </div>
          <div>
            <h1 className="text-[19px] font-semibold leading-tight">Dua & Ruqyah</h1>
            <p className="text-[13px] text-green-100 leading-tight">Hanafi Muslim</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" className="text-white hover:bg-green-600 p-2 rounded-lg">
            <Search className="h-[18px] w-[18px]" />
          </Button>

          <Button
            onClick={onSettingsToggle}
            className="bg-[#28a745] hover:bg-[#218838] text-white px-4 py-2 rounded-lg font-medium text-[14px] h-9"
          >
            Support Us →
          </Button>
        </div>
      </div>
    </header>
  )
}
