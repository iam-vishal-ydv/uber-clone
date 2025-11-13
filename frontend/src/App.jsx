import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import UserSignup from "./pages/UserSignup";
import Cpatainlogin from "./pages/Cpatainlogin";
import CaptainSignup from "./pages/CaptainSignup";
import Userlogin from "./pages/Userlogin";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-login" element={<Userlogin />} />
        <Route path="/user-signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<Cpatainlogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
      </Routes>
    </>
  );
}

export default App;
