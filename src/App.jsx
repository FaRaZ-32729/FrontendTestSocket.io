import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddDevice from "./pages/AddDevice";
import Navbar from "./component/Navbar";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-device" element={<AddDevice />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;