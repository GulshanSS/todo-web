import { useContext, useState } from "react";
import { ToggleContext } from "../../context/ToggleContext";

const AddTodo = () => {
  const [task, setTask] = useState("");
  const { toggle, setToggle } = useContext(ToggleContext);
  return (
    <>
      <div className="w-screen h-screen fixed z-10 flex justify-center items-start pt-40 backdrop-blur-sm">
        <div className="w-96 z-10 flex flex-row p-2 bg-slate-400 rounded-md shadow-2xl">
          <input
            type="text"
            className="w-96 px-3 py-2 rounded-md focus:outline-none"
            placeholder="Enter a task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button
            onClick={() => setToggle(!toggle)}
            className="ml-2 px-5 py-2 rounded-md bg-black text-white"
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
};

export default AddTodo;
