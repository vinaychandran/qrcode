import styles from './App.module.css';
import companyLogo from './logo.svg';
import QRCodeGenerator from './qr-generator/QRCodeGenerator'
//import AddressQRCodeGenerator from './qr-generator/AddressQRCodeGenerator';

function App() {
  return (
    <div className={styles.app}> 
      <header>
        <img src={companyLogo} alt="GoToPass logo" width="140px" height="62px" />
        <h1>QR Code Generator</h1>
      </header>
      <section><QRCodeGenerator /></section>
      
      {/* <AddressQRCodeGenerator /> */}
    </div>
  );
}

export default App;


