import React, { useState } from "react";
import { syllable } from "syllable";
import { jsPDF } from 'jspdf';

const TextUtils = () => {
  const [text, setText] = useState("");
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [textStyle, setTextStyle] = useState({});

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  const wordCount = text.length > 0 ? text.trim().split(/\s+/).length : 0;
  const charCount = typeof text === "string" ? text.length : 0;

  const readingTime = () => {
    const wordsPerMinute = 200; // Average reading speed
    return (wordCount / wordsPerMinute).toFixed(2);
  };

  const countSyllables = () => {
    return syllable(text);
  };

  const saveForUndo = () => {
    setUndoStack((prevStack) => [...prevStack, text]);
    setRedoStack([]); // Clear redo stack when new change is made
  };

  const fonts = [
    "Arial",
    "Verdana",
    "Helvetica",
    "Georgia",
    "Times New Roman",
    "Courier New",
    "Trebuchet MS",
    "Lucida Sans",
    "Tahoma",
    "Calibri",
    "Cambria",
    "Garamond",
    "Comic Sans MS",
    "Century Gothic",
    "Franklin Gothic Medium",
    "Palatino Linotype",
    "Book Antiqua",
    "Candara",
    "Impact",
    "Roboto",
    "Open Sans",
    "Lato",
    "Montserrat",
    "Oswald",
    "Raleway",
    "Poppins",
    "Ubuntu",
    "Merriweather",
    "Noto Sans",
    "Playfair Display",
    "PT Serif",
    "Fira Sans",
    "Droid Sans",
    "Titillium Web",
    "Source Sans Pro",
    "Slabo 27px",
    "Inconsolata",
    "Josefin Sans",
    "Caveat",
    "Quicksand",
    "Asap",
    "Exo",
    "Varela Round",
    "Anton",
    "Archivo",
    "Mukta",
    "Lora",
    "Work Sans",
    "Arvo",
    "Cormorant Garamond",
  ];

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

  const changeFontFamily = (fontFamily) => {
    saveForUndo();
    setTextStyle((prevStyle) => ({
      ...prevStyle,
      fontFamily: fontFamily,
    }));
  };

  const changeFontSize = (fontSize) => {
    saveForUndo();
    setTextStyle((prevStyle) => ({
      ...prevStyle,
      fontSize: fontSize,
    }));
  };

  const setTextAlignment = (alignment) => {
    saveForUndo();
    setTextStyle((prevStyle) => ({
      ...prevStyle,
      textAlign: alignment,
    }));
  };

  const highlightText = () => {
    saveForUndo();
    const highlightedText = text.replace(/\b(\w+)\b/g, "<mark>$1</mark>");
    setText(highlightedText);
  };

  const handleFindAndReplace = () => {
    const find = prompt("Enter the word you want to find:");
    const replace = prompt("Enter the word you want to replace it with:");

    if (find && replace !== null) {
      findAndReplace(find, replace);
    }
  };

  const findAndReplace = (find, replace) => {
    saveForUndo();
    const newText = text.replace(new RegExp(find, "g"), replace);
    setText(newText);
  };

  const saveTextAsFile = () => {
    const filename = prompt(
      "Please enter the filename:",
      "comparison_result.txt"
    );
    if (filename) {
      const blob = new Blob([text], { type: "text/plain" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    }
  };

  const boldText = () => {
    saveForUndo();
    const newText = `<b>${text}</b>`;
    setText(newText);
  };

  const italicizeText = () => {
    saveForUndo();
    const newText = `<i>${text}</i>`;
    setText(newText);
  };

  const underlineText = () => {
    saveForUndo();
    const newText = `<u>${text}</u>`;
    setText(newText);
  };


const textToPDF = () => {
 const filename = prompt(
      "Please enter the filename:",
      "comparison_result.pdf"
    );
    if (filename) {
  const doc = new jsPDF();
  doc.text(text, 10, 10);
  doc.save(`${filename}.pdf`);
  }
}

function textToCSV() {
  const filename = prompt(
    "Please enter the filename:",
    "csv_result.csv"
  );
  if (filename) {
  const csv = text.split('\n').map(row => row.split(' ').join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'data.csv';
  link.click();
  }
}
  

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
    "Highlight Text",
    "Find and Replace",
    "Save as Text File",
    "<b>Bold Text</b>",
    "<i>Italic Text</i>",
    "<u>Underline Text</u>",
    "Text to PDF",
    "Text to CSV/Excel",
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
    highlightText,
    handleFindAndReplace,
    saveTextAsFile,
    boldText,
    italicizeText,
    underlineText,
    textToPDF,
    textToCSV,
  ];

  return (
    <div>
      <div className="w-1/2 mx-auto">
        <h2 className="text-4xl font-bold text-pink-600 mb-8 text-center mt-4">
          TextEase - a Text Utility app
        </h2>
        <div className="relative">
          {/* <h2>Your text Summary</h2> */}
          <span className="absolute bottom-1 left-0 text-white shadow-lg dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-full text-[12px] text-center justify-between flex w-full">
            <span className="bg-lime-600 px-4 rounded-full">{wordCount} words and {charCount} Characters</span>
            <span className="bg-lime-600 px-4 rounded-full">{countSyllables()} Syllables</span>
            <span className="bg-lime-600 px-4 rounded-full">{readingTime()} Minutes to read</span>
          </span>


        </div>
        <textarea
          className="border-2 border-pink-500 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none w-full rounded p-2 overflow-y-hidden"
          value={text}
          onChange={handleOnChange}
          placeholder="Enter your text here"
          rows={5}
          style={textStyle}
          spellCheck={true} // Enables browser spell check
        />
      </div>
      <div className="grid grid-cols-3 gap-2 items-center mx-auto w-1/2">
        {functionButtonNames.map((name, index) => (
          <button
            key={index}
            disabled={text.length === 0}
            className={`relative group text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
              text.length === 0
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }`}
            onClick={functionHandlers[index]}
          >
            {name}
            <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-600 text-white text-xs rounded px-2 py-1">
              {name}
            </span>
          </button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2 items-center mx-auto w-1/2">
        <select
          onChange={(e) => changeFontFamily(e.target.value)}
          className={`text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
            text.length === 0
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer"
          }`}
        >
          {fonts.map((font) => (
            <option className="text-pink-600" key={font} value={font}>
              Font Family - {font}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Enter Font Size"
          onChange={(e) => changeFontSize(`${e.target.value}px`)}
          className={`text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
            text.length === 0
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer"
          }`}
        />
        <select
          onChange={(e) => setTextAlignment(e.target.value)}
          className={`text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
            text.length === 0
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer"
          }`}
        >
          <option className="text-pink-600" value="Left">
            Left
          </option>
          <option className="text-pink-600" value="Right">
            Right
          </option>
          <option className="text-pink-600" value="Center">
            Center
          </option>
        </select>
      </div>
      <div className="w-1/2 mx-auto my-2">
        <h3 className="text-white bg-gradient-to-r from-lime-500 via-lime-600 to-lime-700 font-medium rounded-full px-5 text-center">
          Preview
        </h3>
        <div
          className="mt-10 p-6 border-2 border-lime-500 rounded-lg bg-white shadow-lg w-full max-w-3xl"
          style={textStyle}
        >
          {text.length > 0 ? text : "Enter text in the textbox to Preview"}
        </div>
      </div>
    </div>
  );
};

export default TextUtils;
