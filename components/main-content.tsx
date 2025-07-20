"use client";

import { useEffect, useState, useRef } from "react";
import {
  Home,
  ChevronRight,
  Bookmark,
  Copy,
  Share2,
  MoreHorizontal,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface MainContentProps {
  categoryId: number;
  subcategoryId: number | null;
  selectedDuaId: number | null;
  categoryName?: string;
  subcategoryName?: string;
}

interface Dua {
  id: number;
  cat_id: number;
  subcat_id: number;
  dua_id: number;
  dua_name_en: string;
  dua_arabic: string;
  transliteration_en: string;
  translation_en: string;
  refference_en: string;
  top_en: string;
  bottom_en: string;
}

export default function MainContent({
  categoryId,
  subcategoryId,
  selectedDuaId,
  categoryName,
  subcategoryName,
}: MainContentProps) {
  const [duas, setDuas] = useState<Dua[]>([]);
  const [loading, setLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchDuas = async () => {
      setLoading(true);
      try {
        const url = subcategoryId
          ? `https://dua-api-jc01.onrender.com/duas/${subcategoryId}`
          : `https://dua-api-jc01.onrender.com/displaydua/${categoryId}`;
        const res = await fetch(url);
        const data = await res.json();

        if (Array.isArray(data)) {
          const uniqueDuas = data.filter(
            (dua, index, self) =>
              index ===
              self.findIndex(
                (d) => d.dua_id === dua.dua_id && d.subcat_id === dua.subcat_id
              )
          );
          setDuas(uniqueDuas);
        } else {
          setDuas([]);
        }
      } catch (err) {
        console.error("Failed to fetch duas:", err);
        setDuas([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDuas();
  }, [categoryId, subcategoryId]);

  useEffect(() => {
    if (selectedDuaId !== null) {
      setTimeout(() => {
        const el = document.getElementById(`dua-${selectedDuaId}`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, [selectedDuaId, duas]);

  const handleCopyDua = (dua: Dua) => {
    const text = `${dua.dua_arabic}\n\n${dua.transliteration_en}\n\n${dua.translation_en}`;
    navigator.clipboard.writeText(text);
  };

  const handleShareDua = (dua: Dua) => {
    if (navigator.share) {
      navigator.share({
        title: dua.dua_name_en,
        text: `${dua.dua_arabic}\n\n${dua.translation_en}`,
      });
    }
  };

  if (loading) {
    return (
      <div
        ref={containerRef}
        className="flex-1 bg-white flex items-center justify-center text-gray-500"
      >
        Loading...
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="flex-1 bg-white px-8 py-6 overflow-y-auto max-h-[calc(100vh-64px)]"
    >
      <div className="bg-gray-50 p-5">
        <div className="flex items-center space-x-2 text-[14px]">
          <Home className="h-4 w-4 text-[#1fa45b]" />
          <span className="text-[#1fa45b] font-medium">Home</span>
          <ChevronRight className="h-3 w-3 text-[#6c757d]" />
          <span className="text-[#1fa45b] font-medium">Categorys of Dua</span>
          <ChevronRight className="h-3 w-3 text-[#6c757d]" />
          {categoryName && (
            <>
              <span className="text-[#1fa45b] font-medium">{categoryName}</span>
              <ChevronRight className="h-3 w-3 text-[#6c757d]" />
            </>
          )}
          {subcategoryId !== null && subcategoryName ? (
            <span className="text-[#6c757d]">{subcategoryName}</span>
          ) : (
            <span className="text-[#6c757d]">Duas</span>
          )}
        </div>
        <div className="border-t pt-2 mt-1 text-[#1fa45b] ">
          <span className="text-2xl">Category:</span>
          {categoryName}
        </div>
      </div>

      {duas.length === 0 ? (
        <div className="text-center text-gray-500 text-sm py-10">
          No duas found.
        </div>
      ) : (
        <div className="space-y-10">
          {subcategoryId !== null && subcategoryName ? (
            <div className=" p-3  text-[#1fa45b] bg-gray-50 ">
              <span className="text-2xl">Section:</span>
              {subcategoryName}
            </div>
          ) : (
            <div></div>
          )}
          {duas.map((dua) => (
            <div
              key={dua.id}
              id={`dua-${dua.dua_id}`}
              className={`relative rounded-lg p-4 ${
                dua.dua_id === selectedDuaId ? "pt-[80px]" : ""
              }`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start space-x-4">
                  <Target />
                  <div className="flex-1">
                    <h2 className="text-[18px] font-medium text-[#17a2b8] mb-3 leading-relaxed">
                      {dua.dua_id}. {dua.dua_name_en}
                    </h2>
                    <p className="text-[15px] text-[#495057] leading-relaxed">
                      {dua.top_en}
                    </p>
                  </div>
                </div>
              </div>

              <div className="ml-14 space-y-6 text-[#495057] leading-relaxed text-[15px]">
                {dua.bottom_en}
              </div>

              <div className="my-8">
                <p
                  className="text-[32px] leading-[2.2] text-right font-arabic text-[#212529]"
                  dir="rtl"
                >
                  {dua.dua_arabic}
                </p>
              </div>

              <div className="text-[#6c757d] italic text-[15px] leading-relaxed">
                {dua.transliteration_en}
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-[#495057] text-[15px]">
                  Translation
                </h4>
                <p className="text-[#495057] leading-relaxed text-[15px]">
                  {dua.translation_en}
                </p>
              </div>

              <div className="pt-4 border-t border-[#e9ecef]">
                <div className="flex justify-between">
                  <div className="text-[14px]">
                    <span className="font-medium text-[#6c757d]">
                      Reference
                    </span>
                    <p className="text-[#1fa45b] font-medium mt-1">
                      {dua.refference_en}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1 ml-4 mt-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-2 hover:bg-[#f8f9fa] rounded-lg"
                    >
                      <Bookmark className="h-4 w-4 text-[#6c757d]" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-2 hover:bg-[#f8f9fa] rounded-lg"
                      onClick={() => handleCopyDua(dua)}
                    >
                      <Copy className="h-4 w-4 text-[#6c757d]" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-2 hover:bg-[#f8f9fa] rounded-lg"
                      onClick={() => handleShareDua(dua)}
                    >
                      <Share2 className="h-4 w-4 text-[#6c757d]" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-2 hover:bg-[#f8f9fa] rounded-lg"
                    >
                      <MoreHorizontal className="h-4 w-4 text-[#6c757d]" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
