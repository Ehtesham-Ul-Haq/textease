/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';

const HtmlToImage = () => {
  const elementRef = useRef(null); // Reference for the element to capture
  const [imageSrc, setImageSrc] = useState(''); // State to hold the image data

  const handleConvertToImage = () => {
    if (!elementRef.current) return;

    // Convert the element into a canvas using html2canvas
    html2canvas(elementRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png'); // Get the image data as a data URL

      setImageSrc(imgData); // Update the state with the image source
    });
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-pink-600 mb-8 text-center">HTML to Image Converter</h1>

      {/* Section to capture */}
      <div
        ref={elementRef}
        className="w-full md:w-1/2 p-4 border dark:text-gray-950 border-gray-300 rounded-md bg-blue-100 text-center mb-6"
      >
        <h2 className="text-lg font-semibold">Capture this section as an image</h2>
        <p className="text-sm mt-2">
          This is the content that will be converted into an image using html2canvas.
        </p>
      </div>

      {/* Convert Button */}
      <button
        onClick={handleConvertToImage}
        className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 mb-6"
      >
        Convert to Image
      </button>

      {/* Display the generated image */}
      {imageSrc && (
        <img
          src={imageSrc} // Use the state value for the image source
          alt="Generated from HTML"
          className="w-full md:w-1/2 border border-gray-300 rounded-md shadow-md"
        />
      )}
    </div>
  );
};

export default HtmlToImage;
