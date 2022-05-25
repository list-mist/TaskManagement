import { useCallback, useState,useEffect } from "react";
import axios from "axios"
import { useSnackbar } from "notistack";
import formatHttpApiError from "src/helpers/formatHttpApiError";

export default function useRequestAuth() {
    const {enqueueSnackbar} = useSnackbar()
    const [error,setError] = useState([])
   
    const handleError = useCallback((err)=>{
        const FormatError = formatHttpApiError(err)
        setError(FormatError)
        enqueueSnackbar(FormatError);
    },[enqueueSnackbar,error])


    const register = useCallback(({username,email,password},successCallBack) =>{
         axios.post("/api/auth/users/",{
             username,
             email,
             password
         }).then(()=>{
             enqueueSnackbar("Registration is successfull. You can now log in")
             if(successCallBack){
                 successCallBack()
             }
         }).catch(handleError)
    },[enqueueSnackbar,handleError])

    return {
        register,
        error
    }
}