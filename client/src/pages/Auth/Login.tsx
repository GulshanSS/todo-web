import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import PasswordInputField from "../../components/Auth/PasswordInputField/PasswordInputField";
import UsernameInputField from "../../components/Auth/UsernameInputField/UsernameInputField";
import { AiOutlineGoogle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { object, TypeOf, string } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginUserMutation } from "../../redux/api/authApi";
import { useEffect, useState } from "react";

const LoginSchema = object({
  email: string().min(1, "Email is requied").email("Email Address is invalid"),
  password: string().min(1, "Password is required"),
});

export type LoginInput = TypeOf<typeof LoginSchema>;

const Login = () => {
  const [loginError, setLoginError] = useState<string>("");

  const methods = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
  });

  const [loginUser, { isLoading, isSuccess, error, isError }] =
    useLoginUserMutation();

  const navigate = useNavigate();

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }

    if (isError) {
      if (error?.data.userId) {
        navigate("/verify-otp", {
          state: {
            userId: error?.data.userId,
            message: error?.data.message,
          },
        });
      }
      setLoginError(error?.data.message);
      console.log(error);
    }
  }, [isLoading]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  });

  const onSubmitHandler: SubmitHandler<LoginInput> = (values) => {
    loginUser(values);
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
            <PasswordInputField name="password" placeholder="Enter Password" />
            {loginError !== "" && (
              <span className="flex justify-center font-bold text-sm text-red-900">
                {loginError}
              </span>
            )}
            <div className="flex flex-col items-center gap-1">
              <button
                type="submit"
                className="w-72 mt-2 px-5 py-2 text-slate-500 font-bold bg-slate-300 rounded-md"
              >
                Login
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
                <Link to="/register">
                  <b className="ml-2 uppercase">Register Page</b>
                </Link>
              </span>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default Login;
