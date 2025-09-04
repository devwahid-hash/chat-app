import React from "react";

const SenderMessage = ({message}) => {
  const time= new Date(message.createdAt).toLocaleTimeString([], {
     hour: "2-digit",
    minute: "2-digit",
  })
  return (
    <div className="flex justify-end">
      <div className="max-w-xs bg-blue-600 text-white px-4 py-2 rounded-2xl rounded-br-none shadow">
        <p>{message.message}</p>
        <span className="text-xs text-gray-200 block mt-1 text-right">
         {time}
        </span>
      </div>
    </div>
  );
};

export default SenderMessage;
