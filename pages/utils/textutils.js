import React, { useState } from "react";
import { syllable } from "syllable";
import { jsPDF } from 'jspdf';
import keywordExtractor from "keyword-extractor";
import WSEOHead from "@/components/SEOHead";
import Alert from "@/components/Alert";

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
    Alert.success("Converted to Uppercase!");
  };
  const handleLowClick = () => {
    saveForUndo();
    let newText = text.toLowerCase();
    setText(newText);
    Alert.success("Converted to Lowercase!");
  };
  const handleClearClick = () => {
    saveForUndo();
    setText("");
    Alert.success("Text is cleared!");
  };

  const handleCopy = () => {
    saveForUndo();
    navigator.clipboard.writeText(text);
    document.getSelection().removeAllRanges();
    Alert.success("Text Copied to Clipboard!");
  };

  const handleSpeak = () => {
    saveForUndo();
    let msg = new SpeechSynthesisUtterance();
    msg.text = text;
    window.speechSynthesis.speak(msg);
    Alert.success("Listen Your Text!");
  };

  const handleExtraSpaces = () => {
    saveForUndo();
    let newText = text.split(/[ ]+/);

    setText(newText.join(" "));
    Alert.success("Extra spaces removed!");
  };

  const capitalizeFirstLetter = () => {
    saveForUndo();

    let capText = text.charAt(0).toUpperCase() + text.slice(1);

    setText(capText);
    Alert.success("First letter capitalized!");
  };

  const convertToSentenceCase = () => {
    saveForUndo();

    let sentenceText = text
      .split(/([.!?]\s*)/)
      .map(
        (sentence) =>
          sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase()
      )
      .join("");

    setText(sentenceText);
    Alert.success("Converted to Sentence case!");

  };

  const encodeBase64 = () => {
    saveForUndo();

    setText(btoa(text));
    Alert.success("Converted to Base64!");

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
    Alert.success("Numbers Extracted!");

  };

  const extractLinks = () => {
    saveForUndo();

    const links = text.match(/https?:\/\/[^\s]+/g) || [];

    setText(links.join("\n")); // Convert the array of links to a newline-separated string
    Alert.success("Links Extracted!");

  };

  const removeHtmlTags = () => {
    saveForUndo();

    // removes html tags
    const newText = text.replace(/<[^>]*>/g, "");

    setText(newText);
    Alert.success("Html tags are removed!");

  };

  const removeSpecialCharacters = () => {
    saveForUndo();

    const newText = text.replace(/[^a-zA-Z0-9 ]/g, "");

    setText(newText);
    Alert.success("Special characters are removed!");

  };

  const pasteFromClipboard = async () => {
    saveForUndo();

    try {
      // Read the text from the clipboard
      const clipboardText = await navigator.clipboard.readText();

      // Append the clipboard text to the existing text
      setText((prevText) => prevText + " " + clipboardText);
      Alert.success("Paste from clipboard successfully!");
    } catch (error) {
      console.error("Failed to read clipboard contents: ", error);
    }
  };

  const reverseText = () => {
    saveForUndo();

    const newText = text.split("").reverse().join("");

    setText(newText);
    Alert.success("Your text is reversed!");

  };

  const handleSpeechRecognition = () => {
    saveForUndo();

    // Check for browser support
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error("Speech Recognition is not supported in this browser");
      Alert.success("Speech Recognition is not supported in this browser!");

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
    Alert.success("Speech Recognition start successfully!");
  };

  const undo = () => {
    if (undoStack.length > 0) {
      const prevText = undoStack.pop();
      setText(prevText);
      setUndoStack([...undoStack]);
      setRedoStack((prevStack) => [...prevStack, text]);
      Alert.success("Undo successfully!");
    }
  };

  const redo = () => {
    if (redoStack.length > 0) {
      const nextText = redoStack.pop();
      setText(nextText);
      setRedoStack([...redoStack]);
      setUndoStack((prevStack) => [...prevStack, text]);
      Alert.success("Redo successfully!");
    }
  };

  const changeFontFamily = (fontFamily) => {
    saveForUndo();
    setTextStyle((prevStyle) => ({
      ...prevStyle,
      fontFamily: fontFamily,
    }));
    Alert.success("Font family changed for your text!");
  };

  const changeFontSize = (fontSize) => {
    saveForUndo();
    setTextStyle((prevStyle) => ({
      ...prevStyle,
      fontSize: fontSize,
    }));
    Alert.success("Font size changed for your text!");

  };

  const setTextAlignment = (alignment) => {
    saveForUndo();
    setTextStyle((prevStyle) => ({
      ...prevStyle,
      textAlign: alignment,
    }));
    Alert.success("Text alignment changed for your text!");
  };

  const highlightText = () => {
    saveForUndo();
    const highlightedText = text.replace(/\b(\w+)\b/g, "<mark>$1</mark>");
    setText(highlightedText);
    Alert.success("Text highlighted!");

  };

  const handleFindAndReplace = () => {
    const find = prompt("Enter the word you want to find:");
    const replace = prompt("Enter the word you want to replace it with:");

    if (find && replace !== null) {
      findAndReplace(find, replace);
    }
    Alert.success("Find & Replace performed successfully!");

  };

  const findAndReplace = (find, replace) => {
    saveForUndo();
    const newText = text.replace(new RegExp(find, "g"), replace);
    setText(newText);
  };

  const saveTextAsFile = () => {
    const filename = prompt(
      "Please enter the filename:",
      "file.txt"
    );
    if (filename) {
      const blob = new Blob([text], { type: "text/plain" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
      Alert.success("Your text file is downloading!");
    }
  };

  const boldText = () => {
    saveForUndo();
    const newText = `<b>${text}</b>`;
    setText(newText);
    Alert.success("Text styling to BOLD!");
  };

  const italicizeText = () => {
    saveForUndo();
    const newText = `<i>${text}</i>`;
    setText(newText);
    Alert.success("Text styling to ITALIC!");
  };

  const underlineText = () => {
    saveForUndo();
    const newText = `<u>${text}</u>`;
    setText(newText);
    Alert.success("Text styling to underline!");
  };


  const textToPDF = () => {
    const filename = prompt(
      "Please enter the filename:",
      "file.pdf"
    );
    if (filename) {
      const doc = new jsPDF();
      doc.text(text, 10, 10);
      doc.save(`${filename}.pdf`);
      Alert.success("Text file downloaded as PDF file!");
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
      Alert.success("Text file is downloaded as CSV file!");
    }
  }

  const removeEmptyLines = () => {
    saveForUndo();
    const newText = text.split('\n').filter(line => line.trim() !== "").join('\n');
    setText(newText);
    Alert.success("Empty lines removed!");
  }

  const convertToLaTeX = () => {
    saveForUndo();
    const newText = `\\text{${text}}`;
    setText(newText);
    Alert.success("Converted to LaTeX!");
  }

  const highlightKeywords = () => {
    saveForUndo();
    // Extract keywords from the text
    const extractedKeywords = keywordExtractor.extract(text, {
      language: "english",
      remove_digits: true,
      return_changed_case: true,
      remove_duplicates: true,
    });

    // Create a regex pattern for the extracted keywords
    const regex = new RegExp(`\\b(${extractedKeywords.join("|")})\\b`, "gi");

    // Replace keywords in the text with highlighted spans
    const newText = text.replace(regex, (match) => `<span class="bg-yellow-400 font-bold px-1">${match}</span>`);
    setText(newText);
    Alert.success("Keywords highlighted from Text!");
  };





  const functionButtonNames = [
    "Uppercase",
    "Lowercase",
    "Capitalize",
    "Clear",
    "Copy",
    "Text-to-Speech",
    "Trim Spaces",
    "Sentence Case",
    "Base64 Encode",
    "Extract Numbers",
    "Extract Links",
    "Remove HTML",
    "Remove Symbols",
    "Paste",
    "Reverse",
    "Listen",
    "Undo",
    "Redo",
    "Highlight",
    "Find/Replace",
    "Save as TXT",
    "Bold",
    "Italic",
    "Underline",
    "Text to PDF",
    "Text to CSV",
    "Trim Empty Lines",
    "Latex",
    "Mark Keywords",
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
    removeEmptyLines,
    convertToLaTeX,
    highlightKeywords,
  ];

  return (
    <>
      <WSEOHead
        title="TextUtils - TextEase"
        description="Enhance your text with powerful tools: text formatting, word counting, keyword extraction, and more. Simplify your text tasks with ease."
        keywords="text tools, text utilities, word count, keyword extractor, syllable counter, TextEase"
        url="https://texteaseutils.vercel.app/utils/textutils"
      />

      <div>
        <div className="w-11/12 md:w-1/2 mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-pink-600 mb-8 text-center mt-4">
            TextEase - a Text Utility app
          </h2>
          <div className="relative">
            {/* <h2>Your text Summary</h2> */}
            <span className="absolute bottom-1 left-0 text-white shadow-lg dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-full text-[10px] md:text-[12px] text-center justify-between flex w-full">
              <span className="bg-lime-600 px-4 rounded-full">{wordCount} words and {charCount} Characters</span>
              <span className="bg-lime-600 px-4 rounded-full">{countSyllables()} Syllables</span>
              <span className="bg-lime-600 px-4 rounded-full">{readingTime()} Minutes to read</span>
            </span>


          </div>
          <textarea
            className="border-2 text-gray-950 border-pink-500 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none w-full rounded p-2 overflow-y-hidden"
            value={text}
            onChange={handleOnChange}
            placeholder="Enter your text here"
            rows={5}
            style={textStyle}
            spellCheck={true} // Enables browser spell check
          />
        </div>



        <div className="grid grid-cols-2 gap-4 items-center mx-auto w-11/12 md:w-1/2 md:grid-cols-3 lg:grid-cols-4 my-4">
          {functionButtonNames.map((name, index) => (
            <button
              key={index}
              disabled={text.length === 0}
              className={`relative group text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm sm:px-5 md:px-4 py-3 text-center transition-all duration-300 ease-in-out transform hover:scale-105 ${text.length === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
                }`}
              onClick={functionHandlers[index]}
            >
              {name}
              <span className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-700 text-white text-xs rounded px-2 py-1 shadow-md">
                {name}
              </span>
            </button>
          ))}
        </div>



        <div className="grid grid-cols-3 gap-2 items-center mx-auto w-11/12 md:w-1/2">
          <select
            onChange={(e) => changeFontFamily(e.target.value)}
            className={`text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${text.length === 0
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
            className={`text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${text.length === 0
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
              }`}
          />
          <select
            onChange={(e) => setTextAlignment(e.target.value)}
            className={`text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${text.length === 0
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
        <div className="w-11/12 md:w-1/2 mx-auto my-2">
          <h3 className="text-white bg-gradient-to-r from-lime-500 via-lime-600 to-lime-700 font-medium rounded-full px-5 text-center">
            Preview
          </h3>
          <div
            className="mt-10 p-6 border-2 border-lime-500 rounded-lg bg-white text-gray-950 shadow-lg w-full max-w-3xl"
            style={textStyle}
          >
            {text.length > 0 ? text : "Enter text in the textbox to Preview"}
            <div
              dangerouslySetInnerHTML={{ __html: text }}

            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TextUtils;
