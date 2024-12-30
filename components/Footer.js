import React from 'react';
import { FaGithub } from "react-icons/fa6";


const Footer = () => {
  return (
    <div className='w-full'>
        <div className='w-1/2 mx-auto'>
            <span className='flex items-center'>Made with &#x2665;&#xfe0f; by <a href="https://github.com/Ehtesham-Ul-Haq" className='flex items-center hover:text-pink-500'><FaGithub className='mx-1' /> Ehtesham Ul Haq</a></span>
        </div>
    </div>
  );
}

export default Footer;
