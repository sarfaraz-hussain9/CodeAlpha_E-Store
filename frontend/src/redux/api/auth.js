import { createSlice } from "@reduxjs/toolkit";


const initialState={
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
}

const userSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        signIn:(state,action)=>{
            state.userInfo=action.payload
            localStorage.setItem('userInfo',JSON.stringify(action.payload))
        },
        signOut:(state,action)=>{
            state.userInfo=null;
            localStorage.removeItem('userInfo')
        }
    }
})

export const {signIn,signOut}=userSlice.actions;

export default userSlice.reducer;