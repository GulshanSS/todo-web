import AddTodo from "./components/AddTodo/AddTodo";
import OTPInputField from "./components/Auth/OTPInputField.tsx/OTPInputField";
import Todo from "./components/Todo/Todo";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import VerifyOTP from "./pages/Auth/VerifyOTP";

const App = () => {
  return (
    <>
      <div>
        <Login />
        <Register />
        <VerifyOTP />
        <AddTodo />
        <Todo />
      </div>
    </>
  );
};

export default App;
