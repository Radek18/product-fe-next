"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideNav() {
  const pathname = usePathname();

  const links = [
    { name: "Domů", href: "/" },
    { name: "Produkty", href: "/products" },
    { name: "Přidat produkt", href: "/products/create" },
  ];

  return (
    <nav className="w-52 border-r-2 p-5">
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <Link
            className={`cursor-pointer px-2 py-3 transition-all duration-300 ${pathname === link.href ? "bg-slate-100" : ""} hover:bg-slate-100`}
            key={link.name}
            href={link.href}
          >
            <p>{link.name}</p>
          </Link>
        ))}
      </ul>
    </nav>
  );
}
