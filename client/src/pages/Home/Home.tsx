import AddTodo from "../../components/AddTodo/AddTodo";
import Navbar from "../../components/Navbar/Navbar";
import Todo from "../../components/Todo/Todo";

const Home = () => {
  return (
    <>
      <div className="h-screen">
        <Navbar/>
        <AddTodo />
        <Todo />
      </div>
    </>
  );
};

export default Home;
