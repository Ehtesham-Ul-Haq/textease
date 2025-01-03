import Link from "next/link";
import { useState } from "react";
import AnimatedText from "./AnimatedText";

export default function Demo() {
  const [text, setText] = useState("");

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

  return (
    <div className="py-16 bg-gray-50">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Try TextEase
      </h2>
      <h3 className="w-1/2 mx-auto text-2xl italic font-semibold">
       TextEase delivers &nbsp; &#8594; &nbsp;
        <AnimatedText texts={features.map((feature) => feature.title)} />
      </h3>
      <div className="max-w-2xl mx-auto">
        <textarea
          className="w-full p-4 border border-gray-300 rounded-lg mb-4"
          rows="5"
          placeholder="Type your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="flex space-x-4">
          <button
            onClick={() => setText(text.toUpperCase())}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Uppercase
          </button>
          <button
            onClick={() => setText(text.toLowerCase())}
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            Lowercase
          </button>
          <Link href={"/utils/textutils"}>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
              Check All Functions
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
