"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "./mode-toggle";
import { Menu, X } from "lucide-react";

type Props = {};

const Navbar = (props: Props) => {
  const [visible, setVisible] = useState(false); // State untuk menu mobile
  const [scrolled, setScrolled] = useState(false); // state untuk cek scroll

  // untuk cek scroll pada nav
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
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

  return (
    <header
      className={`flex z-30 md:z-50 fixed top-0 items-center justify-between py-5 font-medium w-full left-0 lg:px-24 px-8 transition-all duration-300 ${scrolled ? "bg-white dark:bg-zinc-900/80 dark:backdrop-blur-md shadow-md py-8" : "bg-transparent"
        }`}
    >
      <Link href="/">
        <h1 className="text-3xl text-emerald-500 font-bold">hi</h1>
      </Link>

      {/* Menu Desktop */}
      <NavigationMenu viewport={false} className="hidden md:flex">
        <NavigationMenuList>
          {/* SOCIALS */}
          <NavigationMenuItem>
            <Link
              href="https://www.linkedin.com/in/abimanyu-priyo-widagdo-101a46279/"
              target="_blank"
              className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:text-black dark:hover:text-white text-gray-500 dark:text-gray-400 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
            >
              LinkedIn
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              href="https://www.instagram.com/hoohbim_"
              target="_blank"
              className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:text-black dark:hover:text-white text-gray-500 dark:text-gray-400 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
            >
              Instagram
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              href="https://www.tiktok.com/@bim.dxd"
              target="_blank"
              className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:text-black dark:hover:text-white text-gray-500 dark:text-gray-400 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
            >
              TikTok
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              href="https://github.com/abimanyupewe"
              target="_blank"
              className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:text-black dark:hover:text-white text-gray-500 dark:text-gray-400 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
            >
              Github
            </Link>
          </NavigationMenuItem>

        </NavigationMenuList>
      </NavigationMenu>

      {/* Tombol Menu Mobile */}
      <div className="flex items-center gap-4">
        <ModeToggle />
        <Menu
          onClick={() => setVisible(true)}
          className="w-5 cursor-pointer md:hidden"
        />
      </div>

      {/* Sidebar Menu Mobile */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 bg-white dark:bg-zinc-900 transition-all duration-500 overflow-hidden ease-in ${visible ? "h-screen" : "h-0"
          }`}
      >
        {/* Close Button */}
        <div className="absolute top-6 right-8 z-50">
          <X
            className="w-8 h-8 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white cursor-pointer transition-colors"
            onClick={() => setVisible(false)}
          />
        </div>

        <div className="flex flex-col p-8 md:p-12 space-y-6 pt-24 h-full overflow-y-auto">

          <Link
            className="text-2xl font-semibold text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            onClick={() => setVisible(false)}
            href="/"
          >
            Home
          </Link>
          <Link
            className="text-2xl font-semibold text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            onClick={() => setVisible(false)}
            href="/#project"
          >
            Projects
          </Link>
          <Link
            className="text-2xl font-semibold text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            onClick={() => setVisible(false)}
            href="/#skills"
          >
            Tech Stack
          </Link>
          <Link
            className="text-2xl font-semibold text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            onClick={() => setVisible(false)}
            href="/about"
          >
            About
          </Link>

          <div className="mt-8 pt-8 border-t border-gray-100 dark:border-zinc-800">
            <p className="mb-6 text-sm font-semibold text-gray-400 uppercase tracking-wider">Socials</p>
            <div className="flex flex-col space-y-4">
              <Link href="https://www.linkedin.com/in/abimanyu-priyo-widagdo-101a46279/" target="_blank" className="text-xl font-medium text-gray-500 hover:text-blue-600 transition-colors">LinkedIn</Link>
              <Link href="https://www.instagram.com/hoohbim_" target="_blank" className="text-xl font-medium text-gray-500 hover:text-pink-600 transition-colors">Instagram</Link>
              <Link href="https://www.tiktok.com/@abimanyupriyowidagdo?is_from_webapp=1&sender_device=pc" target="_blank" className="text-xl font-medium text-gray-500 hover:text-black dark:hover:text-white transition-colors">TikTok</Link>
              <Link href="https://github.com/abimanyupewe" target="_blank" className="text-xl font-medium text-gray-500 hover:text-black dark:hover:text-white transition-colors">Github</Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
