"use client";

import React, { useState } from "react";

import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosClose } from "react-icons/io";

const MobileNav = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const handleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const closeMobileNav = () => {
    setIsMobileNavOpen(false);
  };

  return (
    <div className="md:hidden">
      <RxHamburgerMenu
        className="flex cursor-pointer"
        size={24}
        onClick={handleMobileNav}
      />
      {isMobileNavOpen && (
        <div className="fixed top-0 left-0 z-10 w-full h-full bg-white">
          <IoIosClose
            onClick={closeMobileNav}
            size={30}
            className="absolute top-0 mt-4 cursor-pointer right-4"
          />
        </div>
      )}
    </div>
  );
};

export default MobileNav;
