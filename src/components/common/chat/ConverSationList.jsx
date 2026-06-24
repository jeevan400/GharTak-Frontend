import { ArrowBigLeft } from "lucide-react";
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
        <div className="border p-2 rounded-full">
          <ArrowBigLeft size={20} />
        </div>
      </div>
      {converSation.map((item, index) => (
        <div
          onClick={() => {
            handleChatUser(item);
            setRoom(item);
            setOpenRoom(true);
          }}
          key={index}
          className={`bg-white hover:bg-[var(--bg-main)] p-4 shadow-sm hover:shadow-md flex justify-start items-center gap-2 cursor-pointer mx-1 mb-1 transition-all duration-200 ease-in rounded-lg`}
        >
          <img
            className="rounded-full h-12 w-12"
            src={
              item.participants.find(
                (participant) => participant._id !== user.id,
              ).image
            }
            alt=""
          />
          <div>
            <h1 className="text-sm font-bold text-[var(--text-primary)] capitalize">
              {
                item.participants.find(
                  (participant) => participant._id !== user.id,
                ).name
              }
            </h1>
            <p className="text-xs font-medium text-[var(--text-secondary)]">
              {
                item.participants.find(
                  (participant) => participant._id !== user.id,
                ).email
              }
            </p>
          </div>
        </div>
      ))}
    </>
  );
}

export default ConverSationList;
