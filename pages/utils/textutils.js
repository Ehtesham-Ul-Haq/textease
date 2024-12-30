import React, { useState } from "react";

const TextUtils = () => {
  const [text, setText] = useState("");

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  const handleUpClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
    // showalert("Converted to Uppercase!","success")
  };
  const handleLowClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
    // showalert("Converted to Lowercase!","success")
  };
  const handleClearClick = () => {
    let newText = "";
    setText(newText);
    // showalert("Text Cleared!","success")
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    document.getSelection().removeAllRanges();
    // showalert("Text Copied!","success")
  };

  const handleSpeak = () => {
    let msg = new SpeechSynthesisUtterance();
    msg.text = text;
    window.speechSynthesis.speak(msg);
    // showalert("Listen Your Text!","success")
  };

  const handleExtraSpaces = () => {
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "));
    // showalert("Extra Spaces Removed!","success")
  };

  const capitalizeFirstLetter = () => {
    let capText = text.charAt(0).toUpperCase() + text.slice(1);
    setText(capText);
    // showalert("First Letter Capitalized!","success")
  };

  const convertToSentenceCase = () => {
    let sentenseText = text.split(/([.!?]\s*)/).map((sentence) =>
        sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase()
      ).join('');
      setText(sentenseText);
  };

  const functionButtonNames = [
    "Convert to UpperCase",
    "Convert to LowerCase",
    "Capitalize First Letter",
    "Clear Text",
    "Copy Text to Clipboard",
    "Text to Speech",
    "Remove Extra Spaces",
    "Convert to Sentence Case",
  ];

  const functionHandlers = [
    handleUpClick,
    handleLowClick,
    capitalizeFirstLetter,
    handleClearClick,
    handleCopy,
    handleSpeak,
    handleExtraSpaces,
    convertToSentenceCase,
  ];

  return (
    <div>
      <div className="w-1/2 mx-auto">
        <h2 className="text-2xl text-center mt-4 mb-6">
          TextEase - a Text Utility app
        </h2>
        <div className="relative">
            {/* <h2>Your text Summary</h2> */}
            <span className="absolute bottom-0 left-0 text-white bg-gradient-to-r from-lime-500 via-lime-600 to-lime-700 focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-r-full text-sm px-5 text-center">{text.length>0 ? text.trim().split(/\s+/).length : 0} words and {text.length} Characters</span>

            <span className="absolute bottom-0 right-0 text-white bg-gradient-to-r from-lime-500 via-lime-600 to-lime-700 focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-l-full text-sm px-5 text-center">{0.008 * text.split(" ").filter((element)=>{return element.length!==0}).length} Minutes to read</span>
           

        </div>
        <textarea
          className="w-full border border-gray-200 rounded p-2 overflow-y-hidden"
          value={text}
          onChange={handleOnChange}
          placeholder="Enter your text here"
        />
      </div>
      <div className="grid grid-cols-3 gap-2 items-center mx-auto w-1/2">
        {functionButtonNames.map((name, index) => (
          <button
            key={index}
            disabled={text.length === 0}
            className={`text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
              text.length === 0
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }`}
            onClick={functionHandlers[index]}
          >
            {name}
          </button>
        ))}
      </div>
      <div className="w-1/2 mx-auto my-2">
        <h3 className="text-white bg-gradient-to-r from-lime-500 via-lime-600 to-lime-700 focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-full  px-5 text-center">Preview</h3>
        <p className="my-2">{text.length>0?text:"Enter text in the textbox to Preview"}</p>
      </div>
    </div>
  );
};

export default TextUtils;
