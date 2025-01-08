import WordCloudComp from '@/components/WordCloudComp';
import React, { useState } from 'react';

export default function WordCloudPage() {
  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState(20);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const generateWordList = () => {
    return text.split(/\s+/).map((word) => ({
      text: word,
      value: Math.floor(Math.random() * (100 - fontSize) + fontSize),
    }));
  };

  const wordList = generateWordList();

  return (
    <div className="flex flex-col items-center justify-center px-4 py-8">
      <div className="p-6 max-w-3xl w-full">
        <h1 className="text-4xl font-bold text-pink-600 mb-8 text-center">
          Word Cloud Generator
        </h1>

        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Enter text here..."
          rows={8}
          className="p-4 border-2 border-pink-500 rounded-lg shadow-md w-full focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none"
        />

        <div className="flex justify-center mt-8">
          <button
            onClick={() => {}}
            className="relative group text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Generate Word Cloud
          </button>
        </div>
      </div>

      {/* Word Cloud Component */}
      <div className="flex justify-center mt-8">
        <WordCloudComp words={wordList} width={500} height={300} />
      </div>
    </div>
  );
}
