"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  let path = "";

  return (
    <nav className="text-sm text-muted-foreground">
      <ol className="flex items-center gap-2">


        {segments.map((segment, i) => {
          path += `/${segment}`;
          const label = segment.charAt(0).toUpperCase() + segment.slice(1);

          return (
            <li key={i} className="flex items-center gap-2">
              <span>/</span>
              <Link href={path} className="hover:underline">
                {label}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
