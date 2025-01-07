// components/MarkdownConverter.js
import { useState } from 'react';
import { marked } from 'marked';
import 'prismjs/themes/prism-tomorrow.css'; // Import PrismJS theme for code block syntax highlighting
import Prism from 'prismjs';

const MarkdownConverter = () => {
  const [text, setText] = useState('');
  const [markdown, setMarkdown] = useState('');

  const handleTextChange = (e) => {
    const inputText = e.target.value;
    setText(inputText);

    // Convert markdown to HTML and highlight code blocks
    const convertedMarkdown = marked(inputText);
    Prism.highlightAll(); // Re-highlight code blocks with Prism.js
    setMarkdown(convertedMarkdown);
  };

  return (
    <div className="flex flex-col md:flex-row items-start justify-center p-2 min-h-screen overflow-hidden">
      {/* Left Section: Markdown Input Area */}
      <div className="flex flex-col w-full max-w-3xl md:w-1/2 mb-6 md:mb-0 pr-2">
        <h1 className="text-3xl font-bold mb-2 text-center">Markdown Converter</h1>
        
        <textarea
          placeholder="Enter your markdown text here..."
          className="w-full h-screen p-2 mt-1 border border-gray-300 overflow-auto flex-grow flex-shrink text-xs"
          value={text}
          onChange={handleTextChange}
        />
      </div>
      
      {/* Right Section: Live Preview */}
      <div className="w-full max-w-3xl md:w-1/2">
        <h2 className="text-2xl font-semibold mb-4 text-center">Live Preview</h2>
        
        {/* Preview Section with Prose Class for Styling */}
        <div
          className="prose lg:prose-base prose-h1:text-3xl max-w-full p-4 rounded-md shadow-md border m-0 font-sans text-gray-800 bg-gray-100 overflow-auto w-full h-screen mt-1 border-gray-300 flex-grow flex-shrink"
          dangerouslySetInnerHTML={{ __html: markdown }}
        />
      </div>
    </div>
  );
};

export default MarkdownConverter;
