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
    // <div className="p-4">
    //   <table className="w-full overflow-x-auto bg-white  rounded-xl">
    //     <thead>
    //       <tr className="text-left border-b">
    //         <th className="px-6 py-6 ">Seller Name</th>
    //         <th className="px-6 py-6 ">Status</th>
    //         <th className="px-6 py-6 ">Phone</th>
    //         <th className="px-6 py-6 ">Role</th>
    //         <th className="px-6 py-6 ">Actions</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {users?.map((user) => (
    //         <tr key={user._id} className="hover:bg-red-900/5 transition-all duration-200 ease-in cursor-pointer border">
    //           <td className="flex gap-4 px-4 py-6">
    //             <div className="h-[50px] w-[50px] relative">
    //               {
    //                 user.role === "admin"?<span className="absolute -top-1 right-1 text-[#D4AF37]">
    //                   <Crown size={14} fill="gold" stroke="gold" />
    //                 </span>:''
    //               }
    //               <img
    //                 className="w-full h-full rounded-full"
    //                 src={user.image}
    //                 alt=""
    //               />
    //             </div>
    //             <div>
    //               <h1 className="text-lg font-bold capitalize">{user.name}</h1>
    //               <p className="text-sm font-medium text-gray-600">
    //                 {user.email}
    //               </p>
    //             </div>
    //           </td>
    //           <td className="px-4 py-6">
    //             <span
    //               className={`px-4 py-1 border 
    //                 ${user.sellerRequestStatus === "approved" && "border border-green-500  text-green-500 bg-green-500/10"}
    //                 ${user.sellerRequestStatus === "pending" && "border border-orange-500  text-orange-500 bg-orange-500/10"}
    //                 ${user.sellerRequestStatus === "rejected" && "border border-red-500  text-red-500 bg-red-500/10"} text-xs rounded-full capitalize`}
    //             >
    //               {user.sellerRequestStatus}
    //             </span>
    //           </td>
    //           <td className="px-4 py-6">{user.phone}</td>
    //           <td className="px-4 py-6">
    //             <span
    //               className={`px-4 py-1 border 
    //                 ${user.role === "user" && "border border-green-500  text-green-500 bg-green-500/10"}
    //                 ${user.role === "seller" && "border border-blue-500  text-blue-500 bg-blue-500/10"}
    //                 ${user.role === "admin" && "border border-red-500  text-red-500 bg-red-500/10"} text-xs rounded-full capitalize`}
    //             >
    //               {user.role}
    //             </span>
    //           </td>
    //          
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>



    <div className="p-4 h-full">
          <div className="bg-[var(--bg-card)] rounded-md shadow-md overflow-hidden h-[100%]">
            <div className="overflow-x-auto overflow-y-auto h-full">
              <table className="w-full relative">
                <thead>
                  <tr className="bg-[var(--primary)] text-white text-[14px] sticky top-0 z-10">
                    <th className="px-4 py-3 text-left sticky left-0 bg-[var(--primary)]">Image</th>
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="px-4 py-3 text-left">Phone</th>
                    <th className="px-4 py-3 text-left">Role</th>
                    <th className="px-4 py-3 text-center bg-[var(--primary)] sticky right-0">Actions</th>
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
                      <td  className="px-4 py-3">
                        <span className={`px-4 py-1 border w-fit h-fit 
                    ${user.sellerRequestStatus === "approved" && "border border-green-500  text-green-500 bg-green-500/10"}
                    ${user.sellerRequestStatus === "pending" && "border border-orange-500  text-orange-500 bg-orange-500/10"}
                    ${user.sellerRequestStatus === "rejected" && "border border-red-500  text-red-500 bg-red-500/10"} text-xs rounded-full capitalize`}>
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
                        <span className={` border h-fit w-fit  px-4 py-1 text-[12px]
                 ${user.role === "user" && "border border-green-500  text-green-500 bg-green-500/10"}
                  ${user.role === "seller" && "border border-blue-500  text-blue-500 bg-blue-500/10"}
                  ${user.role === "admin" && "border border-red-500  text-red-500 bg-red-500/10"} text-xs rounded-full capitalize`}>
                    {user.role}
                  </span>
                      </td>
    
                      {/* <td className="px-4 py-3">
                        {product.stock > 0 ? (
                          <span className="text-[var(--success)] font-medium">
                            {product.stock}
                          </span>
                        ) : (
                          <span className="text-[var(--danger)] font-medium">
                            Out of Stock
                          </span>
                        )}
                      </td> */}
    
                      {/* <td className="px-4 py-3">
                        {product.isActive ? (
                          <span className="px-3 py-1 rounded-full bg-[var(--success-light)] text-[var(--success)] text-[10px]">
                            Active
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full bg-[var(--danger-light)] text-[var(--danger)] text-[10px]">
                            Blocked
                          </span>
                        )}
                      </td> */}
    
                       <td className="group-hover:bg-[var(--primary-light)] transition px-4 py-6 bg-white sticky right-0">
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
          {/* <div className=" flex justify-center items-center gap-2 my-6">
            {isTotalPages?.map((element) => (
              <button
                key={element}
                onClick={() => handlePaginationButtonClick(element)}
                className={`h-8 w-8 rounded-full text-[14px] font-medium transition-all duration-300
          ${
            currentPage === element
              ? "bg-[var(--primary)] text-white shadow-lg scale-110"
              : "bg-white border border-gray-300 text-gray-700 hover:bg-[var(--primary-light)] hover:border-[var(--primary)]"
          }`}
              >
                {element}
              </button>
            ))}
          </div> */}
        </div>
  );
}

export default Users;
