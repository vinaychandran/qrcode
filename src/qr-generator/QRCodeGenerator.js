import React, { useState } from 'react';
import styles from './QRCodeGenerator.module.css'
import { properties } from "../data/propertyList";
import SearchableDropdown from "../SearchableDropdown/SearchableDropdown"
import QRCode from 'qrcode.react';
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const QRCodeGenerator = () => {
  const [employeeID, setemployeeID] = useState('');
  const [dataString, setDataString] = useState('');
  const componentRef = useRef();
  
  const [generatedQR, setGeneratedQR] = useState(null);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [value, setValue] = useState("");
  const [ID, setID] = useState("");


  const generateQRCode = () => {
    // Basic email validation
    const emailRegex = /^[0-9\b]+$/;
    const isEmailValid = emailRegex.test(employeeID);

    if (isEmailValid) {
      // Construct data string
      const string = `https://www.gotopass.jp/signup?propertyid=${ID}&emloyeeid=${employeeID}`;
      // Set the generated QR code data
      setGeneratedQR(string);
      setDataString(string)
      setIsValidEmail(true);
    } else {
      // Set email validation error
      setIsValidEmail(false);
      setGeneratedQR(null);
    }
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  

  const clearInput = () => {
    setemployeeID('');
    setGeneratedQR(null);
    setIsValidEmail(true);
    setDataString('');
  };

  const handlePropertyID = (data) => {
    setID(data)
  }
 
  return (
    <div className={styles.formGenerator}>
      <div >
      <label htmlFor="Search" >
        Select Hotel:
      </label>  
      <SearchableDropdown
        options={properties}
        label="name"
        id="id"
        selectedVal={value}
       
        onHandlePropertyID={handlePropertyID}
        handleChange={(val) => setValue(val)}
      />
    
      <label htmlFor="employeeIDInput">
        Employee ID:
      </label> 
      <input
          type="text"
          id="employeeIDInput"
          value={employeeID}
          onChange={(e) => setemployeeID(e.target.value)}
      />
       
      </div>

      {!isValidEmail && <p style={{ color: 'red', marginBottom: '16px' }}>Please enter a valid employee ID.</p>}

      <button className={styles.button}
        onClick={generateQRCode}
      >
        Generate QR Code
      </button>
      <button onClick={clearInput} className={styles.clear}>
          Clear
        </button>

      <div >
        {/* Display QR Code */}
        <div ref={componentRef} >
         
          {generatedQR && <div className={styles.qrCodeDisaply}> <h3>{employeeID}</h3><QRCode value={generatedQR}  size={256} title="QR CODE" fgColor="#57ac36" /></div>}
        </div>
        {generatedQR && <button className={styles.printButton} onClick={handlePrint}>Print</button>}

        {generatedQR && <div> Generated URL: {dataString}</div>}
      </div>
    </div>
  );
};

export default QRCodeGenerator;
