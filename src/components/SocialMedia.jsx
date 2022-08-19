import React from 'react';
import { BsLinkedin, BsInstagram } from 'react-icons/bs';

const SocialMedia = () => {
  return (
    <div className="app__social">
      <div>
        <a href="https://www.linkedin.com/in/alina-kovaleva/" target="_blank">
          <BsLinkedin />
        </a>
      </div>
      <div>
        <a href="https://www.instagram.com/littlecrazylina/" target="_blank">
          <BsInstagram />
        </a>
      </div>
    </div>
  );
};

export default SocialMedia;
