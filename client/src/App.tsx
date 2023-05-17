import AddTodo from "./components/AddTodo/AddTodo";
import Todo from "./components/Todo/Todo";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import VerifyOTP from "./pages/Auth/VerifyOTP";
import Home from "./pages/Home/Home";

const App = () => {
  return (
    <>
      <div>
        <Home />
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
