import Link from "next/link";
import { useState } from "react";

export default function Demo() {
  const [text, setText] = useState("");

  return (
    <div className="py-16 bg-gray-50">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Try TextEase
      </h2>
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
          <Link href={'/utils/textutils'}>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Check All Functions
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
