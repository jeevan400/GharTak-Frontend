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
  handleSendMessage,
  setOpenRoom
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

      <div className="flex justify-between items-center gap-4 p-4 border-b border-[var(--border-light)] bg-white shadow-sm z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden shadow-sm border border-[var(--border-light)]">
            <img
              src={chatUser?.image || "https://ui-avatars.com/api/?name=Seller"}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-bold text-[var(--text-primary)] capitalize leading-tight">
              {chatUser?.name}
            </h3>
            <p className="text-[13px] font-medium text-[var(--success)]">Online</p>
          </div>
        </div>
        <div
          onClick={() => {
            if (setOpenRoom) {
              setOpenRoom(false);
            } else {
              navigate(-1);
            }
          }}
          className="hover:bg-[var(--primary-light)] text-[var(--text-secondary)] hover:text-[var(--primary)] rounded-full transition-all duration-300 ease-in cursor-pointer p-2 shadow-sm"
        >
          <X size={20} strokeWidth={2.5} />
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

      <div className="bg-white border-t border-[var(--border-light)] p-4 sticky bottom-0 z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="flex gap-3 max-w-4xl mx-auto w-full">
          <input
            type="text"
            placeholder="Type a message..."
            onChange={(e) => setMessage({ text: e.target.value })}
            value={message.text}
            className="flex-1 border border-[var(--border-medium)] rounded-xl px-5 py-3 outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent shadow-sm transition-all sm:text-sm text-[var(--text-primary)] font-medium placeholder-gray-400"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
          />

          <button
            style={{ background: "var(--gradient-primary)" }}
            onClick={handleSendMessage}
            className="w-[50px] h-[50px] rounded-xl flex items-center justify-center text-white shadow-md hover:shadow-[0_4px_12px_rgba(249,115,22,0.3)] hover:-translate-y-0.5 transition-all duration-200 shrink-0"
          >
            <IoSend size={20} className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatRoom;
