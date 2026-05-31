"use client";

import { useState } from "react";
import { ListFilterIcon, SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { CustomCategory } from "../types";
import CategoriesSidebar from "./CategoriesSidebar";
import { Button } from "@/components/ui/button";

interface Props {
  isDisabled?: boolean;
  data: CustomCategory[];
}

export default function SearchInput({ isDisabled, data }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex items-center gap-2 w-full">
      <CategoriesSidebar data={data} isOpen={isSidebarOpen} onOpenChange={setIsSidebarOpen} />

      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
        <Input className="pl-8" placeholder="Search product" disabled={isDisabled} />
      </div>

      <Button variant="elevated" onClick={() => setIsSidebarOpen(true)} className="size-12 shrink-0 flex lg:hidden">
        <ListFilterIcon />
      </Button>
    </div>
  );
}
