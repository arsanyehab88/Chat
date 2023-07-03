import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Users{
    name?: string;
    email?: string;
    ProfilePic?: any;
    password?: string;
    status?: string;
    Verfied?:boolean;
    _id?: string;
}

const appApi = createApi({
    reducerPath: "appApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://chat-d2my.onrender.com"
    }),
    endpoints: (builder) => ({
        //signUP User
        signUpUser: builder.mutation({
            query: (user) => ({
                url: "user/signUP",
                method: "POST",
                body: user
            })
        }),

        //sign IN User
        signINUser: builder.mutation({
            query: (user) => ({
                url: "user/signIn",
                method: "POST",
                body: user
            })
        }),
        LogOutUser: builder.mutation({
            query: (user) => ({
                url: "Logout",
                method: "PUT",
                body: user
            })
        }),
        ChangePassUser: builder.mutation({
            query: (user) => ({
                url: "user/",
                method: "put",
                body: user
            })
        })


    })

})


export const { useSignUpUserMutation, useSignINUserMutation , useLogOutUserMutation , useChangePassUserMutation } = appApi;


export default appApi;



