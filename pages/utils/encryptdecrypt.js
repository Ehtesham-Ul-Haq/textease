import { useState } from 'react';
import CryptoJS from 'crypto-js';

const TextEncryptor = () => {
  const [text, setText] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [encryptedText, setEncryptedText] = useState('');
  const [decryptedText, setDecryptedText] = useState('');

  // Encrypt function
  const encryptText = (text, secretKey) => {
    return CryptoJS.AES.encrypt(text, secretKey).toString();
  };

  // Decrypt function
  const decryptText = (encryptedText, secretKey) => {
    const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  // Handle encryption
  const handleEncrypt = () => {
    const encrypted = encryptText(text, secretKey);
    setEncryptedText(encrypted);
    setDecryptedText(''); // Clear decrypted text when encrypting
  };

  // Handle decryption
  const handleDecrypt = () => {
    const decrypted = decryptText(encryptedText, secretKey);
    setDecryptedText(decrypted);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-pink-600 mb-8 text-center">Text Encryptor/Decryptor</h1>

      <div className="mb-4 w-full max-w-2xl">
        <textarea
          placeholder="Enter text to encrypt..."
          className="p-4 border-2 border-pink-500 rounded-lg shadow-md w-full focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none"
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className="mb-4 w-full max-w-2xl">
        <input
          type="text"
          placeholder="Enter secret key..."
          className="p-4 border-2 border-pink-500 rounded-lg shadow-md w-full focus:outline-none focus:ring-2 focus:ring-pink-400"
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
        />
      </div>

      <div className="flex gap-4 mb-6">
        <button
          className="bg-pink-500 text-white p-2 rounded-md"
          onClick={handleEncrypt}
          disabled={!text || !secretKey}
        >
          Encrypt
        </button>
        <button
          className="bg-lime-500 text-white p-2 rounded-md"
          onClick={handleDecrypt}
          disabled={!encryptedText || !secretKey}
        >
          Decrypt
        </button>
      </div>

      {encryptedText && (
        <div className="mb-4 w-full max-w-2xl">
          <h2 className="text-xl font-semibold text-pink-600">Encrypted Text</h2>
          <textarea
            className="p-4 border-2 border-pink-500 rounded-lg shadow-md w-full focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none"
            rows={4}
            readOnly
            value={encryptedText}
          />
        </div>
      )}

      {decryptedText && (
        <div className="w-full max-w-2xl">
          <h2 className="text-xl font-semibold text-lime-600">Decrypted Text</h2>
          <textarea
            className="p-4 border-2 border-lime-500 rounded-lg shadow-md w-full focus:outline-none focus:ring-2 focus:ring-lime-400 resize-none"
            rows={4}
            readOnly
            value={decryptedText}
          />
        </div>
      )}
    </div>
  );
};

export default TextEncryptor;
