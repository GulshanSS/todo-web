import { useState } from "react";
import { FaUserAlt } from "react-icons/fa";

const UsernameInputField = () => {
  const [value, setValue] = useState("");
  return (
    <>
      <div className="w-96 flex rounded-md border border-solid border-black m-2 bg-slate-500">
        <div className="w-10 p-2 text-xl text-center text-white">
          <FaUserAlt />
        </div>
        <input
          className="w-full focus:outline-none p-2 rounded-r-md"
          type="text"
          placeholder="Enter Username"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </>
  );
};

export default UsernameInputField;
