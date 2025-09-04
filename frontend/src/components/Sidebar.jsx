import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedUser, setUserData } from "../redux/userSlice";
import { useState } from "react";
import axios from "axios";
import { serverURL } from "../main";
import toast from "react-hot-toast";

const Sidebar = ({ isChatOpen, }) => {
  const navigate = useNavigate();
  const { userData, allUsers, selectedUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  // ✅ Filter users by search
  const filteredUsers = allUsers?.filter((user) =>
    user.userName.toLowerCase().includes(search.toLowerCase())
  );
const logOut=async()=>{
  try {
    const response =await axios.get(`${serverURL}/api/auth/logout`,{
      withCredentials:true
    })
    toast.success("successfully LogOut")
    dispatch(setUserData(null))
    navigate("/signin")
  } catch (error) {
    toast.error(error.response?.data?.message || "Logout failed");
  }
}
  return (
    <div
      className={`${
        isChatOpen ? "hidden" : "flex"
      }  flex-col bg-white border-r h-screen
     w-full md:w-80 absolute md:relative z-50 bg-gradient-to-b from-indigo-600 via-purple-600 to-pink-500 text-white shadow-2xl`}
    >
      {/* Header */}
      <div className="p-5 border-b border-white/20">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-extrabold tracking-wide">Messages</h1>
          <button
            onClick={() => navigate("/profile")}
            className="p-1 rounded-full hover:scale-105 transition cursor-pointer"
          >
            <img
              src={userData?.profilePic || "/default-avatar.svg"}
              alt="You"
              className="w-12 h-12 rounded-full border-2 border-white shadow-lg"
            />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            type="text"
            placeholder="Search users..."
            className="w-full pl-12 pr-4 py-2 bg-white/20 text-white placeholder-white/70 rounded-full focus:ring-2 focus:ring-yellow-300 focus:outline-none transition"
          />
          <svg
            className="w-5 h-5 text-white absolute left-4 top-2.5 opacity-80"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-white/40 scrollbar-track-transparent">
        {filteredUsers?.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user._id}
              onClick={() => {
                dispatch(setSelectedUser(user));
               // ✅ open chat on mobile
              }}
              className={`flex items-center p-3 rounded-xl cursor-pointer transition-all duration-300 
                ${
                  selectedUser?._id === user._id
                    ? "bg-white/20 shadow-lg scale-[1.02]"
                    : "hover:bg-white/10"
                }`}
            >
              <img
                src={user?.profilePic || "/default-avatar.svg"}
                alt="User"
                className="w-12 h-12 rounded-full border-2 border-white/40 shadow-md"
              />
              <div className="flex-1 ml-3 min-w-0">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold truncate">{user?.userName}</h3>
                  <span className="text-xs opacity-70">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : ""}
                  </span>
                </div>
                <p className="text-sm opacity-80 truncate">
                  Last message preview here...
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="opacity-70 text-center">No users found</p>
        )}
      </div>

      {/* Footer / Logout */}
<div className="p-4 border-t border-white/20">
  <button
  onClick={logOut}
    className="w-full flex items-center justify-center gap-2 py-2 px-4 
               rounded-full bg-white/20 hover:bg-white/30 
               text-white font-semibold shadow-md 
               transition-all duration-300 cursor-pointer"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 
           2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M18 12H9m9 0l-3-3m3 3l-3 3"
      />
    </svg>
    Logout
  </button>
</div>

    </div>
  );
};

export default Sidebar;
