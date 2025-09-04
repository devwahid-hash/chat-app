import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setUserData } from '../redux/userSlice';
import { serverURL } from '../main';
import toast from 'react-hot-toast';

const Profile = () => {
 

  const userData=useSelector(state=>state.user)
  const [previewImage, setpreviewImage] = useState(null)
  const [selectedFile, setselectedFile] = useState(null)
  const [loading, setloading] = useState(null)
  const [username, setusername] = useState(userData?.userData?.userName || "")
  let dispatch=useDispatch()
  const navigate=useNavigate()

  const handleFileChange=(e)=>{
   let file=e.target.files[0]
   if(file){
setselectedFile(file);
    let fileUrl=(URL.createObjectURL(file))
    setpreviewImage(fileUrl)
    console.log(fileUrl)
  }
  }
  const handleformSubmit=async(e)=>{
    e.preventDefault()
    setloading(true)
    try {
      const formdata=new FormData()
      formdata.append("userName",username)
      formdata.append("image",selectedFile)

      const response=await axios.put(`${serverURL}/api/user/upload`,formdata,{
        withCredentials:true,
          headers:{
          "Content-Type": "multipart/form-data"
        }
      })
      if(response.status==200 || response.status===201){
      console.log(response.data)
       dispatch(setUserData(response.data));
       toast.success("successfully Updated")
       setloading(false)
       navigate("/")
      }
    } catch (error) {
      console.log(`error in handleformSubmit${error}`)
      toast.error(response?.response?.data?.message)
     setloading(false)
    }
    
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500">
      <form onSubmit={(e)=>{
        handleformSubmit(e)
      }} className="bg-white p-8 rounded-xl shadow-2xl min-w-80 flex flex-col gap-5">
        <h2 className="text-center mb-4 text-blue-500 font-bold text-2xl">
          Profile Settings
        </h2>

        {/* Profile Picture */}
        
            <div >
       <label htmlFor="profilePicture" className="w-28 h-28 rounded-full bg-gray-100 mx-auto mb-4 flex items-center justify-center border-2 border-blue-500 overflow-hidden">
              {previewImage ? (
                <img 
                  src={previewImage} 
                  alt="Profile Preview" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-3xl text-blue-500">👤</span>
              )}
            </label>
            <input
            onChange={handleFileChange}
              type="file"
              id="profilePicture"
              accept="image/*"
              className=" hidden w-full p-2 mt-1 rounded-md border border-gray-300 outline-none "
            />
        </div>

        {/* Username */}
        <div>
          <label className="font-medium text-gray-700">Username</label>
          <input
          onChange={(e)=>{
            setusername(e.target.value)
          }}

          value={username}
            type="text"
            placeholder="Enter your username"
            className="w-full p-3 mt-1 rounded-md border border-gray-300 outline-none text-gray-600"
          />
        </div>

        {/* Email */}
        <div>
          <label className="font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={userData?.userData?.email}
            disabled
            className="w-full p-3 mt-1 rounded-md border border-gray-300 outline-none bg-gray-100 text-gray-600"
          />
          <small className="text-gray-600 text-xs">
            Email cannot be changed
          </small>
        </div>

        {/* Password */}
        <div>
          <label className="font-medium text-gray-700">Password</label>
          <input
            type="password"
            value="••••••••"
            disabled
            className="w-full p-3 mt-1 rounded-md border border-gray-300 outline-none bg-gray-100 text-gray-600"
          />
          <small className="text-gray-600 text-xs">
            Password cannot be changed here
          </small>
        </div>

        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 border-none rounded-md font-semibold text-base cursor-pointer mt-2"
        >
          {loading==true? "updating please wait...":"Update Profile"}
          
        </button>
        
        <div className="flex gap-4">
          <Link to="/" className="text-blue-500">
            Back to Home
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Profile;
