"use client";

import React from "react";
import Link from "next/link";

import Navbar from "./Navbar";
import MobileNav from "./MobileNav";

import { MdOutlineAccountCircle } from "react-icons/md";
import { navbarLinks } from "@/lib/navbar-links";
import { usePathname } from "next/navigation";

import "../../app/styles/header.styles.css";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="relative flex items-center justify-between w-full h-24 px-8 py-4 border-b shadow-2xl sm:justify-center md:justify-between border-primary/20">
      <MobileNav />
      <Link href="/">
        <h1 className="text-lg font-bold md:text-2xl">
          CraftMy<span className="text-primary">Resume</span>
        </h1>
      </Link>
      <div className="flex items-center justify-center gap-6 mx-auto">
        {navbarLinks.map((link, index) => (
          <Link key={index} href={link.path}>
            <span
              className={`headerLinks ${
                pathname === link.path ? "activeLinks" : ""
              }`}
            >
              {link.name}
            </span>
          </Link>
        ))}
      </div>
      <Navbar />
      <div className="flex md:hidden">
        <Link href="/login">
          <MdOutlineAccountCircle className="cursor-pointer" size={24} />
        </Link>
      </div>
    </header>
  );
};

export default Header;
