
import Breadcrumbs from '@/components/module/dashboard/Breadcrumbs';
import NotificationsDropdown from '@/components/module/dashboard/NotificationsDropdown';
import ThemeToggle from '@/components/module/dashboard/ThemeToggle';
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";


export default function SiteHeader() {
  return (
    <header className="flex items-center h-[--header-height] border-b p-4 gap-2">
      <SidebarTrigger className="-ml-1" />

      <Separator orientation="vertical" className="mx-2 hidden md:block" />

      <Breadcrumbs />

      <div className="ml-auto flex items-center gap-3">
        <NotificationsDropdown />
        <ThemeToggle />
      </div>
    </header>
  );
}
