import Alert from "@/components/Alert";
import WSEOHead from "@/components/SEOHead";
import { useState } from "react";

const JsonMaker = () => {
  const [inputText, setInputText] = useState("");
  const [jsonOutput, setJsonOutput] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [fileName, setFileName] = useState("");


  const jsonMaker = (text) => {
    const lines = text.split("\n").filter((line) => line.trim() !== "");
    const result = {};

    lines.forEach((line) => {
      const [key, value] = line.split(":").map((item) => item.trim());
      if (key && value !== undefined) {
        result[key] = isNaN(value) ? value : Number(value);
      }
    });

    return result;
  };

  const handleGenerateJSON = () => {
    try {
      const json = jsonMaker(inputText);
  
      // Check if the generated JSON is empty
      if (Object.keys(json).length === 0) {
        Alert.error("Error: No valid key-value pairs found. Please provide input in 'key:value' format.");
      } else {
        setJsonOutput(json);
        Alert.success("Your text is successfully converted to JSON!");
      }
    } catch (error) {
      setJsonOutput({ error: "Invalid format. Please use key:value pairs." });
      Alert.error("Error: An unexpected error occurred while processing your input.");
    }
  };
  

  const handleDownloadJSON = () => {
    const blob = new Blob([JSON.stringify(jsonOutput, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName || "data"}.json`;
    link.click();
    setShowModal(false);
    Alert.success("Your JSON File is Downloading!");
  };

  return (
    <>

      <WSEOHead
        title="JSON Maker - TextEase"
        description="Easily convert key:value text pairs into a structured JSON object. Generate, view, and download JSON files with ease."
        keywords="JSON maker, convert to JSON, key-value pairs, JSON generator, text to JSON"
        url="https://texteaseutils.vercel.app/utils/jsonmaker"
      />

      <div className="min-h-screen text-gray-800 dark:text-gray-100 p-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-pink-600 mb-6 text-center">JSON Maker</h1>
          <p className="mb-4">
            Enter your text in the format <strong>key:value</strong>, one pair per
            line, and click &ldquo;Generate JSON&ldquo; to convert it to a JSON object.
          </p>
          <textarea
            className="w-full p-4 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-800 dark:text-gray-100"
            rows="8"
            placeholder="Example:&#10;name: John Doe&#10;age: 30&#10;city: New York"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          ></textarea>
          <button
            onClick={handleGenerateJSON}
            className="mt-4 px-6 py-2 bg-pink-500 text-white font-semibold rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-300"
          >
            Generate JSON
          </button>

          {jsonOutput && (
            <div className="mt-6 bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <h2 className="text-xl font-semibold mb-2">Generated JSON:</h2>
              <pre className="whitespace-pre-wrap break-words text-sm">
                {JSON.stringify(jsonOutput, null, 2)}
              </pre>
              <button
                 onClick={() => setShowModal(true)}
                className="mt-4 px-6 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                Download JSON
              </button>
            </div>
          )}
        </div>
      </div>
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
                onClick={handleDownloadJSON}
                className="px-4 py-2 bg-lime-500 text-white rounded-md hover:bg-lime-600 focus:outline-none"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JsonMaker;
