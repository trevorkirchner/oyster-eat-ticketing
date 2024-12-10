import logo from './logo.svg';
import './App.css';
//import '@aws-amplify/ui-react/styles.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PurchaseTicket from "./PurchaseTicket";
import ScanTicket from "./ScanTicket";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PurchaseTicket />} />
        <Route path="/ticket-scanner" element={<ScanTicket />} />
      </Routes>
    </Router>
  );
}

export default App;
