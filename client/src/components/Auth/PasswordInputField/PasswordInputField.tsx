import { useState } from "react";
import { MdKey } from "react-icons/md";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

const PasswordInputField = () => {
  const [value, setValue] = useState("");
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <div className="w-96 flex rounded-md border border-solid border-black bg-slate-500 m-2">
        <div className="w-10 p-2 text-xl text-center text-white ">
          <MdKey />
        </div>
        <input
          className="w-full p-2 focus:outline-none"
          type={toggle ? "text" : "password"}
          placeholder="Enter Password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          className="w-10 text-xl bg-white rounded-r-md"
          onClick={(e) => setToggle(!toggle)}
        >
          {toggle ? <AiFillEye /> : <AiFillEyeInvisible />}
        </button>
      </div>
    </>
  );
};

export default PasswordInputField;
