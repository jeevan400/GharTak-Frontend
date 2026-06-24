import React from "react";

function MessagesBubble({ msg, handleDeleteMessage, user }) {
  return (
    <div
      key={msg._id}
      className={`flex ${
        msg.sender._id === user.id ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`
                    max-w-[75%]
                    px-4
                    py-3
                    rounded-2xl
                    shadow-sm
                    ${
                      msg.sender._id === user.id
                        ? "bg-[var(--primary)] text-white rounded-br-sm"
                        : "bg-white text-[var(--text-primary)] rounded-bl-sm"
                    }
                  `}
      >
        <p>{msg.text}</p>

        <div
          className={`text-xs mt-2 ${
            msg.sender._id === user.id
              ? "text-white/80"
              : "text-[var(--text-secondary)]"
          }`}
        >
          {msg.createdAt}
          {msg.sender._id === user.id && (
            <button
              className="px-4 py-1 text-[10px] rounded-lg ml-2 hover:bg-black/10 transition-colors"
              onClick={() => handleDeleteMessage(msg._id)}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MessagesBubble;
