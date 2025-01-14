import { useState } from "react";
import { diffWords } from "diff";

const CompareText = () => {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [result, setResult] = useState(null);

  const handleCompare = () => {
    const diff = diffWords(text1, text2);
    setResult(diff);
  };

  const saveTextAsFile = () => {
    const filename = prompt("Please enter the filename:", "comparison_result.txt");
    if (filename) {
      const blob = new Blob([result.map(part => part.value).join("")], { type: "text/plain" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold text-pink-600 mb-8 text-center mt-4">
        Text Comparison Tool
      </h1>

      <div className="flex flex-col md:flex-row gap-6 w-full max-w-3xl mb-6">
        <textarea
          placeholder="Enter first text here..."
          className="p-4 border-2 text-gray-950 border-pink-500 rounded-lg shadow-md w-full focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none"
          rows={6}
          value={text1}
          onChange={(e) => setText1(e.target.value)}
        />
        <textarea
          placeholder="Enter second text here..."
          className="p-4 border-2 text-gray-950 border-pink-500 rounded-lg shadow-md w-full focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none"
          rows={6}
          value={text2}
          onChange={(e) => setText2(e.target.value)}
        />
      </div>

      <button
        className={`relative group text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
          text1.length === 0 && text2.length === 0
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer"
        }`}
        onClick={handleCompare}
      >
        Compare Text
      </button>

      {result && (
        <div className="relative mt-10 p-6 border-2 border-lime-500 rounded-lg bg-white shadow-lg w-full max-w-3xl">
          <h2 className="text-2xl font-semibold text-lime-600 mb-4 text-center">
            Comparison Result
          </h2>
          <div className="whitespace-pre-wrap text-base font-mono leading-relaxed">
            {result.map((part, index) => (
              <span
                key={index}
                style={{
                  color: part.added ? "green" : part.removed ? "red" : "black",
                  backgroundColor: part.added
                    ? "#e6f7e6"
                    : part.removed
                    ? "#fde8e8"
                    : "transparent",
                  textDecoration: part.added
                    ? "underline"
                    : part.removed
                    ? "line-through"
                    : "none",
                  padding: part.added || part.removed ? "2px 4px" : "0",
                  borderRadius: "4px",
                }}
              >
                {part.value}
              </span>
            ))}
            {result && (
              <button
                className={`absolute right-0 bottom-1 group text-white bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-[8px] md:text-sm px-4 py-0 md:py-1 text-center ${
                  text1.length === 0 && text2.length === 0
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
                onClick={saveTextAsFile}
              >
                <span className="text-[8px] md:text-sm bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 text-white px-2 py-0 md:py-1 rounded-r-full">Download</span> as Text File
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompareText;
