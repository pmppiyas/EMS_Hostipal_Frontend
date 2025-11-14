"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconBell } from "@tabler/icons-react";

export default function NotificationsDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative p-2 hover:bg-accent rounded-md">
        <IconBell size={22} />
        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500"></span>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuItem>No new notifications</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
