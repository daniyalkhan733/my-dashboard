import { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';

const key = import.meta.env.VITE_CRYPTO_SECRET;

const useEncryptedClientData = () => {
  const [clientData, setClientData] = useState(null);

  useEffect(() => {
    const encryptedClientData = localStorage.getItem('encryptedClientData');

    if (encryptedClientData) {
      const decryptedClientData = decryptClientData(encryptedClientData);
      if (decryptedClientData) {
        setClientData(JSON.parse(decryptedClientData));
      } else {
        localStorage.removeItem('encryptedClientData');
      }
    }
  }, []);

  const setEncryptedClientData = (newClientData) => {
    const encryptedNewClientData = encryptClientData(JSON.stringify(newClientData));
    localStorage.setItem('encryptedClientData', encryptedNewClientData);
    setClientData(newClientData);
  };

  const encryptClientData = (clientData) => {
    const encrypted = CryptoJS.AES.encrypt(clientData, key).toString();
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
      return null;
    }
  };

  return [clientData, setEncryptedClientData];
};

export default useEncryptedClientData;
