import { useCallback, useState,useEffect, useContext } from "react";
import axios from "axios"
import { useSnackbar } from "notistack";
import formatHttpApiError from "src/helpers/formatHttpApiError";
import {AuthContext} from "src/contexts/AuthContextProvider";
import getCommonOptions from "src/helpers/axios/getCommonOptions";

export default function useRequestAuth() {
    const[logoutPending, setLogoutPending] = useState(false);   
    const {enqueueSnackbar} = useSnackbar()
    const [error,setError] = useState([])
    const {setIsAuthenticated , user} = useContext(AuthContext)
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

    const login = useCallback(({username,password}) =>{
        axios.post("/api/auth/token/login",{
            username,
            password
        }).then((res)=>{
            const {auth_token} = res.data;
            localStorage.setItem("authToken",auth_token);
            setIsAuthenticated(true)
            enqueueSnackbar("Logged in successfully.")
        }).catch(handleError)
   },[enqueueSnackbar,handleError,setIsAuthenticated])


    const logout = useCallback( () => {
        setLogoutPending(true);
        axios.post("/api/auth/token/logout/",null, getCommonOptions()).
        then(() =>{
            localStorage.removeItem("authToken");
            setLogoutPending(false);
            setIsAuthenticated(false);
        }).catch((err)=>{
            setLogoutPending(false)
            handleError(err)
        })
    }, [handleError,setIsAuthenticated,setLogoutPending])
    return {
        register,
        login,
        error,
        logout,
        logoutPending
    }
}
