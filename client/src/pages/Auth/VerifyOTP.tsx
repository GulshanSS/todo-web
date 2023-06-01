import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import OTPInputField from "../../components/Auth/OTPInputField.tsx/OTPInputField";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useSendOTPMutation,
  useVerifyOTPMutation,
} from "../../redux/api/authApi";
import { useEffect, useState } from "react";

const OTPSchema = object({
  a: string().length(1),
  b: string().length(1),
  c: string().length(1),
  d: string().length(1),
  otp: string().default(""),
}).refine(
  (data) => {
    return new RegExp("[0-9]{4}").test(`${data.a}${data.b}${data.c}${data.d}`);
  },
  {
    path: ["otp"],
    message: "Invalid OTP. Please try again",
  }
);

export type OTPInput = TypeOf<typeof OTPSchema>;

const VerifyOTP = () => {
  const [verifyOTPError, setVerifyOTPError] = useState<string>("");
  const location = useLocation();

  const methods = useForm<OTPInput>({
    resolver: zodResolver(OTPSchema),
  });

  const [sendOTP] = useSendOTPMutation();

  const [verifyOTP, { isLoading, isSuccess, error, isError }] =
    useVerifyOTPMutation();

  const navigate = useNavigate();

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful, errors },
  } = methods;

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
    if (isError) {
      setVerifyOTPError(error?.data?.message);
      console.log(error);
    }
  }, [isLoading]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  });

  useEffect(() => {
    sendOTP({
      userId: location.state.userId,
    });
  }, []);

  const onSubmitHandler: SubmitHandler<OTPInput> = (values) => {
    verifyOTP({
      otp: `${values.a}${values.b}${values.c}${values.d}`,
      userId: location.state.userId,
    });
  };

  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center items-center bg-slate-500">
        {location.state !== null && (
          <span className="flex justify-center font-bold text-sm text-white">
            {location.state.message}
          </span>
        )}
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            noValidate
            autoComplete="off"
            className="flex flex-col justify-center items-center"
          >
            <div className="">
              <OTPInputField name="a" />
              <OTPInputField name="b" />
              <OTPInputField name="c" />
              <OTPInputField name="d" />
            </div>
            {verifyOTPError !== "" && (
              <span className="flex justify-center font-bold text-sm text-red-900">
                {verifyOTPError}
              </span>
            )}
            {errors["otp"] ? (
              <span className="flex justify-end font-bold text-sm text-red-900 mr-2">
                {errors["otp"].message!.toString()}
              </span>
            ) : (
              ""
            )}
            <span className="text-sm font-bold uppercase text-slate-300">
              Enter Verification OTP sent to your email
            </span>
            <button
              type="submit"
              className="mt-5 px-5 py-2 rounded-md font-bold text-xl text-slate-500 bg-slate-300"
            >
              Verify
            </button>
          </form>
        </FormProvider>

        <span className="text-sm text-slate-300 mt-2">
          Didn't get otp?
          <a>
            <b className="ml-2 uppercase">Resend OTP</b>
          </a>
        </span>
        <span className="font-bold text-sm text-slate-300 my-2">OR</span>
        <span className="text-sm text-slate-300">
          Go to
          <Link to="/login">
            <b className="ml-2 uppercase">Login Page</b>
          </Link>
        </span>
      </div>
    </>
  );
};

export default VerifyOTP;
