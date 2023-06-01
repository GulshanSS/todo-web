import { Controller, useFormContext } from "react-hook-form";

const OTPInputField = ({ name }: { name: string }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Controller
        control={control}
        defaultValue=""
        name={name}
        render={({ field }) => (
          <input
            {...field}
            className="w-12 h-16 text-5xl font-semibold text-center focus:outline-none rounded-md m-1"
            type="text"
            maxLength={1}
            minLength={1}
            placeholder="0"
          />
        )}
      />
    </>
  );
};

export default OTPInputField;
