import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

import { NavbarAuth } from "./navbar-auth";

export function Navbar() {
  return (
    <header className="p-2 rounded shadow-sm sticky top-0">
      <nav className="flex items-center justify-between container mx-auto max-w-7xl px-4 sm:px-6">
        <Link href="/" className="font-extrabold">
          Posti
        </Link>
        <Input placeholder="Search..." className="w-80" />
        <ul className="flex items-center gap-4">
          <NavbarAuth />
        </ul>
      </nav>
    </header>
  );
}
