import './App.css';
import LandingPage from './landingpage.js';
import Login from "./login";
import Register from "./register";
import Dashboard from "./dashboard";
import TableauDeBord from "./tableaudebord";
import Depots from "./depots";
import Materiel from "./materiel";
import Movements from "./movements";
import Reservations from "./reservations";
import UserManagement from "./user_management";
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
