import AddTodo from "./components/AddTodo/AddTodo";
import Todo from "./components/Todo/Todo";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

const App = () => {
  return (
    <>
      <div>
        <Login />
        <Register />
        <AddTodo />
        <Todo />
      </div>
    </>
  );
};

export default App;
