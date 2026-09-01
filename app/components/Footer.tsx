import Link from "next/link";
import React from "react";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="w-full bg-white dark:bg-black border-t border-gray-100 dark:border-neutral-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8">

          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="#home" className="inline-block">
              <h1 className="text-2xl font-heading font-bold text-black dark:text-white">
                Abimanyu<span className="text-gray-400">.</span>
              </h1>
            </Link>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed max-w-xs">
              Crafting digital experiences with passion and precision. Building the web, one pixel at a time.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <SocialLink href="https://github.com/abimanyupewe" icon={<Github size={20} />} label="GitHub" />
              <SocialLink href="https://www.linkedin.com/in/abimanyu-priyo-widagdo-101a46279/" icon={<Linkedin size={20} />} label="LinkedIn" />
              <SocialLink href="https://www.instagram.com/hoohbim_" icon={<Instagram size={20} />} label="Instagram" />
              <SocialLink href="mailto:abimanyupw369@gmail.com" icon={<Mail size={20} />} label="Email" />
            </div>
          </div>

          {/* Navigation Column */}
          <div className="md:pl-10">
            <h3 className="text-sm font-semibold text-black dark:text-white uppercase tracking-wider mb-4">
              Navigation
            </h3>
            <ul className="space-y-3">
              <FooterLink href="#home">Home</FooterLink>
              <FooterLink href="#about">About</FooterLink>
              <FooterLink href="#project">Projects</FooterLink>
              <FooterLink href="#experience">Experience</FooterLink>
            </ul>
          </div>

          {/* Contact / Info Column */}
          <div>
            <h3 className="text-sm font-semibold text-black dark:text-white uppercase tracking-wider mb-4">
              Get in Touch
            </h3>
            <ul className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400">
              <li className="flex items-start gap-3">
                <span className="font-medium text-black dark:text-white">Email:</span>
                <a href="mailto:abimanyupw369@gmail.com" className="hover:text-black dark:hover:text-white transition-colors">
                  abimanyupw369@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-medium text-black dark:text-white">Location:</span>
                <span>Indonesia</span>
              </li>
              <li className="mt-4">
                <p className="text-xs text-neutral-500">
                  Open for freelance opportunities and collaborations.
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 dark:border-neutral-900 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-neutral-500 dark:text-neutral-500 text-center md:text-left">
            &copy; {new Date().getFullYear()} Abimanyu. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-neutral-500 dark:text-neutral-500">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Helper Components for cleaner code
const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <Link
      href={href}
      className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors duration-200"
    >
      {children}
    </Link>
  </li>
);

const SocialLink = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
  <a
    href={href}
    aria-label={label}
    target="_blank"
    rel="noopener noreferrer"
    className="text-neutral-400 hover:text-black dark:hover:text-white transition-colors duration-200 transform hover:scale-110"
  >
    {icon}
  </a>
);

export default Footer;
