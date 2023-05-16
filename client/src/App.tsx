import AddTodo from "./components/AddTodo/AddTodo";
import PasswordInputField from "./components/Auth/PasswordInputField/PasswordInputField";
import UsernameInputField from "./components/Auth/UsernameInputField/UsernameInputField";
import Todo from "./components/Todo/Todo";

const App = () => {
  return (
    <>
      <div>
        <UsernameInputField />
        <PasswordInputField />
        <AddTodo />
        <Todo />
      </div>
    </>
  );
};

export default App;
