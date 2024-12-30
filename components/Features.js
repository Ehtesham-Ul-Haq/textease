import { motion } from "framer-motion";


const features = [
    { title: "Convert to Uppercase", icon: "🔠" },
    { title: "Sentence Case", icon: "📝" },
    { title: "Remove Extra Spaces", icon: "❌" },
    { title: "Text-to-Speech", icon: "🔊" },
  ];
  
  export default function Features() {
    return (
      <div className="py-16 bg-white text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              className="p-6 bg-gray-100 rounded-lg shadow-md"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold">{feature.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }
  