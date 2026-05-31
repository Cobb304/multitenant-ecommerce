import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import {Sheet, SheetContent, SheetHeader, SheetTitle,} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CustomCategory } from "../types";
import { Button } from "@/components/ui/button";

interface Props {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  data: CustomCategory[];
}

export default function CategoriesSidebar({
  isOpen,
  onOpenChange,
  data,
}: Props) {
  const router = useRouter();
  const [parentCategories, setParentCategories] = useState<CustomCategory[] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CustomCategory | null>(null);

  const currentCategories = parentCategories ?? data ?? [];

  function handleOpenChange(open: boolean) {
    setSelectedCategory(null);
    setParentCategories(null);
    onOpenChange(open);
  }

  function handleCategoryClick(category: CustomCategory) {
    if (category.subcategories && category.subcategories.length > 0) {
      setParentCategories(category.subcategories as CustomCategory[]);
      setSelectedCategory(category);
    } else {
      if (parentCategories && selectedCategory) router.push(`/${selectedCategory.slug}/${category.slug}`);
      else {
        if (category.slug === "all") router.push(`/`);
        else router.push(`/${category.slug}`);
      }

      handleOpenChange(false);
    }
  }

  function handleBackClick() {
    if (parentCategories) {
      setParentCategories(null);
      setSelectedCategory(null);
    }
  }

  const backgroundColor = selectedCategory?.color || "white";

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetContent
        side="left"
        style={{ background: backgroundColor }}
        className="p-0 transition-none"
      >
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="font-bold">Categories</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-auto h-full pb-2">
          {parentCategories && (
            <Button onClick={handleBackClick} className="w-full p-4 border-none rounded-none bg-inherit text-black hover:bg-black hover:text-white flex items-center justify-start text-base font-medium">
              <ChevronLeftIcon className="size-4 mr-2" />
              Back
            </Button>
          )}
          {currentCategories.map(category => (
            <Button key={category.id} onClick={() => handleCategoryClick(category)} className="w-full p-4 border-none rounded-none bg-inherit text-black hover:bg-black hover:text-white flex items-center justify-between text-base font-medium">
              {category.name}
              {category.subcategories && category.subcategories.length > 0 && (
                <ChevronRightIcon className="size-4" />
              )}
            </Button>
          ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
