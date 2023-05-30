import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { setUser } from "../features/userSlice";
import { IUser } from "./types";

const BASE_URL = "http://localhost:3000";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/v1/user`,
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUser: builder.query<IUser, null>({
      query() {
        return {
          url: "/",
          method: "get",
          credentials: "include",
        };
      },
      transformResponse: (result: { data: { user: IUser } }) =>
        result.data.user,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (e: unknown) {
          if (e instanceof Error) console.log(e.message);
        }
      },
    }),
  }),
});