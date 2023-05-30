import { Controller, useFormContext } from "react-hook-form";
import { FaUserAlt } from "react-icons/fa";

const UsernameInputField = ({ name }: { name: string }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <div className="w-96 flex rounded-md border border-solid border-slate-700 m-2 bg-slate-500">
        <Controller
          control={control}
          defaultValue=""
          name={name}
          render={({ field }) => (
            <>
              <div className="w-10 p-2 text-xl text-center text-white">
                <FaUserAlt />
              </div>
              <input
                {...field}
                className="w-full focus:outline-none p-2 rounded-r-md"
                type="text"
                placeholder="Enter Username"
              />
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

export default UsernameInputField;
