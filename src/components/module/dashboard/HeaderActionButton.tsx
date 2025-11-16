"use client";

import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
export default function HeaderActionButton({
  Icon,
  label,
  onClick,
  href,
}: {
  Icon?: LucideIcon;
  label: string;
  onClick?: () => void;
  href?: string;
}) {
  const content = (
    <>
      {Icon && <Icon size={18} />}
      {label}
    </>
  );

  if (href) {
    return (
      <Button asChild>
        <Link href={href}>{content}</Link>
      </Button>
    );
  }

  return (
    <Button onClick={onClick} variant="default">
      {content}
    </Button>
  );
}
