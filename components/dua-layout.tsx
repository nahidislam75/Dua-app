"use client";

import { useState } from "react";
import Header from "./header";
import LeftNavigation from "./left-navigation";
import Sidebar from "./sidebar";
import MainContent from "./main-content";
import SettingsPanel from "./settings-panel";

export default function DuaLayout() {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [selectedSubcategory, setSelectedSubcategory] = useState<number | null>(
    null
  );
  const [selectedDuaId, setSelectedDuaId] = useState<number | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(true);

  const [categoryName, setCategoryName] = useState("");
  const [subcategoryName, setSubcategoryName] = useState("");

  const handleCategorySelect = (id: number, name: string) => {
    setSelectedCategory(id);
    setCategoryName(name);
    setSelectedSubcategory(null);
    setSubcategoryName("");
    setSelectedDuaId(null);
  };

  const handleSubcategorySelect = (id: number, name: string) => {
    setSelectedSubcategory(id);
    setSubcategoryName(name);
    setSelectedDuaId(null);
  };

  const handleDuaSelect = (duaId: number) => {
    setSelectedDuaId(duaId);
  };

  return (
    <div className="min-h-screen bg-[#f7f9f8]">
      <Header onSettingsToggle={() => setIsSettingsOpen(!isSettingsOpen)} />

      <div className="flex">
        <LeftNavigation />

        <Sidebar
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
          onSubcategorySelect={handleSubcategorySelect}
          onDuaSelect={handleDuaSelect}
        />

        <MainContent
          categoryId={selectedCategory}
          subcategoryId={selectedSubcategory}
          selectedDuaId={selectedDuaId}
          categoryName={categoryName}
          subcategoryName={subcategoryName}
        />

        {isSettingsOpen && (
          <SettingsPanel onClose={() => setIsSettingsOpen(false)} />
        )}
      </div>
    </div>
  );
}
