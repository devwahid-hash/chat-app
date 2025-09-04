import axios from "axios"
import { use, useEffect } from "react"
import { useDispatch } from "react-redux"
import { setAllUsers } from "../redux/userSlice"
import { serverURL } from "../main"

const getAllUsers=async()=>{
  let dispatch=useDispatch()

    useEffect(()=>{
      const fetchUsers=async()=>{
        try {
            let result=await axios.get(`${serverURL}/api/user/getallusers`,{
                withCredentials:true
            })
            console.log(result.data)
            dispatch(setAllUsers(result.data))
        } catch (error) {
            console.log(`error in getAllUsers${error}`)
        }
      }
     fetchUsers(); 
    },[])

}

export default getAllUsers;