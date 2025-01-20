import { useState } from "react";
import QRCode from "qrcode";
import WSEOHead from "@/components/SEOHead";
import Alert from "@/components/Alert";

const QRCodeGenerator = () => {
  const [text, setText] = useState("");
  const [download, setDownload] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [fileName, setFileName] = useState("");

  const generateQRCode = () => {
    const canvas = document.getElementById("canvas");
    if (canvas) {
      QRCode.toCanvas(canvas, text, function (error) {
        if (error) console.error(error);
        console.log("QR code generated!");
        setDownload(true);
        Alert.success("QR Code generated!");
      });
    }
  };

  const downloadQRCode = () => {
    const canvas = document.getElementById("canvas");
    if (canvas) {
      const dataURL = canvas.toDataURL(); // Converts canvas to a base64 image URL

      // Create an anchor element
      const link = document.createElement("a");
      link.href = dataURL; // Set the href to the image URL
      link.download = `${fileName || "qrcode"}.png`; // Set the file name for download
      link.click(); // Trigger a click event to download the image
      setShowModal(false);
      Alert.success("QR Code downloaded!");
    }
  };

  return (
    <>
      <WSEOHead
        title="QR Code Generator - TextEase"
        description="Generate QR codes from text with ease using our QR Code Generator. Convert any text into a scannable QR code instantly."
        keywords="QR code generator, QR code, text to QR, text utilities"
        url="https://texteaseutils.vercel.app/utils/qrcodegenerator"
      />
      <div className="flex flex-col items-center justify-center px-4">
        <div className="p-6 max-w-3xl w-full">
          <h1 className="text-4xl font-bold text-pink-600 mb-8 text-center">
            QR Code Generator
          </h1>

          <textarea
            type="text"
            placeholder="Enter text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="p-4 border-2 text-gray-950 border-pink-500 rounded-lg shadow-md w-full focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none"
          />
          <div className="flex justify-between items-center">
            <button
              onClick={generateQRCode}
              className={`relative group text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-3 md:px-5 py-2.5 text-center ${text.length === 0
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
                }`}
            >
              Generate QR Code
            </button>

            {download && text !== 0 && (
              <button
                onClick={() => setShowModal(true)}
                className={`relative group text-white bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
              >
                Download QR Code
              </button>
            )}
          </div>
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white w-11/12 md:w-1/2 dark:bg-gray-800 p-6 rounded-md shadow-md">
                <h2 className="text-lg font-semibold mb-4">Enter File Name</h2>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-lime-500"
                  placeholder="File name (default: qrcode)"
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
                    onClick={downloadQRCode}
                    className="px-4 py-2 bg-lime-500 text-white rounded-md hover:bg-lime-600 focus:outline-none"
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>
          )}

          {text !== 0 && (<div className="flex justify-center mt-6">
            <canvas
              id="canvas"
              className="border rounded-lg shadow-md max-w-full"
            ></canvas>
          </div>)}
        </div>
      </div>
    </>
  );
};

export default QRCodeGenerator;
