import EmailQRCodeGenerator from './qr-generator/EmailQRCodeGenerator'
import AddressQRCodeGenerator from './qr-generator/AddressQRCodeGenerator';

function App() {
  return (
    <div style={{display:'flex', justifyContent:'space-around'}}> 
    <EmailQRCodeGenerator />
    <AddressQRCodeGenerator />
    </div>
  );
}

export default App;
