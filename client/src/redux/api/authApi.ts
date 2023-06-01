import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_BASE_URL as string;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/v1/`,
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<
      { success: boolean; userId: string; message: string },
      {
        email: string;
        password: string;
      }
    >({
      query(data) {
        return {
          url: "register",
          method: "POST",
          body: data,
        };
      },
    }),
    loginUser: builder.mutation<
      {
        success: boolean;
        accesstoken: string;
        refreshtoken: string;
      },
      {
        email: string;
        password: string;
      }
    >({
      query(data) {
        return {
          url: "login",
          method: "POST",
          body: data,
          credentials: "include",
        };
      },
    }),
    sendOTP: builder.mutation<
      {
        success: boolean;
        message: string;
      },
      { userId: string }
    >({
      query({ userId }) {
        return {
          url: "send-otp",
          method: "POST",
          body: userId,
        };
      },
    }),
    verifyOTP: builder.mutation<
      {
        success: boolean;
        accesstoken: string;
        refreshtoken: string;
      },
      { otp: string; userId: string }
    >({
      query(data) {
        return {
          url: "verify-otp",
          method: "POST",
          body: data,
          credentials: "include",
        };
      },
    }),
    logoutUser: builder.mutation<
      { success: boolean; message: string },
      { refreshToken: string }
    >({
      query({ refreshToken }) {
        return {
          url: "logout",
          method: "delete",
          data: { refreshToken },
          credentials: "include",
        };
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useSendOTPMutation,
  useVerifyOTPMutation,
  useLogoutUserMutation,
} = authApi;
