import React, { useState } from "react";

const TextUtils = () => {
  const [text, setText] = useState("");
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  const wordCount = text.length > 0 ? text.trim().split(/\s+/).length : 0;
  const charCount = typeof text === "string" ? text.length : 0;

  const saveForUndo = () => {
    setUndoStack((prevStack) => [...prevStack, text]);
    setRedoStack([]); // Clear redo stack when new change is made
  };

  const handleUpClick = () => {
    saveForUndo();
    let newText = text.toUpperCase();
    setText(newText);
    // showalert("Converted to Uppercase!","success")
  };
  const handleLowClick = () => {
    saveForUndo();
    let newText = text.toLowerCase();
    setText(newText);
    // showalert("Converted to Lowercase!","success")
  };
  const handleClearClick = () => {
    saveForUndo();
    setText("");
    // showalert("Text Cleared!","success")
  };

  const handleCopy = () => {
    saveForUndo();
    navigator.clipboard.writeText(text);
    document.getSelection().removeAllRanges();
    // showalert("Text Copied!","success")
  };

  const handleSpeak = () => {
    saveForUndo();
    let msg = new SpeechSynthesisUtterance();
    msg.text = text;
    window.speechSynthesis.speak(msg);
    // showalert("Listen Your Text!","success")
  };

  const handleExtraSpaces = () => {
    saveForUndo();
    let newText = text.split(/[ ]+/);

    setText(newText.join(" "));
    // showalert("Extra Spaces Removed!","success")
  };

  const capitalizeFirstLetter = () => {
    saveForUndo();

    let capText = text.charAt(0).toUpperCase() + text.slice(1);

    setText(capText);
    // showalert("First Letter Capitalized!","success")
  };

  const convertToSentenceCase = () => {
    saveForUndo();

    let sentenseText = text
      .split(/([.!?]\s*)/)
      .map(
        (sentence) =>
          sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase()
      )
      .join("");

    setText(sentenseText);
  };

  const encodeBase64 = () => {
    saveForUndo();

    setText(btoa(text));
  };

  const extractNumbers = () => {
    saveForUndo();

    if (typeof text !== "string") {
      console.warn("Invalid input: text should be a string");
      setText([]);
      return;
    }
    const numbers = text.match(/\d+/g) || [];

    setText(numbers.join(" ")); // Convert the array of numbers back into a string
  };

  const extractLinks = () => {
    saveForUndo();

    const links = text.match(/https?:\/\/[^\s]+/g) || [];

    setText(links.join("\n")); // Convert the array of links to a newline-separated string
  };

  const removeHtmlTags = () => {
    saveForUndo();

    // removes html tags
    const newText = text.replace(/<[^>]*>/g, "");

    setText(newText);
  };

  const removeSpecialCharacters = () => {
    saveForUndo();

    const newText = text.replace(/[^a-zA-Z0-9 ]/g, "");

    setText(newText);
  };

  const pasteFromClipboard = async () => {
    saveForUndo();

    try {
      // Read the text from the clipboard
      const clipboardText = await navigator.clipboard.readText();

      // Append the clipboard text to the existing text
      setText((prevText) => prevText + " " + clipboardText);
    } catch (error) {
      console.error("Failed to read clipboard contents: ", error);
    }
  };

  const reverseText = () => {
    saveForUndo();

    const newText = text.split("").reverse().join("");

    setText(newText);
  };

  const handleSpeechRecognition = () => {
    saveForUndo();

    // Check for browser support
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error("Speech Recognition is not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.interimResults = true; // Capture speech as the user speaks
    recognition.lang = "en-US"; // Set language

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;

      // Append and Update the text with the spoken words text to the existing text
      setText((prevText) => prevText + " " + transcript);
    };

    recognition.start(); // Start listening for speech
  };

  const undo = () => {
    if (undoStack.length > 0) {
      const prevText = undoStack.pop();
      setText(prevText);
      setUndoStack([...undoStack]);
      setRedoStack((prevStack) => [...prevStack, text]);
    }
  };

  const redo = () => {
    if (redoStack.length > 0) {
      const nextText = redoStack.pop();
      setText(nextText);
      setRedoStack([...redoStack]);
      setUndoStack((prevStack) => [...prevStack, text]);
    }
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
    "Encode to Base64",
    "Extract Numbers",
    "Extract Links",
    "Remove HTML Tags",
    "Remove Special Characters",
    "Paste from Clipboard",
    "Reverse Text",
    "Start Listening",
    "Undo Action",
    "Redo Action",
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
    encodeBase64,
    extractNumbers,
    extractLinks,
    removeHtmlTags,
    removeSpecialCharacters,
    pasteFromClipboard,
    reverseText,
    handleSpeechRecognition,
    undo,
    redo,
  ];

  return (
    <div>
      <div className="w-1/2 mx-auto">
        <h2 className="text-2xl text-center mt-4 mb-6">
          TextEase - a Text Utility app
        </h2>
        <div className="relative">
          {/* <h2>Your text Summary</h2> */}
          <span className="absolute bottom-0 left-0 text-white bg-gradient-to-r from-lime-500 via-lime-600 to-lime-700 focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-r-full text-sm px-5 text-center">
            {wordCount} words and {charCount} Characters
          </span>

          <span className="absolute bottom-0 right-0 text-white bg-gradient-to-r from-lime-500 via-lime-600 to-lime-700 focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-l-full text-sm px-5 text-center">
            {0.008 *
              text.split(" ").filter((element) => {
                return element.length !== 0;
              }).length}{" "}
            Minutes to read
          </span>
        </div>
        <textarea
          className="w-full border border-gray-200 rounded p-2 overflow-y-hidden"
          value={text}
          onChange={handleOnChange}
          placeholder="Enter your text here"
          rows={5}
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
        <h3 className="text-white bg-gradient-to-r from-lime-500 via-lime-600 to-lime-700 focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-full  px-5 text-center">
          Preview
        </h3>
        <p className="my-2">
          {text.length > 0 ? text : "Enter text in the textbox to Preview"}
        </p>
      </div>
    </div>
  );
};

export default TextUtils;
