import { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';

const key = import.meta.env.VITE_CRYPTO_SECRET;

const useEncryptedClientData = () => {
  const [clientData, setClientData] = useState(null);

  useEffect(() => {
    const encryptedClientData = localStorage.getItem('encryptedClientData');
    console.log("Encrypted Client Data:", encryptedClientData);

    if (encryptedClientData) {
      const decryptedClientData = decryptClientData(encryptedClientData);
      if (decryptedClientData) {
        setClientData(JSON.parse(decryptedClientData));
      } else {
        localStorage.removeItem('encryptedClientData');
        console.warn("Corrupted encrypted data removed from localStorage.");
      }
    }
  }, []);

  const setEncryptedClientData = (newClientData) => {
    const encryptedNewClientData = encryptClientData(JSON.stringify(newClientData));
    localStorage.setItem('encryptedClientData', encryptedNewClientData);
    setClientData(newClientData);
  };

  const encryptClientData = (clientData) => {
    console.log("Encrypting data...");
    const encrypted = CryptoJS.AES.encrypt(clientData, key).toString();
    console.log("Encrypted Data:", encrypted);
    return encrypted;
  };

  const decryptClientData = (encryptedClientData) => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedClientData, key);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);

      if (!decrypted) {
        throw new Error("Decryption resulted in an empty string.");
      }

      return decrypted;
    } catch (error) {
      console.error("Decryption error:", error);
      return null;
    }
  };

  return [clientData, setEncryptedClientData];
};

export default useEncryptedClientData;
