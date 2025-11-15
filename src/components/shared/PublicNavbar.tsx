"use client";

import ThemeToggle from '@/components/module/dashboard/ThemeToggle';
import { Button } from '@/components/ui/button';
import { logout } from '@/services/auth/louout';
import { getCookie } from '@/utils/tokenHandlers';
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import toast from "react-hot-toast";

export default function PublicNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getCookie("accessToken");
      setIsAuthenticated(!!token);
    };
    checkAuth();
  }, [pathname]);

  const handleLogout = async () => {
    try {
      const res = await logout();
      if (res.success) {
        toast.success(res.message);
        setIsAuthenticated(false);
        router.push("/");
      } else toast.error(res.message);
    } catch {
      toast.error("Logout failed");
    }
  };

  const navLinks = (
    <>
      <Link href="/" className="block hover:text-primary text-center">Home</Link>
      <Link href="/dashboard" className="block hover:text-primary text-center">Dashboard</Link>
      <a href="#services" className="block hover:text-primary text-center">Consultation</a>
      <a href="#contact" className="block hover:text-primary text-center">Diagnostics</a>
      <a href="#doctors" className="block hover:text-primary text-center">Health Plans</a>
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-background text-foreground border-b border-border px-6 py-4 shadow-sm">
      <div className="flex justify-between items-center">

        <div className="text-2xl font-bold text-primary">EMS HOS</div>

        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <Button variant="outline" onClick={() => setIsOpen(!isOpen)}>☰</Button>
        </div>

        <div className="hidden md:flex space-x-6 font-medium">
          {navLinks}
        </div>

        <div className="hidden md:flex items-center space-x-4">

          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 transition">
            Book Appointment
          </Button>

          {!isAuthenticated ? (
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/login">Login</Link>
            </Button>
          ) : (
            <Button
              onClick={handleLogout}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Logout
            </Button>
          )}

          <ThemeToggle />
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-4 space-y-4 font-medium">
          {navLinks}

          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            Book Appointment
          </Button>

          {!isAuthenticated ? (
            <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/login">Login</Link>
            </Button>
          ) : (
            <Button
              onClick={handleLogout}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Logout
            </Button>
          )}
        </div>
      )}
    </nav>
  );
}
