"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  // Function to handle click on nav links
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    if (pathname === "/") {
      e.preventDefault();
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
      // Update URL hash without reloading
      window.history.pushState(null, "", `#${id}`);
    } else {
      // If not on homepage, navigate normally
      // (No need to preventDefault here)
    }
  }

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      {/* Logo */}
      <Link href="/#hero" scroll={false}>
        <Image
          src="/logo-header.png"
          alt="BrightSmile Dental Logo"
          width={160}
          height={40}
          className="cursor-pointer"
        />
      </Link>

      {/* Navigation Links */}
      <div className="space-x-6 text-[#007a87] font-medium text-sm md:text-base">
        <a
          href="/#hero"
          onClick={(e) => handleClick(e, "hero")}
          className="hover:text-[#f58220] transition cursor-pointer"
        >
          Home
        </a>
        <a
          href="/#about"
          onClick={(e) => handleClick(e, "about")}
          className="hover:text-[#f58220] transition cursor-pointer"
        >
          About
        </a>
        <a
          href="/#services"
          onClick={(e) => handleClick(e, "services")}
          className="hover:text-[#f58220] transition cursor-pointer"
        >
          Services
        </a>
        <a
          href="/#contact"
          onClick={(e) => handleClick(e, "contact")}
          className="hover:text-[#f58220] transition cursor-pointer"
        >
          Contact
        </a>
      </div>
    </nav>
  );
}
