"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Tagline */}
        <div>
          <h2 className="text-2xl font-bold">EMS HOS</h2>
          <p className="mt-2 text-sm text-gray-300">
            Your trusted partner in emergency care and wellness.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>
              <Link href="/">
                <span className="hover:text-white">Home</span>
              </Link>
            </li>
            <li>
              <Link href="/services">
                <span className="hover:text-white">Services</span>
              </Link>
            </li>
            <li>
              <Link href="/doctors">
                <span className="hover:text-white">Doctors</span>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <span className="hover:text-white">Contact</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact</h3>
          <p className="text-sm text-gray-300">📍 Rangpur, Bangladesh</p>
          <p className="text-sm text-gray-300">📞 +880 1234 567890</p>
          <p className="text-sm text-gray-300">✉️ info@emshos.com</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <Link href="#">
              <span className="hover:text-blue-400">🌐</span>
            </Link>
            <Link href="#">
              <span className="hover:text-blue-400">📘</span>
            </Link>
            <Link href="#">
              <span className="hover:text-blue-400">🐦</span>
            </Link>
            <Link href="#">
              <span className="hover:text-blue-400">📸</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} EMS HOS. All rights reserved.
      </div>
    </footer>
  );
}
