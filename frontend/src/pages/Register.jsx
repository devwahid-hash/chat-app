import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { serverURL } from "../main";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/GoogleAuth";

const Register = () => {
  const navigate = useNavigate();
  const [userName, setuserName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = { userName, email, password };

    try {
      const response = await axios.post(`${serverURL}/api/auth/register`, newUser, {
        withCredentials: true,
      });

      if (response.status === 201 || response.status === 200) {
        toast.success("Registration successful");
        dispatch(setUserData(response.data));
        navigate("/profile");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }

    setuserName("");
    setemail("");
    setpassword("");
  };

 const googleSignIn=async()=>{
  try {
    const response=await signInWithPopup(auth,provider)
    let user=response.user
    let userName=user.displayName
    let email=user.email
    const result=await axios.post(`${serverURL}/api/auth/googleAuth`,{email,userName},
      {withCredentials:true})
      if(result.status===201 || result.status===200){
        toast.success(result.data.message || "Success")
        dispatch(setUserData(result.data))
      }
      console.log(result)
  } catch (error) {
     toast.error(error.response?.data?.message ||"error in LogIn")
    console.log(error)
  }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute w-72 h-72 bg-white/20 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-pink-400/30 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>

      {/* Register Card */}
      <motion.form
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        onSubmit={submitHandler}
        className="backdrop-blur-xl bg-white/10 border border-white/30 p-8 rounded-3xl shadow-2xl w-full max-w-md flex flex-col gap-6"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-extrabold text-white text-center tracking-wide"
        >
          Create Your Account
        </motion.h2>

        {/* Username */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="block text-white/90 font-medium">Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={userName}
            onChange={(e) => setuserName(e.target.value)}
            className="w-full p-3 mt-2 rounded-xl bg-white/20 border border-white/40 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </motion.div>

        {/* Email */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label className="block text-white/90 font-medium">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className="w-full p-3 mt-2 rounded-xl bg-white/20 border border-white/40 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </motion.div>

        {/* Password */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <label className="block text-white/90 font-medium">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            className="w-full p-3 mt-2 rounded-xl bg-white/20 border border-white/40 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </motion.div>

        {/* Register Button */}
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(255,255,255,0.5)" }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-3 rounded-xl font-semibold shadow-lg transition cursor-pointer"
        >
          Register
        </motion.button>

        {/* Google Sign-In */}
        <motion.button
          onClick={googleSignIn}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          className="flex items-center justify-center gap-3 bg-white/90 py-3 rounded-xl font-semibold text-gray-700 hover:bg-white transition shadow-md cursor-pointer"
        >
          <FcGoogle size={24} /> Sign up with Google
        </motion.button>

        {/* Sign In Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex justify-center gap-2 text-white/80 text-sm"
        >
          <p>Already have an account?</p>
          <Link to="/signin" className="text-pink-300 font-medium hover:underline">
            Sign In
          </Link>
        </motion.div>
      </motion.form>
    </div>
  );
};

export default Register;
