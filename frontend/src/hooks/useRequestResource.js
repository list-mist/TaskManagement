import { useCallback, useState,useEffect } from "react";
import axios from "axios"


export default function useRequestResource({endpoint}) {
   const [resourceList, setResourceList] = useState([])

/*   const getResourceList = useCallback(() =>{
        axios.get(`/api/${endpoint}/`).then((res) =>{
            setResourceList(res.data)
        }).catch((err) =>{
            console.log(err)
        })
   },[endpoint]) */
   const getResourceList = useCallback(() =>{
       const res = async() => {
           const resp = await axios.get(`/api/${endpoint}/`)
           setResourceList(resp.data)
       }
       res()
},[endpoint]);

   const addResource = useCallback((data) =>{
        const res = async() => {
            console.log(data)
            const resp = await axios.post(`/api/${endpoint}/`,data)
        }
        res()
   },[]);
   return {
       resourceList,
       getResourceList,
       addResource
   }
}
