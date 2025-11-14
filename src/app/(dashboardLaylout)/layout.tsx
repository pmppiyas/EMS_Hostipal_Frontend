import AppSidebar from '@/components/app-sidebar';
import SiteHeader from '@/components/site-header';
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "250px",
          "--header-height": "64px",
        } as React.CSSProperties
      }
    >
      <AppSidebar />

      <SidebarInset>
        <SiteHeader />
        <main className="p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
