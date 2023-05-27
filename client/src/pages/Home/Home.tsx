import { useState } from "react";
import AddTodo from "../../components/AddTodo/AddTodo";
import AddTodoButton from "../../components/AddTodoButton/AddTodoButton";
import ListTodos from "../../components/ListTodos/ListTodos";

const Home = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="h-screen">
        {open ? <AddTodo open={open} setOpen={setOpen} /> : null}
        <ListTodos />
        <AddTodoButton open={open} setOpen={setOpen} />
      </div>
    </>
  );
};

export default Home;
