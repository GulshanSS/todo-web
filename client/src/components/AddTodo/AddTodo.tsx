import { useState } from "react";

const AddTodo = () => {
  const [task, setTask] = useState("");
  return (
    <>
      <div className="flex justify-center p-2 bg-slate-400">
        <input
          type="text"
          className="w-96 px-3 py-2 rounded-md focus:outline-none"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button className="ml-2 px-5 py-2 rounded-md bg-black text-white">
          Add
        </button>
      </div>
    </>
  );
};

export default AddTodo;
