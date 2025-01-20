/* eslint-disable @next/next/no-img-element */
import { useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas";
import WSEOHead from "@/components/SEOHead";
import Alert from "@/components/Alert";

const HtmlToImageConverter = () => {
  const iframeRef = useRef(null);
  const [htmlInput, setHtmlInput] = useState("");
  const [cssInput, setCssInput] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [imageName, setImageName] = useState("");

  const updateIframeContent = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

    iframeDocument.open();
    iframeDocument.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <style>${cssInput}</style>
        </head>
        <body>${htmlInput}</body>
      </html>
    `);
    iframeDocument.close();
  };

  useEffect(() => {
    updateIframeContent(); // Update the iframe whenever htmlInput or cssInput changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [htmlInput, cssInput]);

  const handleConvertToImage = async () => {
    const iframe = iframeRef.current;
    if (!iframe) {
      Alert.error("Failed to convert. Please check your HTML and CSS syntax.");
      return;
    }
  
    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
  
    // Get the full height and width of the iframe's content
    const iframeBody = iframeDocument.body;
    const iframeWidth = iframeBody.scrollWidth;
    const iframeHeight = iframeBody.scrollHeight;
  
    // Temporarily apply styles to ensure the content fits within the viewport
    iframeBody.style.width = `${iframeWidth}px`;
    iframeBody.style.height = `${iframeHeight}px`;
    iframeBody.style.overflow = "hidden";
  
    // Use html2canvas to capture the entire content
    try {
      const canvas = await html2canvas(iframeBody, {
        width: iframeWidth,
        height: iframeHeight,
        scrollX: 0,
        scrollY: 0,
        windowWidth: iframeWidth,
        windowHeight: iframeHeight,
      });
  
      const imgData = canvas.toDataURL("image/png");
      setImageSrc(imgData);
      Alert.success("HTML successfully converted to image!");
    } catch (error) {
      Alert.error("Failed to convert HTML to image. Please try again.");
      console.error(error);
    } finally {
      // Reset the styles after capturing
      iframeBody.style.width = "";
      iframeBody.style.height = "";
      iframeBody.style.overflow = "";
    }
  };
  

  const handleDownloadImage = () => {
    const link = document.createElement("a");
    link.href = imageSrc;
    link.download = `${imageName || "image"}.png`;
    link.click();
    setShowModal(false); // Close the modal after downloading
  };

  return (
    <>
      <WSEOHead
        title="HTML to Image Converter - TextEase"
        description="Convert your custom HTML and CSS to an image format with ease."
        keywords="HTML to image, html2canvas, convert HTML"
        url="https://texteaseutils.vercel.app/utils/htmltoimage"
      />

      <div className="p-6">
        <h1 className="text-4xl font-bold text-pink-600 mb-8 text-center">
          HTML to Image Converter
        </h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* HTML Input */}
          <textarea
            className="w-full p-4 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-gray-200"
            rows="10"
            placeholder="Enter your HTML here..."
            value={htmlInput}
            onChange={(e) => setHtmlInput(e.target.value)}
          ></textarea>

          {/* CSS Input */}
          <textarea
            className="w-full p-4 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-gray-200"
            rows="10"
            placeholder="Enter your CSS here..."
            value={cssInput}
            onChange={(e) => setCssInput(e.target.value)}
          ></textarea>
        </div>

        {/* Isolated Preview */}
        <div className="mt-6 h-dvh">
          <iframe
            ref={iframeRef}
            title="HTML Preview"
            className="w-full h-full border rounded-md bg-white"
            sandbox="allow-scripts allow-same-origin"
          ></iframe>
        </div>

        <button
          onClick={handleConvertToImage}
          className="mt-4 px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Convert to Image
        </button>

        {/* Display the generated image */}
        {imageSrc && (
          <div className="mt-6">
            <img
              src={imageSrc}
              alt="Generated from HTML and CSS"
              className="w-full border rounded-md"
            />
            <button
              onClick={() => setShowModal(true)}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Download Image
            </button>
          </div>
        )}

        {/* Modal for Image Name */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white w-1/2 dark:bg-gray-800 p-6 rounded-md shadow-md">
              <h2 className="text-lg font-semibold mb-4">Enter Image Name</h2>
              <input
                type="text"
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-lime-500"
                placeholder="Enter image name..."
                value={imageName}
                onChange={(e) => setImageName(e.target.value)}
              />
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md mr-2 hover:bg-gray-600 focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDownloadImage}
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
};

export default HtmlToImageConverter;
