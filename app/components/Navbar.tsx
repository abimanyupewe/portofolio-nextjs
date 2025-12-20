"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
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
import { ModeToggle } from "./mode-toggle";

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
        scrolled ? "bg-white dark:bg-zinc-900/80 dark:backdrop-blur-md shadow-md py-8" : "bg-transparent"
      }`}
    >
      <Link href="/">
        <h1 className="text-3xl text-gray-500">Bims;</h1>
      </Link>

      {/* Menu Desktop */}
      <NavigationMenu viewport={false} className="hidden md:flex">
        <NavigationMenuList>
          {/* 1. HOME */}
          <NavigationMenuLink asChild>
            <Link
              href="/"
              className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white dark:bg-zinc-900 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-gray-100 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50"
            >
              Home
            </Link>
          </NavigationMenuLink>

          {/* 2. PROJECT (Dropdown) */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent">
              Project
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[300px] gap-4 p-4 md:w-[400px] md:grid-cols-2 lg:w-[500px]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-purple-500/10 to-purple-500/20 dark:from-purple-900/20 dark:to-purple-900/40 p-6 no-underline outline-none focus:shadow-md"
                      href="/#project"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium text-purple-600 dark:text-purple-400">
                        Featured Projects
                      </div>
                      <p className="text-sm leading-tight text-gray-600 dark:text-gray-300">
                        Explore my latest work in web and app development.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/#project"
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 dark:hover:bg-zinc-800"
                    >
                      <div className="text-sm font-medium leading-none">
                        All Projects
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
                        Browse the complete portfolio
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                   <NavigationMenuLink asChild>
                    <Link
                      href="/#skills"
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 dark:hover:bg-zinc-800"
                    >
                      <div className="text-sm font-medium leading-none">
                        Tech Stack
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
                         Skills & Technologies
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* 3. ABOUT (Dropdown) */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent">
              About
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-500/10 to-blue-500/20 dark:from-blue-900/20 dark:to-blue-900/40 p-6 no-underline outline-none focus:shadow-md"
                      href="/about"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium text-blue-600 dark:text-blue-400">
                         Profile
                      </div>
                      <p className="text-sm leading-tight text-gray-600 dark:text-gray-300">
                        Get to know me, my background, and what I do.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                        href="/#experience"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 dark:hover:bg-zinc-800"
                    >
                        <div className="text-sm font-medium leading-none">Experience</div>
                        <p className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
                            My professional journey
                        </p>
                    </Link>
                  </NavigationMenuLink>
                 </li>
                 <li>
                   <NavigationMenuLink asChild>
                    <Link
                        href="/#certificates"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 dark:hover:bg-zinc-800"
                    >
                        <div className="text-sm font-medium leading-none">Certificates</div>
                        <p className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
                            Credentials & Achievements
                        </p>
                    </Link>
                   </NavigationMenuLink>
                 </li>
                 <li>
                   <NavigationMenuLink asChild>
                    <Link
                        href="/contact"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 dark:hover:bg-zinc-800"
                    >
                        <div className="text-sm font-medium leading-none">Contact</div>
                        <p className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
                            Let's get in touch
                        </p>
                    </Link>
                   </NavigationMenuLink>
                 </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

        </NavigationMenuList>
      </NavigationMenu>

      {/* Tombol Menu Mobile */}
      <div className="flex items-center gap-4">
        <ModeToggle />
        {/* <img src="/icons/search_icon.png" className='w-5 cursor-pointer' alt="" /> */}
        <Image
          onClick={() => setVisible(true)}
          src="/icons/menu_icon.png"
          width={20}
          height={20}
          className="w-5 cursor-pointer md:hidden"
          alt=""
        />
      </div>

      {/* Sidebar Menu Mobile */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 bg-white dark:bg-zinc-900 transition-all duration-500 overflow-hidden ease-in ${
          visible ? "h-full" : "h-0"
        }`}
      >
        <div className="flex flex-col text-gray-600 dark:text-gray-300 p-6">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg mb-4"
          >
            <Image
              src="/icons/dropdown_icon.png"
              width={16}
              height={16}
              className="h-4 w-auto rotate-180" // w-auto needed for retain aspect ratio if only height specified? better specify both
              alt=""
            />
            <p className="hover:underline">Back</p>
          </div>
          <Link
            className="py-3 px-6 border-b border-gray-100 dark:border-zinc-800 hover:text-blue-500"
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
                src="/icons/arrow_drop_down.png"
                width={20}
                height={20}
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
                  className="block pl-8 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800"
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
                  className="block pl-8 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800"
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
