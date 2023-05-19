import { useState } from "react";
import AddTodo from "../../components/AddTodo/AddTodo";
import Navbar from "../../components/Navbar/Navbar";
import AddTodoButton from "../../components/AddTodoButton/AddTodoButton";
import ListTodos from "../../components/ListTodos/ListTodos";

const Home = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="h-screen">
        <Navbar />
        <ListTodos />
        {open ? <AddTodo /> : null}
        <AddTodoButton open={open} setOpen={setOpen} />
      </div>
    </>
  );
};

export default Home;
