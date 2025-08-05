"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

type Props = {};

const Navbar = (props: Props) => {
  const [visible, setVisible] = useState(false); // State untuk menu mobile
  const [isCollectionMobileOpen, setIsCollectionMobileOpen] = useState(false); // State untuk dropdown Collection di mobile
  const dropdownMobileRef = useRef(null); // Referensi untuk dropdown mobile
  const [isRotatedMobile, setIsRotatedMobile] = useState(false); // State untuk rotasi ikon di mobile
  const [scrolled, setScrolled] = useState(false); // state untuk cek scroll

  // Fungsi untuk menutup dropdown saat klik di luar (desktop)

  // untuk cek scroll pada nav
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        // Jika scroll lebih dari 50px, ubah state menjadi true
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const components: { title: string; href: string; description: string }[] = [
    {
      title: "Alert Dialog",
      href: "/docs/primitives/alert-dialog",
      description:
        "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
      title: "Hover Card",
      href: "/docs/primitives/hover-card",
      description:
        "For sighted users to preview content available behind a link.",
    },
    {
      title: "Progress",
      href: "/docs/primitives/progress",
      description:
        "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
      title: "Scroll-area",
      href: "/docs/primitives/scroll-area",
      description: "Visually or semantically separates content.",
    },
    {
      title: "Tabs",
      href: "/docs/primitives/tabs",
      description:
        "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
      title: "Tooltip",
      href: "/docs/primitives/tooltip",
      description:
        "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
  ];

  return (
    <header
      className={`flex z-30 md:z-50 fixed top-0 items-center justify-between py-5 font-medium w-full left-0 lg:px-24 px-8 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-8" : "bg-transparent"
      }`}
    >
      <Link href="/">
        <h1 className="text-3xl text-gray-500">Bims;</h1>
      </Link>

      {/* Menu Desktop */}
      <NavigationMenu viewport={false} className="hidden md:flex">
        <NavigationMenuList>
          <NavigationMenuLink asChild>
            <Link href="#home">Home</Link>
          </NavigationMenuLink>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Project</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[300px] gap-4">
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="#">
                      <div className="font-medium">Web Developer</div>
                      <div className="text-muted-foreground">
                        Browse all components in the library.
                      </div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="#">
                      <div className="font-medium">Documentation</div>
                      <div className="text-muted-foreground">
                        Learn how to use the library.
                      </div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="#">
                      <div className="font-medium">Blog</div>
                      <div className="text-muted-foreground">
                        Read our latest blog posts.
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Simple</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[200px] gap-4">
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="#">Components</Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="#">Documentation</Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="#">Blocks</Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Tombol Menu Mobile */}
      <div className="flex items-center gap-6">
        {/* <img src={assets.search_icon} className='w-5 cursor-pointer' alt="" /> */}
        <Image
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt=""
        />
      </div>

      {/* Sidebar Menu Mobile */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-500 overflow-hidden ease-in ${
          visible ? "h-full" : "h-0"
        }`}
      >
        <div className="flex flex-col text-gray-600 ">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <Image
              src={assets.dropdown_icon}
              className="h-4 rotate-180"
              alt=""
            />
            <p className="hover:underline">Back</p>
          </div>
          <Link
            className="py-2 px-6 border-b"
            onClick={() => setVisible(false)}
            href="/"
          >
            Home
          </Link>

          {/* Dropdown Collection di Mobile */}
          <div className="relative" ref={dropdownMobileRef}>
            <div
              onClick={() => {
                setIsCollectionMobileOpen(!isCollectionMobileOpen);
                setIsRotatedMobile(!isRotatedMobile); // Toggle rotasi ikon
              }}
              className="flex items-center justify-between py-2 px-6 border-b cursor-pointer"
            >
              <p>Collection</p>
              <Image
                src={assets.arrow_drop_down}
                alt="Dropdown Arrow"
                className={`w-5 transition-transform duration-300 ${
                  isRotatedMobile ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>
            {/* Dropdown Menu Mobile */}
            {isCollectionMobileOpen && (
              <div className="transition-all duration-300">
                <Link
                  href="/#skills" // ID section tujuan
                  className="block pl-8 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setIsCollectionMobileOpen(false);
                    setIsRotatedMobile(false); // Reset rotasi ikon
                    setVisible(false); // Tutup sidebar mobile
                  }}
                >
                  Skills
                </Link>
                <Link
                  href="/#project"
                  className="block pl-8 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setIsCollectionMobileOpen(false);
                    setIsRotatedMobile(false); // Reset rotasi ikon
                    setVisible(false); // Tutup sidebar mobile
                  }}
                >
                  Projects
                </Link>
                {/* <NavLink
                                    to="/collection/certificates"
                                    className="block pl-8 py-2 text-gray-700 hover:bg-gray-100"
                                    onClick={() => {
                                        setIsCollectionMobileOpen(false);
                                        setIsRotatedMobile(false); // Reset rotasi ikon
                                        setVisible(false); // Tutup sidebar mobile
                                    }}
                                >
                                    Certificates
                                </NavLink> */}
              </div>
            )}
          </div>

          <Link
            className="py-2 px-6 border-b"
            onClick={() => setVisible(false)}
            href="/about"
          >
            About
          </Link>
          <Link
            className="py-2 px-6 border-b"
            onClick={() => setVisible(false)}
            href="/contact"
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
