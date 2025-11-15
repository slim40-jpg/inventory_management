import './App.css';
import LandingPage from './landingpage.js';
import Login from "./login";
import Register from "./register";
import Dashboard from "./dashboard";
import TableauDeBord from "./tableaudebord";
import Depots from "./depots";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tableau-de-bord" element={<TableauDeBord />} />
        <Route path="/depots" element={<Depots />} />
      </Routes>
    </Router>
  );
}
 



export default App;
