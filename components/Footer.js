import Link from "next/link";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaWhatsapp,
} from "react-icons/fa";
import { FaSquareXTwitter, FaUpwork } from "react-icons/fa6";
import { TbBrandFiverr } from "react-icons/tb";
import Typewriter from "./TypeWriter";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Load subscription state from localStorage on initial render
  useEffect(() => {
    const isSubscribed = localStorage.getItem("isSubscribed") === "true";
    setSubscribed(isSubscribed);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribed(true);
    localStorage.setItem("isSubscribed", "true");
    setEmail("");
  };

  return (
    <footer className="bg-gray-950 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Subscribe Section */}
        <div className="space-y-4">
          <div className="mb-12 space-y-2">
            <Link href={"/"}>
              <h1 className="text-3xl font-extrabold font-serif bg-gradient-to-r from-lime-500 via-lime-300 to-lime-500 text-transparent bg-clip-text animate-pulse drop-shadow-md">
                Text<span className="italic">Ease</span>
              </h1>
            </Link>{" "}
            <div style={{ minHeight: "3em" }}>
              <Typewriter text="Transform your text in seconds. Simplify, Beautify, and Optimize." />
            </div>
          </div>

          {subscribed ? (
            <motion.div
              className="text-lg font-semibold text-green-400"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              You are subscribed to the <strong>TextEase</strong> newsletter!
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubscribe}
              className="flex flex-col"
              initial={{ opacity: 1, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -200 }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <h3 className="text-2xl font-bold">Subscribe to our Newsletter</h3>
              </div>
              <div className="flex space-x-2">

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="p-2 rounded-md text-black w-full"
                />
                <motion.button
                  type="submit"
                  className="text-white bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-md text-sm px-6 py-2 text-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Subscribe
                </motion.button>
              </div>
            </motion.form>
          )}
        </div>

        {/* Social Links Section */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-center">Follow Us</h3>
          <div className="flex space-x-6 justify-center">
            <motion.a
              href="https://www.facebook.com/ehteshamulhaq.bajwa?follow=true"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <FaFacebook size={30} />
            </motion.a>
            <motion.a
              href="https://x.com/i/intent/follow?screen_name=ihtisha72987404"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <FaSquareXTwitter size={30} />
            </motion.a>
            <motion.a
              href="https://www.instagram.com/ehtesham28223"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <FaInstagram size={30} />
            </motion.a>
            <motion.a
  href="https://whatsapp.com/channel/0029Vb3iHqNIiRowcwKViZ1F" 
  target="_blank"
              rel="noopener noreferrer"
              className="text-green-500"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <FaWhatsapp size={30} />
            </motion.a>
          </div>
          <div className="flex space-x-6 justify-center">
            <motion.a
                href="https://www.linkedin.com/in/ahtsham-ul-haq-aa86a91b8/" 

              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <FaLinkedin size={30} />
            </motion.a>
            <motion.a
              href="https://www.upwork.com/freelancers/~016a4a38fdfa758cd7?mp_source=share"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-100"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <FaUpwork size={30} />
            </motion.a>
            <motion.a
              href="https://www.fiverr.com/ihtishambajwa?public_mode=true"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <TbBrandFiverr size={30} />
            </motion.a>
            <motion.a
              href="https://github.com/Ehtesham-Ul-Haq"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <FaGithub size={30} />
            </motion.a>
          </div>
        </div>

        {/* About Section */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">Need Web Development Services?</h3>
          <p className="text-gray-400">
            We specialize in building custom websites to help your business grow
            online. Let&#39;s work together to create something amazing!
          </p>
          <p className="text-sm text-gray-400">
            &copy; 2024 TextEase. All Rights Reserved.
          </p>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-400">
        <p className="inline-flex">
          Crafted with ❤️ by{" "}
          <a
            href="https://github.com/Ehtesham-Ul-Haq"
            target="_blank"
            className="flex items-center"
          >
            <FaGithub className="mx-1" />{" "}
            <span className="hover:text-lime-500">Ehtesham Ul Haq</span>
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
