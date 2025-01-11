import Link from "next/link";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { FaArrowDown, FaPhoneAlt, FaShareAlt } from "react-icons/fa";
import ThemeSwitcher from "./ThemeSwitcher";
import { FaArrowDown19 } from "react-icons/fa6";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUtilsOpen, setIsUtilsOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="w-full border-b shadow-sm">
      {/* Top Navbar */}
      <div className="flex items-center justify-between px-6 py-4">
        {/* Brand */}
        <div>
          <Link href="/">
            <h1 className="text-4xl font-extrabold font-serif bg-gradient-to-r from-pink-500 via-red-500 to-purple-500 text-transparent bg-clip-text drop-shadow-md">
              Text<span className="italic">Ease</span>
            </h1>
          </Link>
        </div>

        {/* Links and Buttons for Medium and Large Screens */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Utils Dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => setIsUtilsOpen(true)}
            onMouseLeave={() => setIsUtilsOpen(false)}
          >
            <span className="text-lg font-semibold cursor-pointer group-hover:text-pink-600">
              Utils
            </span>
            {isUtilsOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-12 left-0 bg-white dark:bg-[#0a0a0a] shadow-lg rounded-md w-72 z-50 p-4"
              >
                {[
                  { href: "/utils/textutils", label: "TextUtils" },
                  { href: "/utils/textcomparison", label: "Compare Text" },
                  { href: "/utils/qrcodegenerator", label: "Generate QRCode" },
                  { href: "/utils/wordcloud", label: "Word Cloud" },
                  { href: "/utils/encryptdecrypt", label: "Encrypt & Decrypt" },
                  { href: "/utils/markdown", label: "Markdown" },
                  { href: "/utils/JSONMaker", label: "JSON Maker" },
                  { href: "/utils/htmltoimage", label: "Html to Image" },
                  { href: "/utils/texttoemoji", label: "Text to Emoji" },
                ].map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="block px-3 py-2 rounded-md hover:bg-pink-600 hover:text-white transition"
                  >
                    <li>{label}</li>
                  </Link>
                ))}
              </motion.ul>
            )}
          </div>

          {/* Other Links */}
          {[
            { href: "/utils/imagetotext", label: "Image to Text" },
            { href: "/utils/urlshortener", label: "URL Shortener" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-lg font-semibold hover:text-pink-600 transition"
            >
              <li className="list-none">{label}</li>
            </Link>
          ))}

          {/* Buttons for Big Screens */}
          <div className="flex space-x-4">
            <button className="flex items-center px-4 py-2 text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 rounded-lg shadow hover:shadow-lg transition">
              <FaPhoneAlt className="mr-2" /> Contact Us
            </button>
            <button className="flex items-center px-4 py-2 text-white bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600 rounded-lg shadow hover:shadow-lg transition">
              <FaShareAlt className="mr-2" /> Share
            </button>
           <ThemeSwitcher />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="block md:hidden text-2xl"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          className="absolute top-0 left-0 w-3/4 h-screen bg-white shadow-lg p-6 z-50 md:hidden"
        >
          <div className="mb-4">
          <Link href="/">
            <h1 className="text-4xl font-extrabold font-serif bg-gradient-to-r from-pink-500 via-red-500 to-purple-500 text-transparent bg-clip-text drop-shadow-md">
              Text<span className="italic">Ease</span>
            </h1>
          </Link>
        </div>
          <ul className="space-y-6">
            {/* Utils for Mobile */}
            <div>
              <div
                className="text-lg text-gray-950 hover:text-pink-600 cursor-pointer flex items-center"
                onClick={() => setIsUtilsOpen(!isUtilsOpen)}
              >
                Utils <span><FaArrowDown19 /></span>
              </div>
              {isUtilsOpen && (
                <motion.ul
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2 pl-4 space-y-2"
                >
                  {[
                    { href: "/utils/textutils", label: "TextUtils" },
                    { href: "/utils/textcomparison", label: "Compare Text" },
                    { href: "/utils/qrcodegenerator", label: "Generate QRCode" },
                    { href: "/utils/wordcloud", label: "Word Cloud" },
                    { href: "/utils/encryptdecrypt", label: "Encrypt & Decrypt" },
                    { href: "/utils/markdown", label: "Markdown" },
                    { href: "/utils/JSONMaker", label: "JSON Maker" },
                    { href: "/utils/htmltoimage", label: "Html to Image" },
                    { href: "/utils/texttoemoji", label: "Text to Emoji" },
                  ].map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      className="block px-2 py-1 rounded-md hover:text-pink-600 text-gray-950 transition"
                    >
                      <li>{label}</li>
                    </Link>
                  ))}
                </motion.ul>
              )}
            </div>

            {/* Other Links for Mobile */}
            {[
              { href: "/utils/imagetotext", label: "Image to Text" },
              { href: "/utils/urlshortener", label: "URL Shortener" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-lg text-gray-950 hover:text-pink-600 transition"
              >
                <li>{label}</li>
              </Link>
            ))}

            {/* Buttons for Mobile */}
            <div className="flex flex-col space-y-4 mt-4">
              <button className="flex items-center justify-center px-4 py-2 text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 rounded-lg shadow hover:shadow-lg transition">
                <FaPhoneAlt className="mr-2" /> Contact Us
              </button>
              <button className="flex items-center justify-center px-4 py-2 text-white bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600 rounded-lg shadow hover:shadow-lg transition">
                <FaShareAlt className="mr-2" /> Share
              </button>
              <ThemeSwitcher />
            </div>
          </ul>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
