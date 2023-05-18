import { useState } from "react";
import { MdKey } from "react-icons/md";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

const PasswordInputField = ({ placeholder }: { placeholder: string }) => {
  const [value, setValue] = useState("");
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <div className="w-96 flex rounded-md border border-solid border-slate-700 bg-slate-500 m-2">
        <div className="w-10 p-2 text-xl text-center text-white ">
          <MdKey />
        </div>
        <input
          className="w-full p-2 focus:outline-none"
          type={toggle ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          className="w-10 text-xl text-slate-500 bg-white rounded-r-md"
          onClick={(e) => setToggle(!toggle)}
        >
          {toggle ? <AiFillEye /> : <AiFillEyeInvisible />}
        </button>
      </div>
    </>
  );
};

export default PasswordInputField;
