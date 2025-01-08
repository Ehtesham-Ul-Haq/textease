import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const [dropdown1, setDropdown1] = useState(false);

  return (
    <div className="w-full flex items-center justify-between border-b mb-2">
      <div className="mx-2">
        <Link href={"/"}>
          <h1 className="text-3xl font-extrabold font-serif bg-gradient-to-r from-pink-500 via-red-500 to-purple-500 text-transparent bg-clip-text animate-pulse drop-shadow-md">
            Text<span className="italic">Ease</span>
          </h1>
        </Link>{" "}
      </div>
      <div>
<ul className="flex items-center space-x-2">
  <li className="group relative hover:text-pink-600">
    Utils
    <ul className="absolute top-6 -left-6-0 w-96 hidden group-hover:block bg-white space-y-2 shadow-lg rounded-md p-2 z-50">
      <Link href={"/utils/textutils"} className="block hover:bg-pink-600 hover:text-white border border-black px-2">
        <li>TextUtils</li>
      </Link>
      <Link href={"/utils/textcomparison"} className="block hover:bg-pink-600 hover:text-white border border-black px-2">
        <li>Compare Text</li>
      </Link>
      <Link href={"/utils/qrcodegenerator"} className="block hover:bg-pink-600 hover:text-white border border-black px-2">
        <li>Generate QRCode</li>
      </Link>
      <Link href={"/utils/wordcloud"} className="block hover:bg-pink-600 hover:text-white border border-black px-2">
        <li>Word Cloud</li>
      </Link>
      <Link href={"/utils/encryptdecrypt"} className="block hover:bg-pink-600 hover:text-white border border-black px-2">
        <li>Encrypt & Decrypt</li>
      </Link>
      <Link href={"/utils/markdown"} className="block hover:bg-pink-600 hover:text-white border border-black px-2">
        <li>Markdown</li>
      </Link>
      <Link href={"/utils/JSONMaker"} className="block hover:bg-pink-600 hover:text-white border border-black px-2">
        <li>JSON Maker</li>
      </Link>
      <Link href={"/utils/htmltoimage"} className="block hover:bg-pink-600 hover:text-white border border-black px-2">
        <li>Html to Image</li>
      </Link>
      <Link href={"/utils/texttoemoji"} className="block hover:bg-pink-600 hover:text-white border border-black px-2">
        <li>Text to Emoji</li>
      </Link>
    </ul>
  </li>

          <Link href={"/utils/Base64"} className="hover:text-pink-600">
            <li>Base64 Converter</li>
          </Link>
          <Link href={"/utils/imagetotext"} className="hover:text-pink-600">
            <li>Image to Text</li>
          </Link>
          <Link href={"/utils/urlshortener"} className="hover:text-pink-600">
            <li>URL Shortener</li>
          </Link>
          <Link href={"/about"} className="hover:text-pink-600">
            <li>About Us</li>
          </Link>
          <Link href={"/suggestions"} className="hover:text-pink-600">
            <li>Suggestions</li>
          </Link>
        </ul>
      </div>
      <div className="flex items-center space-x-2 p-2">
        <button
          type="button"
          className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Contact Us
        </button>

        <button
          type="button"
          className="text-white bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Share
        </button>
      </div>
    </div>
  );
};

export default Navbar;
