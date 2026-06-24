import { MessageCircle, X } from 'lucide-react'
import React from 'react'

function EmptyChatState({navigate}) {
  return (
    <div className="flex flex-col h-screen bg-[var(--bg-main)]">
              {/* Header */}

              <div className="flex justify-between items-center gap-4 p-4 border-b bg-white">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-full overflow-hidden"></div>
                  <div></div>
                </div>
                <div
                  onClick={() => navigate(-1)}
                  className="hover:bg-gray-200 rounded-lg transition-all duration-300 ease-in cursor-pointer p-2 "
                >
                  <X size={18} />
                </div>
              </div>

              {/* Messages */}

              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div
                    className="w-28 h-28 rounded-full bg-[var(--primary-light)]
      flex items-center justify-center mx-auto"
                  >
                    <MessageCircle
                      size={50}
                      className="text-[var(--primary)]"
                    />
                  </div>

                  <h2 className="mt-6 text-2xl font-bold">
                    Select a Conversation
                  </h2>

                  <p className="mt-2 text-[var(--text-secondary)]">
                    Choose a seller from the left sidebar to start chatting.
                  </p>
                </div>
              </div>

              {/* Input */}

              <div className="bg-white border-t p-4 sticky bottom-0"></div>
            </div>
  )
}

export default EmptyChatState
