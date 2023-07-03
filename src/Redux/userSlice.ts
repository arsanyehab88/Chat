import { createSlice } from "@reduxjs/toolkit";
import appApi from "./appApi";


export const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        addNotifications: (state:any, { payload }) => {            
            if (state.newMessages[payload]) {
                state.newMessages[payload] = state.newMessages[payload] + 1;
            } else {
                state.newMessages[payload] = 1;
            }
        },
        resetNotifications: (state:any, { payload }) => {
            delete state.newMessages[payload];
            
        },

    },
    extraReducers: (builder) => {
        //save user after sign up
        builder.addMatcher(appApi.endpoints.signUpUser.matchFulfilled, (state, { payload }) => payload.add)
        //save user after sign up
        builder.addMatcher(appApi.endpoints.signINUser.matchFulfilled, (state, { payload }) => payload.add)
        //delete persist
        builder.addMatcher(appApi.endpoints.LogOutUser.matchFulfilled, () => null);

    }

})

export const { addNotifications, resetNotifications } = userSlice.actions
export default userSlice.reducer