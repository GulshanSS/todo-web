import { useState } from "react";
import { MdKey } from "react-icons/md";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Controller, useFormContext } from "react-hook-form";

const PasswordInputField = ({
  name,
  placeholder,
}: {
  name: string;
  placeholder: string;
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <div className="w-96 flex rounded-md border border-solid border-slate-700 bg-slate-500 m-2">
        <Controller
          control={control}
          defaultValue=""
          name={name}
          render={({ field }) => (
            <>
              <div className="w-10 p-2 text-xl text-center text-white ">
                <MdKey />
              </div>
              <input
                {...field}
                placeholder={placeholder}
                className="w-full p-2 focus:outline-none"
                type={toggle ? "text" : "password"}
              />
              <button
                className="w-10 text-xl text-slate-500 bg-white rounded-r-md"
                onClick={(e) => setToggle(!toggle)}
              >
                {toggle ? <AiFillEye /> : <AiFillEyeInvisible />}
              </button>
              {errors[name] ? (
                <p className="text-sm text-red-500">errors[name].message</p>
              ) : (
                ""
              )}
            </>
          )}
        />
      </div>
    </>
  );
};

export default PasswordInputField;
