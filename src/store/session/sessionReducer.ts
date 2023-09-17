import { PayloadAction, Slice, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store";


const initialState: {userID: string} = {userID: ""};


export const sessionSlice: Slice = createSlice({
    name: 'session',
    initialState,
    reducers: {
   addSession(state,action:PayloadAction<string>){
    state.userID = action.payload;

   },
   removeSession (state){
    state.userID = "";
   }
    },
  })


  export const { addSession, removeSession} = sessionSlice.actions
  export const selectUserID = (state: RootState) => state.session.userID

  export default sessionSlice.reducer;
