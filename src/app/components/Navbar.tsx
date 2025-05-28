"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

export default function Navbar() {
  const pathname = usePathname();

  // Smooth scroll on homepage
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    if (pathname === "/") {
      e.preventDefault();
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", `#${id}`);
      }
    }
    // Otherwise, normal navigation handled by Link
  }

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      {/* Logo */}
      <Link href="/#hero" scroll={false} className="cursor-pointer">
        <Image
          src="/logo-header.png"
          alt="BrightSmile Dental Logo"
          width={160}
          height={40}
          priority
        />
      </Link>

      {/* Navigation Links */}
      <div className="space-x-6 text-[#007a87] font-medium text-sm md:text-base">
        {navItems.map(({ id, label }) => (
          <Link
            href={`/#${id}`}
            key={id}
            scroll={false}
            onClick={(e) => handleClick(e, id)}
            className="hover:text-[#f58220] transition cursor-pointer"
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
