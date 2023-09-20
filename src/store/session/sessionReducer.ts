import { PayloadAction, Slice, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store";


const initialState: {userID: string,userName:string,userImgUrl:string} = {userID: "",userName:"",userImgUrl:""};


export const sessionSlice: Slice = createSlice({
    name: 'session',
    initialState,
    reducers: {
   addSession(state,action:PayloadAction<{userID:string,userName:string,userImgUrl:string}>){
    state.userID = action.payload.userID;
    state.userName = action.payload.userName;
    state.userImgUrl = action.payload.userImgUrl;
   },
   removeSession (state){
    state.userID = "";
    state.userName = "";
    state.userImgUrl = "";
   }
    },
  })


  export const { addSession, removeSession} = sessionSlice.actions
  export const selectUserID = (state: RootState) => state.session.userID
  export const selectUserData = (state: RootState) => state.session

  export default sessionSlice.reducer;
