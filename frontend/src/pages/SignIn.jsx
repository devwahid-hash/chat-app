import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUserData } from "../redux/userSlice";
import { serverURL } from "../main";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/GoogleAuth";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    const user = { email, password };

    try {
      const response = await axios.post(`${serverURL}/api/auth/login`, user, {
        withCredentials: true,
      });

      if (response.status === 200 || response.status === 201) {
        dispatch(setUserData(response.data));
        toast.success("Logged in successfully");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
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
      <div className="absolute w-72 h-72 bg-white/20 rounded-full blur-3xl top-16 left-10 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-purple-400/30 rounded-full blur-3xl bottom-16 right-10 animate-pulse"></div>

      {/* Sign In Card */}
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
          Welcome Back
        </motion.h2>

        {/* Email */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
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
          transition={{ delay: 0.4 }}
          className="relative"
        >
          <label className="block text-white/90 font-medium">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            className="w-full p-3 mt-2 rounded-xl bg-white/20 border border-white/40 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          {/* Forgot Password Link */}
          <div className="flex justify-end mt-2">
            <Link
              to="/forgetpassword"
              className="text-sm text-pink-300 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </motion.div>

        {/* Sign In Button */}
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(255,255,255,0.5)" }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-3 rounded-xl font-semibold shadow-lg transition cursor-pointer"
        >
          Sign In
        </motion.button>

        {/* Google Sign-In */}
        <motion.button
          onClick={googleSignIn}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          className="flex items-center justify-center gap-3 bg-white/90 py-3 rounded-xl font-semibold text-gray-700 hover:bg-white transition shadow-md cursor-pointer"
        >
          <FcGoogle size={24} /> Sign in with Google
        </motion.button>

        {/* Register Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center gap-2 text-white/80 text-sm"
        >
          <p>Don’t have an account?</p>
          <Link to="/register" className="text-pink-300 font-medium hover:underline">
            Register
          </Link>
        </motion.div>
      </motion.form>
    </div>
  );
};

export default SignIn;
