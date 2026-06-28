import { CheckCheck, Trash2 } from "lucide-react";
import React from "react";

function MessagesBubble({ msg, handleDeleteMessage, user }) {
  const isSender = msg.sender._id === user.id;

  // Format the date nicely if it's a valid date string
  const formattedTime = new Date(msg.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      key={msg._id}
      className={`flex w-full mb-4 ${
        isSender ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`relative max-w-[85%] md:max-w-[70%] px-5 py-3.5 shadow-md flex flex-col group transition-all
                    ${
                      isSender
                        ? "text-white rounded-[24px] rounded-br-sm"
                        : "bg-white text-[var(--text-primary)] rounded-[24px] rounded-bl-sm border border-[var(--border-light)]"
                    }`}
        style={isSender ? { background: "var(--gradient-primary)" } : {}}
      >
        <p className="text-[15px] leading-relaxed break-words whitespace-pre-wrap font-medium">
          {msg.text}
        </p>

        <div
          className={`flex items-center justify-end gap-1.5 text-[11px] mt-2 font-bold select-none ${
            isSender ? "text-white/90" : "text-gray-400"
          }`}
        >
          <span>{formattedTime !== "Invalid Date" ? formattedTime : msg.createdAt}</span>

          {isSender && (
            <div
              className={`flex items-center ml-1 ${
                msg.read ? "text-[#34B7F1]" : "text-white/70"
              }`}
            >
              <CheckCheck size={16} strokeWidth={2.5} />
            </div>
          )}
        </div>

        {/* Delete Button - Appears on hover */}
        {isSender && (
          <button
            onClick={() => handleDeleteMessage(msg._id)}
            className="absolute top-1/2 -left-12 -translate-y-1/2 p-2 bg-red-50 text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-sm hover:bg-red-500 hover:text-white hover:scale-110 focus:opacity-100"
            title="Delete message"
          >
            <Trash2 size={16} strokeWidth={2.5} />
          </button>
        )}
      </div>
    </div>
  );
}

export default MessagesBubble;
