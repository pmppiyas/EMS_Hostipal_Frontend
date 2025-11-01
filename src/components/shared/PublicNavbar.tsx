"use client";
import { Button } from '@/components/ui/button';
import Link from "next/link";
import { useState } from 'react';

export default function PublicNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = <>
    <Link href="/" className="block hover:text-blue-600 text-center" onClick={() => setIsOpen(false)}>Home</Link>
    <Link href="/dashboard" className="block hover:text-blue-600 text-center" onClick={() => setIsOpen(false)}>Dashboard</Link>
    <a href="#services" className="block hover:text-blue-600 text-center" onClick={() => setIsOpen(false)}>Consultation</a>
    <a href="#contact" className="block hover:text-blue-600 text-center" onClick={() => setIsOpen(false)}>Diogonostics</a>
    <a href="#doctors" className="block hover:text-blue-600 text-center" onClick={() => setIsOpen(false)}>Health Plans</a>
  </>

  return (
    <nav className="sticky  top-0 z-50 bg-white shadow-md px-6 py-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-700">EMS HOS</div>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <Button onClick={() => setIsOpen(!isOpen)} variant={"outline"} >
            ☰
          </Button>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
          {navLinks}
        </div>

        {/* Button */}
        <div className="hidden md:block space-x-4 ">
          <Button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Book Appointment
          </Button>
          <Button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition" asChild>
            <Link href="/login" >      Login</Link>
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-4 text-gray-700 font-medium">
          {navLinks}

          <Button className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Book Appointment
          </Button>

          <Button className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition" asChild>
            <Link href="/login" onClick={() => setIsOpen(false)}>      Login</Link>
          </Button>
        </div>
      )}
    </nav>
  );
}