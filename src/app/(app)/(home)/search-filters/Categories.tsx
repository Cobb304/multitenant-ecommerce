"use client";

import { useEffect, useRef, useState } from "react";
import { ListFilterIcon } from "lucide-react";

import CategoryDropdown from "./CategoryDropdown";
import { CustomCategory } from "../types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import CategoriesSidebar from "./CategoriesSidebar";

interface Props {
  data: CustomCategory[];
}

export default function Categories({ data }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const viewAllRef = useRef<HTMLDivElement>(null);

  const [visivleCount, serVisibleCount] = useState(data.length);
  const [isAnyHovered, setIsAnyHovered] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const activeCategory = "all";
  const activeCategoryIndex = data.findIndex(
    (category) => category.slug === activeCategory,
  );
  const isActiveCategoryHidden =
    activeCategoryIndex >= visivleCount && activeCategoryIndex !== -1;

  useEffect(() => {
    function calculateVisible() {
      if (!containerRef.current || !measureRef.current || !viewAllRef.current)
        return;

      const containerWidth = containerRef.current.offsetWidth;
      const viewAllWidth = viewAllRef.current.offsetWidth;
      const availableWidth = containerWidth - viewAllWidth;

      const items = Array.from(measureRef.current.children) as HTMLDivElement[];
      let totalWidth = 0;
      let visibleItems = 0;

      for (const item of items) {
        const width = item.getBoundingClientRect().width;

        if (totalWidth + width > availableWidth) break;
        totalWidth += width;
        visibleItems++;
      }

      serVisibleCount(visibleItems);
    }

    const resizeObserver = new ResizeObserver(calculateVisible);
    resizeObserver.observe(containerRef.current!);

    return () => resizeObserver.disconnect();
  }, [data.length]);

  return (
    <div className="relative w-full">
      <CategoriesSidebar isOpen={isSidebarOpen} onOpenChange={setIsSidebarOpen} data={data} />

      <div
        ref={measureRef}
        style={{ position: "fixed", top: -9999, left: -9999 }}
        className="absolute opacity-0 pointer-events-none flex justify-between"
      >
        {data.map((category) => (
          <div key={category.id}>
            <CategoryDropdown
              category={category}
              isActive={activeCategory === category.slug}
              isNavigaitonHovered={false}
            />
          </div>
        ))}
      </div>

      <div
        ref={containerRef}
        onMouseEnter={() => setIsAnyHovered(true)}
        onMouseLeave={() => setIsAnyHovered(false)}
        className="flex flex-nowrap items-center justify-between"
      >
        {data.slice(0, visivleCount).map((category) => (
          <div key={category.id}>
            <CategoryDropdown
              category={category}
              isActive={activeCategory === category.slug}
              isNavigaitonHovered={isAnyHovered}
            />
          </div>
        ))}

        <div ref={viewAllRef} className="shrink-0">
          <Button
            onClick={() => setIsSidebarOpen(true)}
            className={cn(
              "h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white hover:border-primary text-black",
              isActiveCategoryHidden &&
                !isAnyHovered &&
                "bg-white border-primary",
            )}
          >
            View all
            <ListFilterIcon className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
