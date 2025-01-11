import { motion } from "framer-motion";
import Link from "next/link";
import Typewriter from "./TypeWriter";

export default function Hero() {
  
  return (
    <div className="bg-gray-950  text-white text-center py-20">
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-5xl font-bold"
      >
        Welcome to <span className="text-yellow-400">TextEase</span>
      </motion.h1>
      <motion.p
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="mt-4"
        style={{ minHeight: "2emm" }}
      >
        <Typewriter text="Transform your text in seconds. Simplify, Beautify, and Optimize." />
      </motion.p>
      <Link href={"/utils/textutils"}>
        <motion.button
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          className="mt-8 bg-yellow-400 text-black px-6 py-3 rounded-lg shadow-lg"
        >
          Get Started
        </motion.button>
      </Link>
    </div>
  );
}
