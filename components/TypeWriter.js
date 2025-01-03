import { useEffect, useRef, useState } from 'react';

const Typewriter = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const indexRef = useRef(0); // Keeps track of the character index
  const isErasingRef = useRef(false); // Indicates if erasing
  const typingSpeed = 100; // Speed of typing (ms per character)
  const eraseSpeed = 50; // Speed of erasing (ms per character)
  const delay = 1000; // Delay before erasing starts (ms)

  useEffect(() => {
    const typeWriter = () => {
      if (!isErasingRef.current && indexRef.current <= text.length) {
        // Typing effect
        setDisplayText(text.slice(0, indexRef.current));
        indexRef.current++;
        setTimeout(typeWriter, typingSpeed);
      } else if (isErasingRef.current && indexRef.current > 0) {
        // Erasing effect
        setDisplayText(text.slice(0, indexRef.current - 1));
        indexRef.current--;
        setTimeout(typeWriter, eraseSpeed);
      } else {
        // Switch between typing and erasing
        isErasingRef.current = !isErasingRef.current;
        setTimeout(typeWriter, isErasingRef.current ? delay : 0);
      }
    };

    typeWriter(); // Start the typewriter effect

    return () => {
      // Cleanup on unmount
      indexRef.current = 0;
      isErasingRef.current = false;
      setDisplayText('');
    };
  }, [text]);

  return (
    <span
      className="text-gray-400 text-sm font-mono">
      {displayText}
    </span>
  );
};

export default Typewriter;
