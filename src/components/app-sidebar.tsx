
import NavLinkClient from '@/components/module/dashboard/NavLinkClient';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar";
import { commonRoutes, getRoutesByRole } from '@/routes/routes';
import { getUserInfo } from "@/services/auth/getUserInfo";
import Link from "next/link";

export default async function AppSidebar() {
  const user = await getUserInfo();
  if (!user) {
    return null
  }

  const routes = getRoutesByRole(user.role);

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader>
        <div className="p-4 text-2xl font-bold text-blue-700">
          <Link href="/">EMS_HOS</Link>
        </div>
      </SidebarHeader>

      <SidebarContent>


        <div className="flex flex-col  h-full space-y-8">
          <nav className="mt-3 space-y-1">
            {routes.map((item) => (
              <NavLinkClient
                key={item.href}
                href={item.href}
                title={item.title}
                iconName={item.iconName || ''}
              />
            ))}
          </nav>

          <nav className="mt-3 space-y-1">
            {commonRoutes.map((item) => (
              <NavLinkClient
                key={item.href}
                href={item.href}
                title={item.title}
                iconName={item.iconName || ''}
              />
            ))}
          </nav>
        </div>
        <NavUser user={user} />
      </SidebarContent>
    </Sidebar>
  );
}
