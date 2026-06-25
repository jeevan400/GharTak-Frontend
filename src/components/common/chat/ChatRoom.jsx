import { X } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { IoSend } from "react-icons/io5";
import MessagesBubble from "./MessagesBubble";

function ChatRoom({
  chatUser,
  navigate,
  allMessages,
  user,
  handleDeleteMessage,
  setMessage,
  message,
  handleSendMessage
}) {

  const messageEndRef = useRef(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(()=>{
    scrollToBottom();
  },[allMessages])

  return (
    <div className="flex flex-col h-screen bg-[var(--bg-main)]">
      {/* Header */}

      <div className="flex justify-between items-center gap-4 p-4 border-b bg-white">
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src={chatUser?.image || "https://ui-avatars.com/api/?name=Seller"}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-[var(--text-primary)] capitalize">
              {chatUser?.name}
            </h3>
            <p className="text-sm text-[var(--success)]">Online</p>
          </div>
        </div>
        <div
          onClick={() => navigate(-1)}
          className="hover:bg-gray-200 rounded-lg transition-all duration-300 ease-in cursor-pointer p-2 "
        >
          <X size={18} />
        </div>
      </div>

      {/* Messages */}

      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {allMessages.map((msg) => (
          <MessagesBubble
            key={msg._id}
            msg={msg}
            handleDeleteMessage={handleDeleteMessage}
            user={user}
            scrollToBottom={scrollToBottom}
          />
        ))}
        <div ref={messageEndRef}></div>
      </div>

      {/* Input */}

      <div className="bg-white border-t p-4 sticky bottom-0">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Type a message..."
            onChange={(e) => setMessage({ text: e.target.value })}
            value={message.text}
            className="
              flex-1
              border
              border-[var(--border-light)]
              rounded-xl
              px-4
              py-3
              outline-none
              focus:border-[var(--primary)]
            "
          />

          <button
            onClick={handleSendMessage}
            className="
              w-12
              h-12
              rounded-xl
              flex
              items-center
              justify-center
              bg-[var(--primary)]
              hover:bg-[var(--primary-hover)]
              text-white
              transition
            "
          >
            <IoSend size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatRoom;
