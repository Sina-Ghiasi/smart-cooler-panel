"use client";

import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 flex justify-center">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/images/logo.svg"
            alt="Diam tech Logo"
            width={40}
            height={40}
            className="h-10 w-10"
          />

          <span className="font-bold">پنل کولر هوشمند</span>
        </Link>

        <ThemeToggle />
      </div>
    </header>
  );
}
