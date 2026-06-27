"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone, Calendar, LogIn } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/about", label: "عن المركز" },
  { href: "/services", label: "الخدمات" },
  { href: "/testimonials", label: "قصص النجاح" },
  { href: "/contact", label: "التواصل" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg order-1"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1 order-2 md:order-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#0F4C81] hover:bg-gray-50 rounded-lg transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3 order-3 md:order-3">
            <Link
              href="/admin/login"
              className="flex items-center gap-1.5 text-gray-500 hover:text-[#0F4C81] text-sm font-medium transition-colors"
            >
              <LogIn className="w-4 h-4" />
              تسجيل دخول
            </Link>
            <a
              href="https://wa.me/972568507260"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-green-600 hover:text-green-700 text-sm font-medium transition-colors"
            >
              <Phone className="w-4 h-4" />
              واتساب
            </a>
            <Link
              href="/booking"
              className="bg-[#0F4C81] hover:bg-[#1565C0] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-blue-900/20 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              احجز موعدك
            </Link>
          </div>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 order-4 md:order-1 flex-row-reverse md:flex-row">
            <Image src="/logo-icon.svg" alt="D.F.C Logo" width={44} height={44} className="rounded-lg" />
            <div className="flex flex-col">
              <span className="text-xl font-extrabold text-[#0F4C81] leading-none">D.F.C</span>
              <span className="text-[10px] text-gray-500 leading-none mt-0.5">Diabetic Foot Care</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#0F4C81] rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 flex flex-col gap-2">
              <Link
                href="/booking"
                className="bg-[#0F4C81] text-center text-white px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <Calendar className="w-4 h-4" />
                احجز موعدك الآن
              </Link>
              <a
                href="https://wa.me/972568507260"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-50 text-center text-green-700 px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                تواصل عبر واتساب
              </a>
              <Link
                href="/admin/login"
                className="bg-gray-50 text-center text-gray-600 px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <LogIn className="w-4 h-4" />
                تسجيل دخول
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
