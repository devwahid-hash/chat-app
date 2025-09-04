import { createSlice } from "@reduxjs/toolkit";

const messageslice=createSlice({
    name:"message",
    initialState:{
        messages:[],
    },
    reducers:{
      setMessages:(state,action)=>{
       state.messages=action.payload
      },
    }
})

export const {setMessages}=messageslice.actions
export default messageslice.reducer