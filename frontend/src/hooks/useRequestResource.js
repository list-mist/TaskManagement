import { useCallback, useState,useEffect } from "react";
import axios from "axios"
import { useSnackbar } from "notistack";
import formatHttpApiError from "src/helpers/formatHttpApiError";
export default function useRequestResource({endpoint, resourceLabel}) {
   const [resourceList, setResourceList] = useState([])
  
   const [resource,setResource] = useState(null)
   const {enqueueSnackbar} = useSnackbar()
/*   const getResourceList = useCallback(() =>{
        axios.get(`/api/${endpoint}/`).then((res) =>{
            setResourceList(res.data)
        }).catch((err) =>{
            console.log(err)
        })
   },[endpoint]) */
   const [error, setError] = useState(null);
   const handleError = useCallback((err)=>{
       const FormatError = formatHttpApiError(err)
       setError(FormatError)
       enqueueSnackbar(FormatError);
   },[enqueueSnackbar,error])
   const getResourceList = useCallback(() =>{
       const res = async() => {
           const resp = await axios.get(`/api/${endpoint}/`)
           setResourceList(resp.data)
       }
       res()
},[endpoint]);

   const addResource = useCallback((data,successCallBack) =>{
    axios.post(`/api/${endpoint}/`,data).then(() =>{
        enqueueSnackbar(`${resourceLabel} added`)
        if(successCallBack){
            successCallBack();
        }
    }).catch(handleError)
   },[endpoint,enqueueSnackbar,resourceLabel,handleError]);
   
   const getResource = useCallback((id) =>{
    axios.get(`/api/${endpoint}/${id}`).then((res) =>{
        const {data} = res
        setResource(data)
    }).catch(handleError)
   },[endpoint,handleError])

   const updateResource = useCallback((id,data,successCallBack)=>{
    axios.patch(`/api/${endpoint}/${id}/`,data).then(() =>{
        enqueueSnackbar(`${resourceLabel} Updated`)
        if(successCallBack){
            successCallBack();
        }
    }).catch(handleError)
   },[endpoint, enqueueSnackbar,resourceLabel,handleError])
   const deleteResource = useCallback((id)=>{
    axios.delete(`/api/${endpoint}/${id}/`).then(() =>{
        enqueueSnackbar(`${resourceLabel} deleted`)
        const newResourceList = resourceList.filter((r) => {
                return r.id != id 
            })
        
        setResourceList.apply(newResourceList)
    }).catch(handleError)
   },[endpoint,resourceList,enqueueSnackbar,resourceLabel,handleError])
   return {
       resourceList,
       getResourceList,
       addResource,
       getResource,
       resource,
       updateResource,
       deleteResource,
       error
   }
}
