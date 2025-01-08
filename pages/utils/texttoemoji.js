import React, { useState } from "react";
import { getUnicode } from "emoji-dictionary"; // Correctly import getUnicode

const TextUtils = () => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const convertToEmoji = () => {
    let hasValidSyntax = false; // Track if there's valid syntax
    const newText = text.replace(/:([a-zA-Z0-9_+-]+):/g, (match, emojiName) => {
      hasValidSyntax = true; // Syntax is valid
      const foundEmoji = getUnicode(emojiName); // Get emoji from name
      if (!foundEmoji) {
        setError(`No emoji found for name: "${emojiName}"`);
        return match; // Keep the original text
      }
      setError(""); // Clear error for valid emoji
      return foundEmoji; // Replace with emoji
    });

    if (!hasValidSyntax) {
      setError("Invalid syntax! Use the format :emoji_name:");
      return;
    }

    setText(newText); // Update text only if syntax is valid
  };

  return (
    <div className="w-1/2 mx-auto flex flex-col items-center space-y-4">
      <h2 className="text-4xl font-bold text-pink-600 mb-8 text-center mt-4">
        Text to Emoji Converter
      </h2>
      <p className="text-gray-700 text-center text-sm">
        Type the name of an emoji in the format{" "}
        <span className="font-mono text-pink-600">:name:</span>, for example:{" "}
        <span className="font-mono text-pink-600">:smile:</span> or{" "}
        <span className="font-mono text-pink-600">:black_heart:</span>.
      </p>
      <textarea
        value={text}
        onChange={(e) => {
            setText(e.target.value);
            setError(""); // Clear error on text change
          }}
        rows="5"
        cols="30"
        placeholder="Type your text with :emoji_name: here..."
        className="border-2 border-pink-500 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none w-full rounded p-2 overflow-y-hidden"
      />
      <button
        onClick={convertToEmoji}
        className={`relative group text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
          text.length === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        Convert to Emoji
      </button>
      {error && (
        <p className="text-red-600 font-medium mt-2">{error}</p>
      )}
      <h3 className="text-white bg-gradient-to-r from-lime-500 via-lime-600 to-lime-700 font-medium rounded-full px-5 text-center">
        Result
      </h3>
      <div className={`relative mt-10 p-6 border-2 border-lime-500 rounded-lg bg-white shadow-lg w-full max-w-3xl ${ text.length === 0 ? "hidden" : "block"}`}>
        {text}
      </div>
    </div>
  );
};

export default TextUtils;
