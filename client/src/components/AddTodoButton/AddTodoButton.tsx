import { useContext } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { ToggleContext } from "../../context/ToggleContext";

const AddTodoButton = () => {
  const { toggle, setToggle } = useContext(ToggleContext);
  return (
    <>
      <button
        className={`
          z-10 
          w-10 
          h-10 
          fixed 
          bottom-0 
          right-0 
          m-8 
          flex 
          justify-center 
          items-center 
          rounded-full 
          font-bold 
          text-slate-200 
          text-2xl 
          ${toggle ? "rotate-45 bg-red-500" : "bg-slate-500"}
          `}
        onClick={() => setToggle(!toggle)}
      >
        <AiOutlinePlus />
      </button>
    </>
  );
};

export default AddTodoButton;
