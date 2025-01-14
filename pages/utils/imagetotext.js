/* eslint-disable @next/next/no-img-element */
import { useState, useRef } from 'react';
import { FaCopy } from 'react-icons/fa';
import Tesseract from 'tesseract.js';

const ImageToText = () => {
  const [image, setImage] = useState(null); // State to hold the uploaded image
  const [text, setText] = useState(''); // State to hold the extracted text
  const fileInputRef = useRef(null); // Ref for the file input

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Preview the image
      extractText(file); // Call the function to extract text from the image
    }
  };

  const extractText = (imageFile) => {
    Tesseract.recognize(
      imageFile,
      'eng', // Language for OCR (English)
      {
        logger: (m) => console.log(m), // Optional: log OCR progress
      }
    ).then(({ data: { text } }) => {
      setText(text); // Set the extracted text to state
    });
  };


  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    document.getSelection().removeAllRanges();
    alert("Text is Copied!");
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4 text-pink-600">Image to Text Converter</h1>

      <div className='flex flex-col md:flex-row items-center space-x-0 md:space-x-4'>
        <div className='flex flex-col items-center'>
          {/* Image Upload Section */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="mb-4"
          />
          {image && (
            <div>
              <img src={image} alt="Uploaded" className="border border-gray-300 mb-4" />
            </div>
          )}

        </div>
        {/* Display the Extracted Text */}
        <div className='flex flex-col items-center'>
          <h2 className="text-lg font-semibold text-lime-600 border-b border-pink-600">Extracted Text</h2>
          <div className="relative group">
            <pre className="whitespace-pre-wrap" onClick={() => handleCopy(text)}>{text}</pre>
            <FaCopy
              className="absolute top-0 right-0 cursor-pointer"
              onClick={() => handleCopy(text)}
            />
            <span className="hidden group-hover:block text-gray-600 text-xs rounded px-2 py-1 absolute top-6 right-0 bg-white shadow-lg">
              Click to Copy Text
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageToText;
