import React from "react";
import Link from "next/link";

import { Button } from "../ui/button";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-center space-x-6">
      <div className="hidden md:flex">
        <Link href="/login">
          <Button variant="link" className="text-lg">
            Login
          </Button>
        </Link>
        <Link href="/resume-builder">
          <Button variant="custom-outline">Build Your Resume</Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
