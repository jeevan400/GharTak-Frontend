import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAllUser, ToggleBlockUser } from "../../../services/auth.service";
import { Check, Crown, Eye, X } from "lucide-react";

function Users() {
  const [users, setUsers] = useState([]);

  const fetchAllUsers = async () => {
    try {
      const res = await getAllUser();
      console.log(res);
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
    <div className="p-4">
      <table className="w-full overflow-x-auto bg-white  rounded-xl">
        <thead>
          <tr className="text-left border-b">
            <th className="px-6 py-6 ">Seller Name</th>
            <th className="px-6 py-6 ">Status</th>
            <th className="px-6 py-6 ">Phone</th>
            <th className="px-6 py-6 ">Role</th>
            <th className="px-6 py-6 ">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user._id} className="hover:bg-red-900/5 transition-all duration-200 ease-in cursor-pointer border">
              <td className="flex gap-4 px-4 py-6">
                <div className="h-[50px] w-[50px] relative">
                  {
                    user.role === "admin"?<span className="absolute -top-1 right-1 text-[#D4AF37]">
                      <Crown size={14} fill="gold" stroke="gold" />
                    </span>:''
                  }
                  <img
                    className="w-full h-full rounded-full"
                    src={user.image}
                    alt=""
                  />
                </div>
                <div>
                  <h1 className="text-lg font-bold capitalize">{user.name}</h1>
                  <p className="text-sm font-medium text-gray-600">
                    {user.email}
                  </p>
                </div>
              </td>
              <td className="px-4 py-6">
                <span
                  className={`px-4 py-1 border 
                    ${user.sellerRequestStatus === "approved" && "border border-green-500  text-green-500 bg-green-500/10"}
                    ${user.sellerRequestStatus === "pending" && "border border-orange-500  text-orange-500 bg-orange-500/10"}
                    ${user.sellerRequestStatus === "rejected" && "border border-red-500  text-red-500 bg-red-500/10"} text-xs rounded-full capitalize`}
                >
                  {user.sellerRequestStatus}
                </span>
              </td>
              <td className="px-4 py-6">{user.phone}</td>
              <td className="px-4 py-6">
                <span
                  className={`px-4 py-1 border 
                    ${user.role === "user" && "border border-green-500  text-green-500 bg-green-500/10"}
                    ${user.role === "seller" && "border border-blue-500  text-blue-500 bg-blue-500/10"}
                    ${user.role === "admin" && "border border-red-500  text-red-500 bg-red-500/10"} text-xs rounded-full capitalize`}
                >
                  {user.role}
                </span>
              </td>
              <td className="px-4 py-6">
                <div className="flex gap-4">
                  {/* <div
                            className="h-[35px] w-[35px] flex justify-center items-center rounded-full border border-green-500 text-green-500 cursor-pointer"
                          >
                            <Check size={18} />
                          </div>
                          <div
                            className="h-[35px] w-[35px] flex justify-center items-center rounded-full border border-red-500 text-red-500 cursor-pointer"
                          >
                            <X size={18} />
                          </div> */}
                  <div className="h-[35px] w-[35px] flex justify-center items-center rounded-lg  cursor-pointer">
                    <Eye size={18} />
                  </div>
                  {/* {
                            user.isBlocked?<button className='border border-green-600 text-green-600 px-4 py-1 rounded-lg bg-green-600/15'>Unblock</button>:<button onClick={()=> handleBlockedUser(user._id)} className='border border-red-600 text-red-600 px-4 py-1 rounded-lg bg-red-600/15'>Block</button>
                          } */}
                  {/* <button onClick={()=> handleBlockedUser(user._id)} className='border border-red-600 text-red-600 px-4 py-1 rounded-lg bg-red-600/15'>Block</button> */}
                  <button
                    onClick={() => handleBlockedUser(user._id)}
                    className={`border  px-4 py-1 rounded-lg  ${user.isBlocked ? "border-green-600 text-green-600" : " border-red-600 text-red-600"}`}
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
  );
}

export default Users;
