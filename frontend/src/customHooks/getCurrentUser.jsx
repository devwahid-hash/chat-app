import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from "../redux/userSlice";
import { serverURL } from "../main";
 
const getCurrentUser=()=>{
    let dispatch=useDispatch()
   let {userData}=useSelector(state=>state.user)
    useEffect(()=>{
        const fetchUser=async()=>{
            try {
               let response= await axios.get(`${serverURL}/api/user/current`, {
                withCredentials: true 
            })
               dispatch(setUserData(response.data))
            } catch (error) {
                console.log(`error in getcurrentuser${error}`)
            }
        }
       fetchUser(); 
    },[])
    
}

export default getCurrentUser;