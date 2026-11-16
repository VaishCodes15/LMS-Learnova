import { createSlice } from "@reduxjs/toolkit";
import { Action } from "radix-ui/alert-dialog";

const initialState = {
  user:null,
  isAuthenticated:false
};

const authSlice = createSlice({
  name:"authSlice",
  initialState,
  reducers:{
    userLoggedIn: (state, action) =>{
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    userLoggedOut:(state,action) =>{
      state.user=null,
      state.isAuthenticated=false;
    }
  },
});

export const {userLoggedIn,userLoggedOut} = authSlice.actions;
export default authSlice.reducer;