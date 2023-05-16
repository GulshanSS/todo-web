import { RiDeleteBin6Line } from "react-icons/ri";
import { BsPatchCheckFill } from "react-icons/bs";
import { RxLapTimer } from "react-icons/rx";
import { FaPencilAlt } from "react-icons/fa";

const Todo = () => {
  const TodoStatusVariants = {
    inProgress: "text-orange-500",
    complete: "text-green-500",
  };

  return (
    <>
      <div className="flex justify-between px-5 py-2 m-2 rounded-md bg-slate-200">
        <h3 className="font-bold text-justify">First Todo</h3>
        <div className="text-xl ml-2 flex gap-1">
          <button className={TodoStatusVariants.inProgress}>
            <RxLapTimer />
          </button>
          <button>
            <BsPatchCheckFill className={TodoStatusVariants.complete} />
          </button>
          <button className="text-indigo-700">
            <FaPencilAlt />
          </button>
          <button className="text-red-500">
            <RiDeleteBin6Line />
          </button>
        </div>
      </div>
    </>
  );
};

export default Todo;
