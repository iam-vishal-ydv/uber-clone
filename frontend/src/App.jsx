import "./App.css";
import { Routes, Route } from "react-router-dom";

import UserSignup from "./pages/UserSignup";
import Cpatainlogin from "./pages/Cpatainlogin";
import CaptainSignup from "./pages/CaptainSignup";
import Userlogin from "./pages/Userlogin";
import Start from "./pages/Start";
import Home from "./pages/Home";
import ProtectedRoute from "./routes/ProtectedRoute";
import UserLogout from "./pages/UserLogout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/user-login" element={<Userlogin />} />
        <Route path="/user-signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<Cpatainlogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />

        {/* All routes inside this <Route> will be protected */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/user-logout" element={<UserLogout />} />
          {/* add more protected routes here */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
