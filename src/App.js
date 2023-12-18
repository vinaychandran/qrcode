import EmailQRCodeGenerator from './qr-generator/EmailQRCodeGenerator'
import AddressQRCodeGenerator from './qr-generator/AddressQRCodeGenerator';

function App() {
  return (
    <>
    <EmailQRCodeGenerator />
    <AddressQRCodeGenerator />
    </>
  );
}

export default App;
