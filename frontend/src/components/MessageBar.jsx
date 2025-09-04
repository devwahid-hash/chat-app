import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReceiverMessage from "./ReciverMessage";
import SenderMessage from "./SenderMessage";
import axios from "axios";
import { setMessages } from "../redux/messageSlice";
import { serverURL } from "../main";
import { setSelectedUser } from "../redux/userSlice";

const MessageBar = ({ isChatOpen, onBack }) => {
  const { selectedUser } = useSelector((state) => state.user);
  const { messages } = useSelector((state) => state.message);
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [messageInput, setMessageInput] = useState("");

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    try {
      const formdata = new FormData();
      formdata.append("message", messageInput);
      const response = await axios.post(
        `${serverURL}/api/message/sendMessage/${selectedUser._id}`,
        formdata,
        { withCredentials: true }
      );
      dispatch(setMessages([...messages, response.data]));
      setMessageInput("");
    } catch (error) {
      console.log(`error in handleSubmitForm ${error}`);
    }
  };

  if (!selectedUser) {
    return (
      <div
        className={`flex-1 hidden md:flex items-center justify-center
          bg-gradient-to-br from-gray-100 to-gray-200 text-gray-500 h-screen
          ${isChatOpen ? "flex" : "hidden"} `}
      >
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-extrabold text-gray-700">
            👋 Welcome to Chat-App
          </h1>
          <p className="text-lg">Select a user from the sidebar to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex-1 flex flex-col bg-gradient-to-br from-indigo-500 to-purple-600 relative
        ${isChatOpen ? "flex" : "hidden"} md:flex`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/20 bg-white/20 backdrop-blur-md sticky top-0">
        {/* Back button only on mobile */}
        <button
          className="md:hidden px-3 py-1 bg-white/30 text-white rounded-lg shadow"
          onClick={onBack}
        >
          Back
        </button>
        <button
          className="hidden sm:block  px-3 py-1 bg-white/30 text-white rounded-lg shadow cursor-pointer hover:scale-105"
          onClick={()=>{
            dispatch(setSelectedUser(""))
          }}
        >
          Back
        </button>
       
        <div className="flex items-center gap-3">
          <img
            src={selectedUser?.profilePic || "/default-avatar.svg"}
            alt="User"
            className="w-10 h-10 rounded-full border-2 border-white/40 shadow-md"
          />
          <h2 className="text-lg font-semibold text-white">
            {selectedUser?.userName}
          </h2>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-5 overflow-y-auto space-y-4 mt-2 mb-20 scrollbar-thin scrollbar-thumb-white/40">
        {messages.map((message) =>
          message.sender._id === userData._id || message.sender === userData._id ? (
            <SenderMessage key={message._id} message={message} />
          ) : (
            <ReceiverMessage key={message._id} message={message} />
          )
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmitForm}
        className="absolute bottom-0 left-0 w-full bg-white/30 backdrop-blur-lg p-3 flex items-center gap-3"
      >
        <input
          onChange={(e) => setMessageInput(e.target.value)}
          value={messageInput}
          type="text"
          placeholder="Type a message..."
          className="flex-1 rounded-full px-5 py-2 border-none bg-white/80 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <button
          type="submit"
          className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-2 rounded-full shadow font-semibold transition"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default MessageBar;
