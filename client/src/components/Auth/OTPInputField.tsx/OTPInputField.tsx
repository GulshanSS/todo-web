import { useState } from "react";

const OTPInputField = () => {
  const [value, setValue] = useState("");
  return (
    <>
      <input
        className="w-12 h-16 text-5xl font-semibold text-center focus:outline-none rounded-md m-1"
        type="text"
        maxLength={1}
        minLength={1}
        placeholder="0"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </>
  );
};

export default OTPInputField;
