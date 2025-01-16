import WSEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      setStatus("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    // Mock API request (replace with real API endpoint)
    setTimeout(() => {
      setIsSubmitting(false);
      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    }, 2000);
  };

  return (
    <>
      <WSEOHead
        title="Contact Us"
        description="Get in touch with TextEase for support, feedback, or inquiries. We're here to assist you with our advanced text tools."
        keywords="contact TextEase, support, feedback, text tool inquiries"
        url="https://texteaseutils.vercel.app/contact"
      />
      <div className="min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-7xl mx-auto px-6 py-16"
        >
          {/* Heading */}
          <div className="text-center">
            <h1 className="text-5xl font-extrabold text-gray-800 dark:text-gray-100">
              Contact Us
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">
              We&lsquo;d love to hear from you! Reach out to us anytime.
            </p>
          </div>

          {/* Content */}
          <div className="mt-12 flex flex-col lg:flex-row justify-between items-start gap-12">
            {/* Contact Form */}
            <motion.form
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              onSubmit={handleSubmit}
              className="w-full lg:w-1/2 bg-gray-100 p-8 rounded-lg shadow-lg"
            >
              {["name", "email", "message"].map((field) => (
                <div key={field} className="mb-4">
                  <label
                    htmlFor={field}
                    className="block text-gray-700 font-medium"
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    placeholder={`Enter your ${field}`}
                    className="mt-1 w-full text-gray-700 p-3 border rounded-md focus:ring-2 focus:ring-pink-500 outline-none"
                  />
                </div>
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 text-white rounded-md transition-all ${isSubmitting
                    ? "bg-gray-500"
                    : "bg-pink-500 hover:bg-pink-600 focus:ring-2 focus:ring-pink-300"
                  }`}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </motion.button>
              {status && (
                <p
                  className={`mt-4 text-center ${status.includes("success")
                      ? "text-green-500"
                      : "text-red-500"
                    }`}
                >
                  {status}
                </p>
              )}
            </motion.form>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="lg:w-1/2 space-y-8"
            >
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                  Visit Us
                </h2>
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                  Lahore, Pakistan
                </p>
                <iframe
                  className="w-full h-64 rounded-lg mt-4"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.128457988119!2d144.96332801553907!3d-37.81410794202198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218cce60!2sMelbourne%20CBD!5e0!3m2!1sen!2sau!4v1630949132724!5m2!1sen!2sau"
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                  Connect With Us
                </h2>
                <div className="flex items-center space-x-6 mt-4">
                  {[
                    { icon: <FaFacebook />, link: "https://facebook.com" },
                    { icon: <FaTwitter />, link: "https://twitter.com" },
                    { icon: <FaInstagram />, link: "https://instagram.com" },
                    { icon: <FaLinkedin />, link: "https://linkedin.com" },
                  ].map(({ icon, link }, idx) => (
                    <motion.a
                      key={idx}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      className="text-pink-500 text-2xl hover:text-pink-600 transition"
                    >
                      {icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Contact;
