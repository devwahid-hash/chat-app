import React from "react";

const ReceiverMessage = ({message}) => {
  const time= new Date(message.createdAt).toLocaleTimeString([], {
     hour: "2-digit",
    minute: "2-digit",
  })
  return (
   

    <div className="flex justify-start">
      <div className="max-w-xs bg-white text-gray-800 px-4 py-2 rounded-2xl rounded-bl-none shadow">
        <p>{message.message}</p>
        <span className="text-xs text-gray-500 block mt-1">
         {time}
        </span>
      </div>
    </div>
  );
};

export default ReceiverMessage;
