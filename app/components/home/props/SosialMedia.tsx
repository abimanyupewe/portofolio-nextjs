import React from 'react'
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa"; // Import ikon dari react-icons
import { AiFillTikTok } from "react-icons/ai";
import { TbBrandDribbbleFilled } from "react-icons/tb";

const SosialMedia = () => {
    return (
        <div className="mt-8 flex justify-center gap-6 w-full">
            <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-violet-500 transition-all duration-300"
            >
                <FaGithub size={24} />
            </a>
            <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-violet-500 transition-all duration-300"
            >
                <TbBrandDribbbleFilled size={24} />
            </a>
            <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-violet-500 transition-all duration-300"
            >
                <FaLinkedin size={24} />
            </a>
            <a
                href="https://instagram.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-violet-500 transition-all duration-300"
            >
                <FaInstagram size={24} />
            </a>
            <a
                href="https://instagram.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-violet-500 transition-all duration-300"
            >
                <AiFillTikTok size={24} />
            </a>
        </div>
    )
}

export default SosialMedia
