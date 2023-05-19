import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import VerifyOTP from "./pages/Auth/VerifyOTP";
import Home from "./pages/Home/Home";

const App = () => {
  return (
    <>
      <div>
        <Login />
        <Register />
        <VerifyOTP />
        <Home />
      </div>
    </>
  );
};

export default App;
