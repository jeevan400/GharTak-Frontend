import { StepBack, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoSend } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { getConverSation } from "../../services/conversation.service";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [converSation, setConverSation] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  const seller = location.state?.seller;

  console.log("this is state seller : ", seller);

  const fetchConversation = async () => {
    try {
      const allconversation = await getConverSation();
      console.log(allconversation);
      setConverSation(allconversation);
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message || e.message);
    }
  };

  useEffect(() => {
    fetchConversation();
  }, []);

  const messages = [
    {
      _id: 1,
      sender: "customer",
      text: "Hello Seller",
      createdAt: "10:20 AM",
    },
    {
      _id: 22,
      sender: "seller",
      text: "Hello, How can I help you?",
      createdAt: "10:21 AM",
    },
    {
      _id: 23,
      sender: "seller",
      text: "Hello, How can I help you?",
      createdAt: "10:21 AM",
    },
    {
      _id: 25,
      sender: "seller",
      text: "Hello, How can I help you?",
      createdAt: "10:21 AM",
    },
    {
      _id: 26,
      sender: "seller",
      text: "Hello, How can I help you?",
      createdAt: "10:21 AM",
    },
    {
      _id: 3,
      sender: "customer",
      text: "When will my order arrive?",
      createdAt: "10:22 AM",
    },
  ];

  return (
    <>
      <div className="h-screen w-full grid grid-cols-12 grid-rows-9">
        <div className="bg-[var(--primary-light)] row-span-9 col-span-3">
          {converSation.map((item, index) => (
            <div
              key={index}
              className="bg-white hover:bg-[var(--bg-main)] p-4 shadow-sm hover:shadow-md flex justify-start items-center gap-2 cursor-pointer mx-1 mb-1 transition-all duration-200 ease-in rounded-lg "
            >
              <img
                className="rounded-full h-12 w-12"
                src={item.participants[1].image}
                alt=""
              />
              <div>
                <h1 className="text-sm font-bold text-[var(--text-primary)] capitalize">
                  {item.participants[1].name}
                </h1>
                <p className="text-xs font-medium text-[var(--text-secondary)]">
                  {item.participants[1].email}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="row-span-9 col-span-9">
          <div className="flex flex-col h-screen bg-[var(--bg-main)]">
            {/* Header */}

            <div className="flex justify-between items-center gap-4 p-4 border-b bg-white">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src={
                      seller?.image || "https://ui-avatars.com/api/?name=Seller"
                    }
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--text-primary)] capitalize">
                    {seller?.name}
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
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`flex ${
                    msg.sender === "customer" ? "justify-end" : "justify-start"
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
                  msg.sender === "customer"
                    ? "bg-[var(--primary)] text-white rounded-br-sm"
                    : "bg-white text-[var(--text-primary)] rounded-bl-sm"
                }
              `}
                  >
                    <p>{msg.text}</p>

                    <div
                      className={`text-xs mt-2 ${
                        msg.sender === "customer"
                          ? "text-white/80"
                          : "text-[var(--text-secondary)]"
                      }`}
                    >
                      {msg.createdAt}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}

            <div className="bg-white border-t p-4 sticky bottom-0">
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
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
        </div>
      </div>
    </>
  );
};

export default Chat;
