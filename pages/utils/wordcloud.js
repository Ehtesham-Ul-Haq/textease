import { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the WordCloud component to avoid SSR issues
const WordCloud = dynamic(() => import('react-wordcloud'), { ssr: false });

export default function WordCloudPage() {
  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState(20);
  const [rotation, setRotation] = useState(0);

  // Handle text input change
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  // Convert the text into a list of words with random weights
  const generateWordList = () => {
    const words = text
      .split(/\s+/)
      .map(word => ({
        text: word,
        value: Math.floor(Math.random() * (100 - 30) + 30), // Random weight for each word
      }));
    return words;
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

        <div className="flex items-center justify-evenly mb-8">
          <div className="flex flex-col items-center space-y-2">
            <label htmlFor="fontSize" className="font-medium text-gray-700">Font Size:</label>
            <input
              type="number"
              id="fontSize"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              min="10"
              max="100"
              step="1"
              className="p-3 w-48 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col items-center space-y-2">
            <label htmlFor="rotation" className="font-medium text-gray-700">Rotation:</label>
            <input
              type="number"
              id="rotation"
              value={rotation}
              onChange={(e) => setRotation(Number(e.target.value))}
              min="0"
              max="100"
              step="1"
              className="p-3 w-48 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-center">
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
        <WordCloud
          words={wordList}
          options={{
            gridSize: fontSize,
            weightFactor: 10,
            rotateRatio: rotation / 100,
            color: 'yellow',
            backgroundColor: '#f4f4f4',
            shape: 'circle',
            minSize: 15,
          }}
        />
      </div>
    </div>
  );
}
