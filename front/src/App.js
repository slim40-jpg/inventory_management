import './App.css';
import LandingPage from './landingpage.js';
import Login from "./login.js";
import Register from "./register.js";
import Dashboard from "./dashboard.js";
import TableauDeBord from "./tableaudebord.js";
import Depots from "./depots.js";
import Materiel from "./materiel.js";
import Movements from "./movements.js";
import Reservations from "./reservations.js";
import UserManagement from "./user_management.js";
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
        <Route path="/materiel" element={<Materiel />} />
        <Route path="/movements" element={<Movements />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/user_management" element={<UserManagement />} />
      </Routes>
    </Router>
  );
}
 



export default App;
