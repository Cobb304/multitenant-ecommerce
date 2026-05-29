"use client";

import { useRef, useState } from "react";
import { Category } from "@/payload-types";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import SubcategoryMenu from "./SubcategoryMenu";
import useDropdownPosition from "./useDropdownPosition";


interface Props {
  category: Category;
  isActive?: boolean;
  isNavigaitonHovered?: boolean;
}

export default function CategoryDropdown({
  category,
  isActive,
  isNavigaitonHovered,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { getDropdownPosition } = useDropdownPosition(dropdownRef);
  const dropdownPosition = getDropdownPosition();

  function handleOnMouseEnter() {
    if (category.subcategories) setIsOpen(true);
  }
  function handleOnMouseLeave() {
    setIsOpen(false);
  }

  return (
    <div
      ref={dropdownRef}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      className="relative"
    >
      <div className="relative">
        <Button
          variant="elevated"
          className={cn(
            "h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white hover:border-primary text-black",
            isActive && !isNavigaitonHovered && "bg-white border-primary",
          )}
        >
          {category.name}
        </Button>
        {category.subcategories && category.subcategories.length > 0 && (
          <div
            className={cn(
              "opacity-0 absolute -button-3 w-0 h-0 border-l-10 border-r-10 border-b-10 border-l-transparent border-r-transparent border-b-black left-1/2 -translate-x-1/2",
              isOpen && "opacity-100",
            )}
          />
        )}
      </div>
      <SubcategoryMenu
        category={category}
        isOpen={isOpen}
        position={dropdownPosition}
      />
    </div>
  );
}
