import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAllUser, ToggleBlockUser } from "../../../services/auth.service";
import { Check, Crown, Eye, X } from "lucide-react";

function Users() {
  const [users, setUsers] = useState([]);

  const fetchAllUsers = async () => {
    try {
      const res = await getAllUser();
      setUsers(res);
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleBlockedUser = async (id) => {
    try {
      const res = await ToggleBlockUser(id);
      toast.success(res.message);
      fetchAllUsers();
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
    }
  };

  return (
    <div className="p-4 h-full">
      <div className="bg-[var(--bg-card)] rounded-md shadow-md overflow-hidden h-[100%]">
        <div className="overflow-x-auto overflow-y-auto h-full">
          <table className="w-full relative">
            <thead>
              <tr className="bg-[var(--primary)] text-white text-[14px] sticky top-0 z-10">
                <th className="px-4 py-3 text-left sticky left-0 bg-[var(--primary)]">
                  Image
                </th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-center bg-[var(--primary)] sticky right-0">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {users?.slice(0, 10).map((user) => (
                <tr
                  key={user._id}
                  className="group border-b border-[var(--border-light)] hover:bg-[var(--primary-light)] transition text-[12px] font-semibold"
                >
                  <td className="group-hover:bg-[var(--primary-light)] transition px-4 py-3 sticky left-0 bg-white ">
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-14 h-14 rounded-lg object-cover"
                    />
                  </td>

                  <td className="px-4 py-3 font-medium text-[var(--text-primary)]">
                    {user.name}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-4 py-1 border w-fit h-fit 
                    ${user.sellerRequestStatus === "approved" && "border border-green-500  text-green-500 bg-green-500/10"}
                    ${user.sellerRequestStatus === "pending" && "border border-orange-500  text-orange-500 bg-orange-500/10"}
                    ${user.sellerRequestStatus === "rejected" && "border border-red-500  text-red-500 bg-red-500/10"} text-xs rounded-full capitalize`}
                    >
                      {user.sellerRequestStatus}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-[var(--text-secondary)] capitalize">
                    {user.email}
                  </td>

                  <td className="px-4 py-3 text-[var(--text-secondary)]">
                    {user.phone}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={` border h-fit w-fit  px-4 py-1 text-[12px]
                 ${user.role === "user" && "border border-green-500  text-green-500 bg-green-500/10"}
                  ${user.role === "seller" && "border border-blue-500  text-blue-500 bg-blue-500/10"}
                  ${user.role === "admin" && "border border-red-500  text-red-500 bg-red-500/10"} text-xs rounded-full capitalize`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="group-hover:bg-[var(--primary-light)] transition px-4 py-6 bg-white sticky right-0">
                    <div className="flex gap-4">
                      <div className="h-[35px] w-[35px] flex justify-center items-center rounded-lg  cursor-pointer">
                        <Eye size={18} />
                      </div>
                      <button
                        onClick={() => handleBlockedUser(user._id)}
                        className={`border  px-4 py-1 rounded-lg  ${user.isBlocked ? "bg-[var(--success)] text-white" : "bg-[var(--danger)] text-white"}`}
                      >
                        {user.isBlocked ? "Unblock" : "Block"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Users;
