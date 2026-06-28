import { MessageCircle, X } from 'lucide-react'
import React from 'react'

function EmptyChatState({navigate}) {
  return (
    <div className="flex flex-col h-screen bg-[var(--bg-main)]">
      {/* Header */}
      <div className="flex justify-between items-center gap-4 p-4 border-b border-[var(--border-light)] bg-white shadow-sm z-10 h-[81px]">
        <div className="flex items-center gap-2">
          {/* Empty spacer for alignment */}
        </div>
        <div
          onClick={() => navigate(-1)}
          className="hover:bg-[var(--primary-light)] text-[var(--text-secondary)] hover:text-[var(--primary)] rounded-full transition-all duration-300 ease-in cursor-pointer p-2 shadow-sm"
        >
          <X size={20} strokeWidth={2.5} />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center max-w-sm">
          <div className="w-28 h-28 rounded-full bg-white shadow-[var(--shadow-md)] flex items-center justify-center mx-auto mb-6 border border-[var(--border-light)]">
            <MessageCircle
              size={50}
              className="text-[var(--primary)]"
            />
          </div>

          <h2 className="text-2xl font-extrabold text-[var(--text-primary)] mb-2">
            Your Messages
          </h2>

          <p className="text-[15px] font-medium text-[var(--text-secondary)] leading-relaxed">
            Choose a conversation from the left sidebar to start chatting, or browse your orders to contact a seller.
          </p>
        </div>
      </div>

      {/* Input Placeholder */}
      <div className="bg-white border-t border-[var(--border-light)] p-4 sticky bottom-0 z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] h-[83px]"></div>
    </div>
  )
}

export default EmptyChatState
