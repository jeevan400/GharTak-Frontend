import React from "react";
import toast from "react-hot-toast";
import {
  getAllStatusUser,
  getSellerRequest,
  ToggleBlockUser,
} from "../../../services/auth.service";
import { useState } from "react";
import { useEffect } from "react";
import Card from "../../../components/common/Card";
import { Check, Filter, X } from "lucide-react";

function SellerRequest() {
  const [requests, setRequests] = useState();

  const fetchRequests = async () => {
    try {
      const res = await getAllStatusUser();
      setRequests(res);
    } catch (e) {
      toast.error(e?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    try {
      const res = await approveSellerRequest(id);

      fetchRequests();
      toast.success(res.message);
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await rejectSellerRequest(id);

      fetchRequests();
      toast.success(res.message);
    } catch (e) {
      toast.error(e.response.data.message);
      console.log(e);
    }
  };

  const handleBlockedUser = async (id) => {
    try{
      const res = await ToggleBlockUser(id);
      toast.success(res.message);
      fetchRequests();
    } catch(e){
      console.log(e);
      toast.error(e.response.data.message || e.message);
    }
  }

  return (
    <div className="p-4 h-full">
      <div className="bg-[var(--bg-card)] rounded-md shadow-md overflow-hidden h-[85%]">
        <div className="overflow-x-auto overflow-y-auto h-full">
          <table className="w-full relative">
            <thead>
              <tr className="bg-[var(--primary)] text-white text-[14px] sticky top-0">
                <th className="px-4 py-3 text-left">Image</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Submittion Date</th>
                {/* <th className="px-4 py-3 text-left">Stock</th>
                    <th className="px-4 py-3 text-left">Status</th> */}
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {requests?.slice(0, 10).map((request, index) => (
                <tr
                  key={index}
                  className="border-b border-[var(--border-light)] hover:bg-[var(--primary-light)] transition text-[12px] font-semibold"
                >
                  <td className="px-4 py-3">
                    <img
                      src={request.image}
                      alt="profile image"
                      className="w-14 h-14 rounded-lg object-cover"
                    />
                  </td>

                  <td className="px-4 py-3 font-medium text-[var(--text-primary)]">
                    {request.email}
                  </td>

                  <td className="px-4 py-3 text-[var(--text-secondary)] capitalize">
                    {request.phone}
                  </td>

                  <td className="px-4 py-3 text-[var(--text-secondary)]">
                    <span
                      className={`px-4 py-1 border w-fit h-fit text-xs rounded-full capitalize
                          ${request.sellerRequestStatus === "approved" && "border border-green-500  text-green-500 bg-green-500/10"}
                    ${request.sellerRequestStatus === "pending" && "border border-orange-500  text-orange-500 bg-orange-500/10"}
                    ${request.sellerRequestStatus === "rejected" && "border border-red-500  text-red-500 bg-red-500/10"}
                          `}
                    >
                      {request.sellerRequestStatus}
                    </span>
                  </td>

                  <td className="px-4 py-3 font-semibold text-[var(--primary)]">
                    {request.createdAt.split("T")[0]}
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

                  <td className="px-4 py-3">
                    {request.sellerRequestStatus === "pending" ? (
                      <div className="flex justify-center gap-2">
                        <button className="px-3 py-1 rounded bg-[var(--success)] text-white">
                          Aprove
                        </button>

                        <button
                          // onClick={() => {
                          //   setEditModalOpen(true);
                          //   setProductId(product._id);
                          // }
                          // }
                          className="px-3 py-1 rounded bg-[var(--danger)] text-white"
                        >
                          Reject
                        </button>

                        {/* {product.isActive ? (
                            <button
                              onClick={() => handleDeactivateProduct(product._id)}
                              className="px-3 py-1 rounded bg-[var(--danger)] text-white"
                            >
                              Deactivate
                            </button>
                          ) : (
                            <button
                              onClick={() => handleDeactivateProduct(product._id)}
                              className="px-3 py-1 rounded bg-[var(--success)] text-white"
                            >
                              Activate
                            </button>
                          )} */}
                      </div>
                    ) : (
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleBlockedUser(request._id)}
                          className={`px-3 py-1 rounded  ${request.isBlocked ? "bg-[var(--success)] text-white" : "bg-[var(--danger)] text-white"}`}
                        >
                          {request.isBlocked ? "Unblock" : "Block"}
                        </button>
                      </div>
                    )}
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

export default SellerRequest;
