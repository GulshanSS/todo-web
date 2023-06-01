import PasswordInputField from "../../components/Auth/PasswordInputField/PasswordInputField";
import UsernameInputField from "../../components/Auth/UsernameInputField/UsernameInputField";
import { AiOutlineGoogle } from "react-icons/ai";
import { object, TypeOf, string } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterUserMutation } from "../../redux/api/authApi";
import { useEffect, useState } from "react";

const RegisterSchema = object({
  email: string().min(1, "Email is required").email("Email Address is invalid"),
  password: string().min(1, "Password is required"),
  confirmPassword: string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match",
});

export type RegisterInput = TypeOf<typeof RegisterSchema>;

const Register = () => {
  const [registerError, setRegisterError] = useState<string>("");

  const methods = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
  });

  const [registerUser, { isLoading, isSuccess, error, isError, data }] =
    useRegisterUserMutation();

  const navigate = useNavigate();

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSuccess) {
      navigate("/verify-otp");
    }

    if (isError) {
      setRegisterError(error?.data.message);
      console.log(error);
    }
  }, [isLoading]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  });

  const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
    registerUser({
      email: values.email,
      password: values.password,
    });
  };

  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center items-center bg-slate-500">
        <h3 className="text-3xl font-bold text-slate-300">TodoWeb</h3>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            noValidate
            autoComplete="off"
          >
            <UsernameInputField name="email" />
            <PasswordInputField
              name="password"
              placeholder="Enter New Password"
            />
            <PasswordInputField
              name="confirmPassword"
              placeholder="Enter Confirm Password"
            />
            {registerError !== "" && (
              <span className="flex justify-center font-bold text-sm text-red-900">
                {registerError}
              </span>
            )}
            <div className="flex flex-col items-center gap-1">
              <button
                type="submit"
                className="w-72 mt-2 px-5 py-2 text-slate-500 font-bold bg-slate-300 rounded-md"
              >
                Register
              </button>
              <span className="font-bold text-sm text-slate-300 my-2">OR</span>
              <div className="flex justify-center items-center w-72 mt-2 px-5 py-2 text-white font-bold bg-red-500 rounded-md">
                <span className="mr-2 text-xl">
                  <AiOutlineGoogle />
                </span>
                <button>Continue with Google</button>
              </div>
              <span className="text-sm text-slate-300 mt-2">
                Go to
                <Link to="/login">
                  <b className="ml-2 uppercase">Login Page</b>
                </Link>
              </span>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default Register;
