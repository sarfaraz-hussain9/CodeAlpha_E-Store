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
            localStorage.setItem('userInfo',JSON.stringify(action.payload));
            const expirationTime=new Date().getTime()+30*24*60*60*1000;
            localStorage.setItem('expirationTime',expirationTime);
        },
        signOut:(state)=>{
            state.userInfo=null;
            localStorage.removeItem('userInfo')
        }
    }
})

export const {signIn,signOut}=userSlice.actions;

export default userSlice.reducer;