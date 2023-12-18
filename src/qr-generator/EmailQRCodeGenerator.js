import React, { useState } from 'react';
import QRCode from 'qrcode.react';

const QRCodeGenerator = () => {
  const [email, setEmail] = useState('');
  const [generatedQR, setGeneratedQR] = useState(null);
  const [isValidEmail, setIsValidEmail] = useState(true);

  const generateQRCode = () => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);

    if (isEmailValid) {
      // Construct data string
      const dataString = `Email: ${email}`;

      // Set the generated QR code data
      setGeneratedQR(dataString);
      setIsValidEmail(true);
    } else {
      // Set email validation error
      setIsValidEmail(false);
      setGeneratedQR(null);
    }
  };

  const clearInput = () => {
    setEmail('');
    setGeneratedQR(null);
    setIsValidEmail(true);
  };

  return (
    <div style={{  textAlign: 'center' }}>
      <h2>QR Code Generator</h2>

      <label htmlFor="emailInput" style={{ display: 'block', marginBottom: '8px' }}>
        Email:
      </label>
      <div style={{ display: 'flex', marginBottom: '16px' }}>
        <input
          type="text"
          id="emailInput"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ flex: 1, padding: '8px', marginRight: '8px' }}
        />
        <button onClick={clearInput} style={{ padding: '8px' }}>
          Clear
        </button>
      </div>

      {!isValidEmail && <p style={{ color: 'red', marginBottom: '16px' }}>Please enter a valid email address.</p>}

      <button
        onClick={generateQRCode}
        style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', cursor: 'pointer' }}
      >
        Generate QR Code
      </button>

      <div style={{ marginTop: '16px' }}>
        {/* Display QR Code */}
        {generatedQR && <QRCode value={generatedQR} />}
      </div>
    </div>
  );
};

export default QRCodeGenerator;
