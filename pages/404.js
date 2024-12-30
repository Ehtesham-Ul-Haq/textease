import { motion } from "framer-motion"; // For animations

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-lime-400 via-black to-pink-600 text-white">
      <div className="text-center space-y-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="text-9xl font-extrabold"
        >
          404
        </motion.div>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-2xl font-semibold"
        >
          Oops! Page Not Found
        </motion.h2>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-lg"
        >
          It seems the page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you
          back on track!
        </motion.p>
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          onClick={() => window.location.href = "/"}
          className="mt-6 px-8 py-3 bg-white text-yellow-600 font-bold rounded-full text-lg shadow-lg hover:bg-yellow-400 hover:text-black transition duration-300"
        >
          Go Home
        </motion.button>
      </div>
    </div>
  );
};

export default NotFound;
