import { AiOutlinePlus } from "react-icons/ai";

const AddTodoButton = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Function;
}) => {
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
          ${open ? "rotate-45 bg-red-500" : "bg-slate-500"}
          `}
        onClick={() => setOpen(!open)}
      >
        <AiOutlinePlus />
      </button>
    </>
  );
};

export default AddTodoButton;
