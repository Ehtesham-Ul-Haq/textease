import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const AnimatedText = ({ texts }) => {
  const el = useRef(null); // Reference for the element to contain the typing animation

  useEffect(() => {
    const options = {
      strings: texts, // Use the `texts` prop for multiple strings
      typeSpeed: 50,  // Speed of typing
      backSpeed: 30,  // Speed of erasing
      backDelay: 1000, // Delay before backspacing
      loop: true,     // Loop the animation infinitely
    };

    const typed = new Typed(el.current, options);

    return () => {
      typed.destroy(); // Cleanup Typed instance on component unmount
    };
  }, [texts]); // Re-run effect if `texts` changes

  return <span ref={el} className='text-pink-600'></span>;
};

export default AnimatedText;
