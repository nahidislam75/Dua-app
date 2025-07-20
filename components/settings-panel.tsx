"use client"

import { ChevronRight, Globe, Type, Eye, Palette, ChevronDown } from "lucide-react"

interface SettingsPanelProps {
  onClose: () => void
}

export default function SettingsPanel({ onClose }: SettingsPanelProps) {
  return (
    <div className="w-[320px] bg-white border-l border-[#e9ecef] h-[calc(100vh-64px)] overflow-y-auto">
      {/* Language Settings Header */}
      <div className="p-4 border-b border-[#f1f3f4] flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-[#e8f5e8] rounded-full flex items-center justify-center">
            <Globe className="h-4 w-4 text-[#1fa45b]" />
          </div>
          <span className="font-medium text-[#495057] text-[15px]">Language Settings</span>
        </div>
        <ChevronDown className="h-4 w-4 text-[#6c757d]" />
      </div>

      <div className="p-4 space-y-6">
        {/* Selected Language */}
        <div>
          <div className="mb-3">
            <span className="text-[13px] font-medium text-[#6c757d]">Selected Language</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-[#f8f9fa] rounded-lg cursor-pointer hover:bg-[#e9ecef] transition-colors">
            <span className="text-[#495057] font-medium text-[14px]">English</span>
            <ChevronRight className="h-4 w-4 text-[#6c757d]" />
          </div>
        </div>

        {/* Font Setting */}
        <div>
          <div className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#e8f5e8] rounded-full flex items-center justify-center">
                <Type className="h-4 w-4 text-[#1fa45b]" />
              </div>
              <span className="font-medium text-[#495057] text-[15px]">Font Setting</span>
            </div>
            <ChevronDown className="h-4 w-4 text-[#6c757d]" />
          </div>
        </div>

        {/* View Setting */}
        <div>
          <div className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#e8f5e8] rounded-full flex items-center justify-center">
                <Eye className="h-4 w-4 text-[#1fa45b]" />
              </div>
              <span className="font-medium text-[#495057] text-[15px]">View Setting</span>
            </div>
            <ChevronDown className="h-4 w-4 text-[#6c757d]" />
          </div>
        </div>

        {/* Appearance Settings */}
        <div>
          <div className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#e8f5e8] rounded-full flex items-center justify-center">
                <Palette className="h-4 w-4 text-[#1fa45b]" />
              </div>
              <span className="font-medium text-[#495057] text-[15px]">Appearance Settings</span>
            </div>
            <ChevronDown className="h-4 w-4 text-[#6c757d]" />
          </div>
        </div>
      </div>
    </div>
  )
}
