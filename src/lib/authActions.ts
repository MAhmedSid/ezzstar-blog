"use server"


import { supabase } from "./supabaseClient";

export  const doSignUp = async (email:string,password:string) => {
    try {
        
        const { data:pdata, error:perror } = await supabase.auth.signUp({
            email,
            password,
        });
        console.log(perror)
        console.log(pdata)
        if (perror) {
            throw new Error (perror.message)
        };
        
        console.log( pdata.user , "SUCCESSFUL SIGNED UP");
        return true
    } catch (error) {
            console.log((error as {message:string}).message)
    }
    };



export const sendResetPasswordLink = async (email:string)=>{
    try {
        console.log(email, "from do reset function")
        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: 'http://localhost:3000/account/updatepassword',
          })
          console.log(data)
          console.log(error?.cause,error?.message)
          if(error){
            throw new Error(error.message);
          }
          if(data){
              return true
          }
          
          
        } catch (error) {
          console.log(error);
        }
}