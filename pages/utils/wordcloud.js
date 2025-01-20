import WSEOHead from '@/components/SEOHead';
import WordCloudComp from '@/components/WordCloudComp';
import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import Alert from '@/components/Alert';

export default function WordCloudPage() {
  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState(20);
  const [showModal, setShowModal] = useState(false);
  const [fileName, setFileName] = useState('');
  const wordCloudRef = useRef();

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const generateWordList = () => {
    return text.split(/\s+/).map((word) => ({
      text: word,
      value: Math.floor(Math.random() * (100 - fontSize) + fontSize),
    }));
  };

  const handleDownload = () => {
    const element = wordCloudRef.current;
    if (!element) return;

    html2canvas(element).then((canvas) => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `${fileName || 'wordcloud'}.png`;
      link.click();
      setShowModal(false);
      Alert.success("Your wordcloud image start downloading!");
    });
  };

  const wordList = generateWordList();

  return (
    <>
      <WSEOHead
        title="Word Cloud Generator - TextEase"
        description="Create beautiful word clouds effortlessly. Customize font size and visualize your text with our Word Cloud Generator."
        keywords="word cloud generator, text visualization, text tools, TextEase"
        url="https://texteaseutils.vercel.app/utils/wordcloud"
      />
      <div className="flex flex-col items-center justify-center px-4 py-8">
        <div className="p-6 w-full md:w-1/2 mx-auto">
          <h1 className="text-4xl font-bold text-pink-600 mb-8 text-center">
            Word Cloud Generator
          </h1>

          <textarea
            value={text}
            onChange={handleTextChange}
            placeholder="Enter text here..."
            rows={8}
            className="p-4 border-2 text-gray-950 border-pink-500 rounded-lg shadow-md w-full focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none"
          />
        </div>

        {/* Word Cloud Component */}
        <div
          ref={wordCloudRef}
          className="flex justify-center w-full md:w-1/2 mt-8 border rounded-md bg-white"
        >
          <WordCloudComp words={wordList} width={300} height={300} />
        </div>

        {/* Download Button */}
        <button
          onClick={() => setShowModal(true)}
          className="mt-6 px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Download Word Cloud
        </button>

        {/* Modal for File Name */}

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white w-11/12 md:w-1/2 dark:bg-gray-800 p-6 rounded-md shadow-md">
              <h2 className="text-lg font-semibold mb-4">Enter File Name</h2>
              <input
                type="text"
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-lime-500"
                placeholder="File name (default: data)"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
              />
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md mr-2 hover:bg-gray-600 focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDownload}
                  className="px-4 py-2 bg-lime-500 text-white rounded-md hover:bg-lime-600 focus:outline-none"
                >
                  Download
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
