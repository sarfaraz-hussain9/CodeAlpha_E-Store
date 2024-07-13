import { apislice } from "./apiSlice";
import { USERS_URL } from "../features/constants";

export const userApiSlice = apislice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/signup`,
        method: "POST",
        body: data,
      }),
    }),
    signin: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/signin`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    updateProfile: builder.mutation({
        query: (data)=>({
            url: `${USERS_URL}/profile`,
            method: "PUT",
            body: data,
        })
    }),
    allUserAdmin: builder.query({
        query: (data)=>({
            url: `${USERS_URL}/admin`,
            methot: "GET",
        })
    }),

  }),
});


export const { useSignupMutaion,useSigninMutation,useLogoutMutation,useUpdateProfileMutaion,useAllUserAdminQuery }=userApiSlice;