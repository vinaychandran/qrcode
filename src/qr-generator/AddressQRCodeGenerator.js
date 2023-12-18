import React, { useState } from 'react';
import QRCode from 'qrcode.react';

const AddressQRCodeGenerator = () => {
  const [postalCode, setPostalCode] = useState('');
  const [doorAndStreet, setDoorAndStreet] = useState('');
  const [generatedQR, setGeneratedQR] = useState(null);
  const [apiResult, setApiResult] = useState(null);

  const generateQRCode = async () => {
    // Basic postal code validation (adjust as needed)
    const postalCodeRegex = /^\d{7}$/;
    const isPostalCodeValid = postalCodeRegex.test(postalCode);

    // Validate other fields as needed

    if (isPostalCodeValid) {
      try {
        const myHeaders = new Headers();
        myHeaders.append("apikey", "vN2eJCtaO1iKRooonHvdoVYpSi8bqE7ARxki8UW");

        const requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        const response = await fetch(`https://apis.postcode-jp.com/api/v5/postcodes/${postalCode}`, requestOptions);
        const result = await response.json();

        // Set the API result in the state
        setApiResult(result);

        if (result.length > 0) {
          // Construct data string from API response and additional fields
          const dataString = `Postal Code: ${postalCode}\nDoor and Street: ${doorAndStreet}\nPrefecture: ${result[0].pref}\nCity: ${result[0].city}\nTown: ${result[0].town}`;

          // Set the generated QR code data
          setGeneratedQR(dataString);
        } else {
          // Clear the generated QR code if no data is found
          setGeneratedQR(null);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      // Clear the generated QR code and API result if postal code is invalid
      setGeneratedQR(null);
      setApiResult(null);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', textAlign: 'center' }}>
      <h2>Address QR Code Generator</h2>

      <label htmlFor="postalCodeInput" style={{ display: 'block', marginBottom: '8px' }}>
        Postal Code:
      </label>
      <input
        type="text"
        id="postalCodeInput"
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '16px' }}
      />

      <label htmlFor="doorAndStreetInput" style={{ display: 'block', marginBottom: '8px' }}>
        Door and Street:
      </label>
      <input
        type="text"
        id="doorAndStreetInput"
        value={doorAndStreet}
        onChange={(e) => setDoorAndStreet(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '16px' }}
      />

      <button
        onClick={generateQRCode}
        style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', cursor: 'pointer' }}
      >
        Generate QR Code
      </button>

      <div style={{ marginTop: '16px' }}>
        {/* Display QR Code */}
        {generatedQR && <QRCode value={generatedQR} />}

        {/* Display API result (for testing purposes) */}
        {apiResult && (
          <div>
            <h3>API Result:</h3>
            <pre>{JSON.stringify(apiResult, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressQRCodeGenerator;
