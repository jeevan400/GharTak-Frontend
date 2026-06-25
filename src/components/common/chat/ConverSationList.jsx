import { ArrowBigLeft, CheckCheck } from "lucide-react";
import React from "react";
import GharTakLogo from "../../../assets/GharTak.png";

function ConverSationList({
  handleChatUser,
  setRoom,
  setOpenRoom,
  converSation,
  user,
}) {
  return (
    <>
      <div
        className={`bg-white hover:bg-[var(--bg-main)] px-4 shadow-sm hover:shadow-md flex justify-start items-center gap-2 cursor-pointer mb-1 transition-all duration-200 ease-in`}
      >
        <img className="h-[5rem]" src={GharTakLogo} alt="" />
        {/* <div className="border p-2 rounded-full">
          <ArrowBigLeft size={20} />
        </div> */}
      </div>
      {converSation.map((item, index) => (
        <div
          onClick={() => {
            handleChatUser(item);
            setRoom(item);
            setOpenRoom(true);
          }}
          key={index}
          className={`bg-white hover:bg-[var(--bg-main)] p-4 shadow-sm hover:shadow-md flex justify-between items-center gap-2 cursor-pointer mx-1 mb-1 transition-all duration-200 ease-in rounded-lg`}
        >
          <div className="flex-1 flex justify-start gap-2 items-center">
            <img
              className="rounded-full h-12 w-12"
              src={
                item.participants.find(
                  (participant) => participant._id !== user.id,
                ).image
              }
              alt=""
            />
            <div className="flex-1 flex flex-col gap-1">
              <h1 className="text-sm font-bold text-[var(--text-primary)] capitalize flex justify-between">
                {
                  item.participants.find(
                    (participant) => participant._id !== user.id,
                  ).name
                }
                {item.unreadCount > 0 && (
            <div className="h-5 w-5 rounded-full bg-[var(--primary)] text-white text-xs font-bold flex justify-center items-center">{item.unreadCount}</div>
          )}
              </h1>
              <p className="text-xs font-medium text-[var(--text-secondary)] flex justify-between items-center flex-1">
                {/* {
                  item.participants.find(
                    (participant) => participant._id !== user.id,
                  ).email
                } */}
                {
                  item?.lastMsgObj?.text || item?.lastMessage
                }
                {
                  item.lastMsgObj && item.lastMsgObj.sender === user.id ? (
                    <CheckCheck size={14} className={`ml-1 inline-block ${item.lastMsgObj.read ? "text-[#34B7F1]" : "text-[var(--primary-light)]"}`} />
                  ) : null
                }
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default ConverSationList;
