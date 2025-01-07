/* eslint-disable @next/next/no-img-element */
import { useState, useRef } from 'react';
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

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4 text-pink-600">Image to Text Converter</h1>
      
      <div className='flex justify-evenly items-center space-x-4'>
        <div>
      {/* Image Upload Section */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        className="mb-4"
      />
      {image && (
        <div>
          <img src={image} alt="Uploaded" className="max-w-lg border border-gray-300 mb-4" />
        </div>
      )}

</div>
      {/* Display the Extracted Text */}
      <div>
        <h2 className="text-lg font-semibold text-lime-600 border-b border-pink-600">Extracted Text</h2>
        <pre className="whitespace-pre-wrap">{text}</pre>
      </div>
      </div>
    </div>
  );
};

export default ImageToText;
