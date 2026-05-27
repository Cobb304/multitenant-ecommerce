import Link from "next/link";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

interface NavbarItem {
  href: string;
  children: React.ReactNode;
}

interface Props {
  items: NavbarItem[];
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export default function NavbarSidebar({ items, isOpen, onOpenChange }: Props) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="p-0 transition-non">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="font-bold">Menu</SheetTitle>
        </SheetHeader>

        <ScrollArea className="overflow-y-auto h-full pb-2">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => onOpenChange(false)}
              className="flex flex-col w-full text-left p-4 hover:bg-black hover:text-white items-start text-base font-medium"
            >
              {item.children}
            </Link>
          ))}

          <div className="border-t">
            <Link
              href="/sign-in"
              onClick={() => onOpenChange(false)}
              className="flex flex-col w-full text-left p-4 hover:bg-black hover:text-white items-start text-base font-medium"
            >
              Log in
            </Link>
            <Link
              href="/sign-up"
              onClick={() => onOpenChange(false)}
              className="flex flex-col w-full text-left p-4 hover:bg-black hover:text-white items-start text-base font-medium"
            >
              Start selling
            </Link>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
