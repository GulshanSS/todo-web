import { useState } from "react";
import AddTodo from "../../components/AddTodo/AddTodo";
import AddTodoButton from "../../components/AddTodoButton/AddTodoButton";
import ListTodos from "../../components/ListTodos/ListTodos";
import { ToggleContext } from "../../context/ToggleContext";

const Home = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  return (
    <>
      <div className="h-screen">
        <ToggleContext.Provider value={{ toggle, setToggle }}>
          {toggle ? <AddTodo /> : null}
          <AddTodoButton />
        </ToggleContext.Provider>

        <ListTodos />
      </div>
    </>
  );
};

export default Home;
