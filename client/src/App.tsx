import RequireUser from "./components/Auth/RequireUser/RequireUser";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import VerifyOTP from "./pages/Auth/VerifyOTP";
import Home from "./pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route element={<RequireUser />}>
            <Route path="/" element={<Navbar />}>
              <Route index element={<Home />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
