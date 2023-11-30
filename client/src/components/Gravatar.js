import React from 'react';
import CryptoJS from 'crypto-js';

const Gravatar = ({ email, size = 200 }) => {
    // Generate an MD5 hash of the email address
    const emailHash = CryptoJS.MD5(email.toLowerCase());

    // Construct the Gravatar URL
    const gravatarUrl = `https://www.gravatar.com/avatar/${emailHash}?d=wavatar&s=${size}`;

    return <img src={gravatarUrl} alt="Gravatar" style={{ borderRadius: '50%', width: size, height: size }} />;
};

export default Gravatar;
