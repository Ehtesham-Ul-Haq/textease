import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const FeatureCard = ({ title, icon }) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2, // Trigger animation when 20% of the element is visible
  });

  return (
    <motion.div
      ref={ref}
      initial={{ y: 50, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 1 }}
      whileHover={{ scale: 1.05 }}
      className="p-4 bg-white rounded-lg shadow-md flex items-center gap-4 hover:shadow-lg"
    >
      <div className="text-3xl">{icon}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
    </motion.div>
  );
};

const features = [
  { title: "Convert to Sentence Case", icon: "📝" },
  { title: "Encode to Base64", icon: "🔒" },
  { title: "Extract Numbers", icon: "🔢" },
  { title: "Extract Links", icon: "🔗" },
  { title: "Extract Text", icon: "📋" },
  { title: "Remove Special Characters", icon: "🚫" },
  { title: "Copy Text", icon: "📋" },
  { title: "Paste from Clipboard", icon: "📥" },
  { title: "Reverse Text", icon: "🔄" },
  { title: "Start Listening", icon: "👂" },
  { title: "Undo Action", icon: "↩️" },
  { title: "Redo Action", icon: "↪️" },
  { title: "Convert to Uppercase", icon: "🔠" },
  { title: "Convert to Lowercase", icon: "🔡" },
  { title: "Capitalize First Letter", icon: "🔤" },
  { title: "Clear Text", icon: "❌" },
  { title: "Text-to-Speech", icon: "🔊" },
  { title: "Remove Extra Spaces", icon: "✂️" },
  { title: "Text Translation", icon: "🌍" },
  { title: "Text Summarization", icon: "📖" },
  { title: "Word Count", icon: "📝" },
  { title: "Font Customization", icon: "🖋️" },
  { title: "Text Alignment", icon: "📐" },
  { title: "Text Highlighting", icon: "🔆" },
  { title: "Find and Replace", icon: "🔍" },
  { title: "Spell Check", icon: "✔️" },
  { title: "Text Comparison", icon: "🔎" },
  { title: "Text to QR Code", icon: "📱" },
  { title: "Create Word Cloud", icon: "☁️" },
  { title: "Save Text as File", icon: "💾" },
  { title: "Text Encryption/Decryption", icon: "🔑" },
  { title: "Text to Markdown", icon: "📄" },
  { title: "Character Encoding", icon: "🔠" },
  { title: "Search Text in File", icon: "🔍" },
  { title: "Text to Image", icon: "🖼️" },
  { title: "Link Shortening", icon: "🔗" },
  { title: "Text Formatting", icon: "✍️" },
  { title: "Text Reading Speed Adjuster", icon: "⏩" },
  { title: "Count Syllables", icon: "📊" },
  { title: "Text-to-PDF", icon: "📄" },
  { title: "Grammar Check", icon: "🧹" },
  { title: "Convert Text to Emoji", icon: "😄" },
  { title: "Text to CSV/Excel", icon: "📊" },
  { title: "Remove Empty Lines", icon: "🧹" },
  { title: "Text to LaTeX", icon: "📚" },
  { title: "Highlight Keywords", icon: "🔦" },
  { title: "Text Size Adjuster", icon: "🔍" },
  { title: "Speech-to-Text", icon: "🎙️" },
];

export default function Features() {
  return (
    <div className="py-16 bg-white text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Features</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mx-2">
      {features.map((feature, index) => (
          <FeatureCard key={index} title={feature.title} icon={feature.icon} />
        ))}
      </div>
    </div>
  );
}
