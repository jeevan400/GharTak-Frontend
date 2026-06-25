import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { getConverSation } from "../../../services/conversation.service.js";
import {
  createMessage,
  getAllConversationMessages,
  messageDelete,
} from "../../../services/message.service.js";
import useAuth from "../../../hooks/useAuth.js";
import ConverSationList from "./ConverSationList.jsx";
import EmptyChatState from "./EmptyChatState.jsx";
import ChatRoom from "./ChatRoom.jsx";
import socket from "../../../socket.js";

const Chat = () => {
  const { user } = useAuth();
  const [message, setMessage] = useState({
    text: "",
  });
  const [converSation, setConverSation] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [chatUser, setChatUser] = useState();
  const [room, setRoom] = useState();
  const [openRoom, setOpenRoom] = useState(false);
  const [allMessages, setAllMessages] = useState([]);
  const [unReadCount, setUnReadCount] = useState(0);

  const fetchConversation = async () => {
    try {
      const allconversation = await getConverSation();
      setConverSation(allconversation);
    } catch (e) {
      console.log(e);
      toast.error(e.response?.data?.message || e.message);
    }
  };

  useEffect(() => {
    fetchConversation();
  }, []);

  // create conversation room
  useEffect(()=>{
    if(room && room._id){
      console.log("joined room",room);
      socket.emit("joinConversation", room._id)
    }
  },[room]);

  useEffect(()=> {
    socket.on("receiveMessage", (message)=>{
      console.log(message);
      setAllMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receiveMessage");
    };

  },[])

  const handleChatUser = (item) => {
    const otherParticipant = item.participants.find(
      (participant) => participant._id !== user.id,
    );
    setChatUser(otherParticipant);

    setConverSation((prev) =>
      prev.map((conv) =>
        conv._id === item._id ? { ...conv, unreadCount: 0 } : conv
      )
    );
  };


  const handleSendMessage = async () => {
    try {
      const res = await createMessage(room._id, message);
      toast.success("Message sent");
      setMessage({ text: "" }); // Clear the input field
      // handleAllMessages(); // Fetch the latest messages so it shows up in the chat
    } catch (e) {
      console.log(e);
      toast.error(e.response?.data?.message || e.message);
    }
  };

  const handleAllMessages = async () => {
    try {
      const res = await getAllConversationMessages(room._id);
      console.log("this is message data: ", res);
      setAllMessages(res.messages || []);
      setUnReadCount(res.unReadMessageCount);
    } catch (e) {
      console.log(e);
      toast.error(e.response?.data?.message || e.message);
    }
  };
  useEffect(() => {
    if (room) {
      handleAllMessages();
    }
  }, [room]);

  const handleDeleteMessage = async (messageId) => {
    try {
      const res = await messageDelete(messageId);
      toast.success("message deleted");
      handleAllMessages();
    } catch (e) {
      console.log(e);
      toast.error(e.response?.data?.message || e.message);
    }
  };

  return (
    <>
      <div className="h-screen w-full grid grid-cols-12 grid-rows-9">
        <div className="bg-[var(--primary-light)] row-span-9 col-span-3">
          <ConverSationList
            handleChatUser={handleChatUser}
            setRoom={setRoom}
            setOpenRoom={setOpenRoom}
            converSation={converSation}
            user={user}
          />
        </div>
        <div className="row-span-9 col-span-9">
          {openRoom ? (
            <ChatRoom
              chatUser={chatUser}
              navigate={navigate}
              allMessages={allMessages}
              user={user}
              handleDeleteMessage={handleDeleteMessage}
              setMessage={setMessage}
              message={message}
              handleSendMessage={handleSendMessage}
            />
          ) : (
            <EmptyChatState
              navigate={navigate}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Chat;
