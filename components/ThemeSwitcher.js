import React, { useContext, useState } from 'react';
import { ThemeContext } from '@/context/ThemeContext';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false); // Dropdown visibility state

  const options = [
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
    { value: "system", label: "System" },
  ];

  const handleSelection = (value) => {
    setTheme(value);
    setIsOpen(false); // Close the dropdown after selection
  };


  return (
       <div className="relative inline-block w-28">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-28 text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-left flex justify-between items-center"
      >
        <span>{options.find((opt) => opt.value === theme)?.label || "Select Theme"}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 transform ${isOpen ? "rotate-180" : "rotate-0"}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <ul className="absolute z-10 w-28 bg-white shadow-lg rounded-lg mt-2 overflow-hidden">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelection(option.value)}
              className={`px-4 py-2 cursor-pointer text-pink-600 hover:bg-gradient-to-r from-pink-600 via-pink-500 to-pink-400 hover:text-white ${
                theme === option.value ? "bg-gradient-to-r from-pink-600 via-pink-500 to-pink-400 text-white" : ""
              }`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ThemeSwitcher;
