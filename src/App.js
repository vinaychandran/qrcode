import styles from './App.module.css';

import EmailQRCodeGenerator from './qr-generator/EmailQRCodeGenerator'
import AddressQRCodeGenerator from './qr-generator/AddressQRCodeGenerator';

function App() {
  return (
    <div className={styles.app}> 
      <EmailQRCodeGenerator />
      <AddressQRCodeGenerator />
    </div>
  );
}

export default App;


