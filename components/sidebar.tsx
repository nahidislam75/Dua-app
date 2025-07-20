"use client";

import { useEffect, useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronRight,
  CircleArrowRight,
  ArrowRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";

interface SidebarProps {
  selectedCategory: number;
  onCategorySelect: (categoryId: number, categoryName: string) => void;
  onSubcategorySelect: (subcategoryId: number, subcategoryName: string) => void;
  onDuaSelect: (duaId: number) => void;
}

interface Category {
  id: number;
  cat_id: number;
  cat_name_en: string;
  cat_name_bn: string;
  no_of_subcat: number;
  no_of_dua: number;
  cat_icon: string;
}

interface Subcategory {
  id: number;
  cat_id: number;
  subcat_id: number;
  subcat_name_en: string;
  subcat_name_bn: string;
  no_of_dua: number;
}

interface Dua {
  id: number;
  cat_id: number;
  subcat_id: number;
  dua_id: number;
  dua_name_en: string;
  [key: string]: any;
}

export default function Sidebar({
  selectedCategory,
  onCategorySelect,
  onSubcategorySelect,
  onDuaSelect,
}: SidebarProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [duaList, setDuaList] = useState<Dua[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingSubcategories, setLoadingSubcategories] = useState(false);
  const [loadingDuas, setLoadingDuas] = useState(false);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<
    number | null
  >(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const res = await fetch("https://dua-api-jc01.onrender.com/categories");
        const data = await res.json();
        setCategories(data);
        if (data.length > 0) {
          const firstCat = data[0];
          onCategorySelect(firstCat.cat_id, firstCat.cat_name_en);
          fetchSubcategories(firstCat.cat_id);
        }
      } catch (err) {
        console.error("Failed to fetch categories", err);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const fetchSubcategories = async (cat_id: number) => {
    setLoadingSubcategories(true);
    try {
      const res = await fetch(
        `https://dua-api-jc01.onrender.com/subcategories/${cat_id}`
      );
      const data = await res.json();
      setSubcategories(data);
    } catch (err) {
      console.error("Failed to fetch subcategories", err);
      setSubcategories([]);
    } finally {
      setLoadingSubcategories(false);
    }
  };

  const fetchDuas = async (subcat_id: number) => {
    setLoadingDuas(true);
    try {
      const res = await fetch(
        `https://dua-api-jc01.onrender.com/duas/${subcat_id}`
      );
      const data = await res.json();

      if (Array.isArray(data)) {
        const uniqueDuas = data.filter(
          (dua, index, self) =>
            index ===
            self.findIndex(
              (d) => d.dua_id === dua.dua_id && d.subcat_id === dua.subcat_id
            )
        );
        setDuaList(uniqueDuas);
      } else {
        setDuaList([]);
      }
    } catch (err) {
      console.error("Failed to fetch duas", err);
      setDuaList([]);
    } finally {
      setLoadingDuas(false);
    }
  };

  const handleCategoryClick = (category: Category) => {
    onCategorySelect(category.cat_id, category.cat_name_en);
    fetchSubcategories(category.cat_id);
    setSelectedSubcategoryId(null);
  };

  const handleSubcategoryClick = (subcat: Subcategory) => {
    onSubcategorySelect(subcat.subcat_id, subcat.subcat_name_en);
    fetchDuas(subcat.subcat_id);
    setSelectedSubcategoryId(subcat.subcat_id);
  };

  const filteredCategories = categories
    .map((cat) => {
      const matchedSubcats = subcategories
        .filter((sub) => sub.cat_id === cat.cat_id)
        .filter((sub) =>
          sub.subcat_name_en.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchedDuas = duaList
        .filter((dua) => dua.cat_id === cat.cat_id)
        .filter((dua) =>
          dua.dua_name_en.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const isMatch =
        cat.cat_name_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
        matchedSubcats.length > 0 ||
        matchedDuas.length > 0;

      return isMatch ? cat : null;
    })
    .filter(Boolean) as Category[];

  return (
    <div className="w-[340px] bg-white border-r border-[#e9ecef] h-[calc(100vh-64px)] overflow-y-auto flex-shrink-0">
      <div className="p-4 border-b border-[#f1f3f4]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6c757d] h-4 w-4" />
          <Input
            placeholder="Search By Category"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-[#f8f9fa] border-[#dee2e6] rounded-lg h-10 text-[14px] placeholder:text-[#6c757d]"
          />
        </div>
      </div>

      <div className="py-2">
        {loadingCategories ? (
          <div className="px-4 py-6 text-sm text-gray-500">
            Loading categories...
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="px-4 py-6 text-sm text-gray-500">
            No categories found.
          </div>
        ) : (
          filteredCategories.map((category) => (
            <div key={category.id} className="px-3 mb-1">
              <div
                onClick={() => handleCategoryClick(category)}
                className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${
                  selectedCategory === category.cat_id
                    ? "bg-[#e8f5e8] text-[#1fa45b] border-l-4 border-[#1fa45b] ml-0"
                    : "hover:bg-[#f8f9fa] text-[#495057] ml-1"
                }`}
              >
                <div className="flex items-center space-x-3 flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      selectedCategory === category.cat_id
                        ? "bg-[#1fa45b]"
                        : "bg-[#f8f9fa]"
                    }`}
                  >
                    <span
                      className={`text-[16px] ${
                        selectedCategory === category.cat_id
                          ? "text-white"
                          : "text-[#6c757d]"
                      }`}
                    >
                      {category.cat_icon.substring(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-[14px] leading-tight mb-1">
                      {category.cat_name_en}
                    </h3>
                    <p className="text-[12px] text-[#6c757d] leading-tight">
                      {category.no_of_subcat} subcategories |{" "}
                      {category.no_of_dua} Duas
                    </p>
                  </div>
                </div>
                {selectedCategory === category.cat_id ? (
                  <ChevronDown className="h-4 w-4 text-[#1fa45b] ml-2" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-[#6c757d] ml-2" />
                )}
              </div>

              {selectedCategory === category.cat_id && (
                <div className="ml-6 mt-2 space-y-2 border-l-2 border-[#e9ecef] pl-4">
                  {loadingSubcategories ? (
                    <p className="text-sm text-gray-400 py-2">
                      Loading subcategories...
                    </p>
                  ) : subcategories.length === 0 ? (
                    <p className="text-sm text-gray-400 py-2">
                      No subcategories found.
                    </p>
                  ) : (
                    subcategories.map((subcat) => (
                      <div key={subcat.subcat_id}>
                        <div
                          onClick={() => handleSubcategoryClick(subcat)}
                          className="py-1 px-2 rounded cursor-pointer hover:bg-[#f8f9fa] text-[#495057] group flex items-center justify-between"
                        >
                          <ArrowRight className="w-4 h-4 flex-shrink-0 text-[#6c757d]" />
                          <span className="text-[13px] px-2 leading-relaxed group-hover:text-[#1fa45b]">
                            {subcat.subcat_name_en}
                          </span>
                          {subcat.no_of_dua > 0 &&
                            (selectedSubcategoryId === subcat.subcat_id ? (
                              <ChevronDown className="h-3 w-3 text-[#1fa45b] ml-2" />
                            ) : (
                              <ChevronRight className="h-3 w-3 text-[#6c757d] ml-2 group-hover:text-[#1fa45b]" />
                            ))}
                        </div>

                        {selectedSubcategoryId === subcat.subcat_id && (
                          <div className="ml-4 mt-2 space-y-3">
                            {loadingDuas ? (
                              <p className="text-sm text-gray-400">
                                Loading duas...
                              </p>
                            ) : duaList.length === 0 ? (
                              <p className="text-sm text-gray-400">
                                No duas found.
                              </p>
                            ) : (
                              duaList.map((dua) => (
                                <div
                                  key={dua.dua_id}
                                  className="flex items-center"
                                  onClick={async () => {
                                    await onSubcategorySelect(
                                      dua.subcat_id,
                                      subcategories.find(
                                        (s) => s.subcat_id === dua.subcat_id
                                      )?.subcat_name_en || ""
                                    );
                                    setTimeout(() => {
                                      onDuaSelect(dua.dua_id);
                                    }, 200);
                                  }}
                                >
                                  <CircleArrowRight className="w-4 h-4 flex-shrink-0 text-[#6c757d]" />
                                  <div className="ml-4 pl-4 py-1 cursor-pointer hover:bg-[#f8f9fa] group flex-1">
                                    <span className="text-[13px] text-[#495057] group-hover:text-[#1fa45b] leading-relaxed">
                                      {dua.dua_name_en}
                                    </span>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
