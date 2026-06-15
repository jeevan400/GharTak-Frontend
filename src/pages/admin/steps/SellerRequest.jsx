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
    // <div className="h-full overflow-y-auto">
    //   <div className="p-4">
    //     <h1 className="text-xl font-bold">Seller Requests</h1>
    //     <p className="text-sm font-semibold text-gray-500">
    //       Review and manage onboarding applications from artisans and
    //       independent brands.
    //     </p>
    //   </div>
    //   <div className="grid grid-cols-3 p-4 gap-4">
    //     <Card className={`!mx-0`}>
    //       <Card.Body>
    //         <h1 className="">TOTAL REQUESTS</h1>
    //         <p>1,284</p>
    //         <p>+12% from last week</p>
    //       </Card.Body>
    //     </Card>
    //     <Card className={`!mx-0`}>
    //       <Card.Body>
    //         <h1 className="">TOTAL REQUESTS</h1>
    //         <p>1,284</p>
    //         <p>+12% from last week</p>
    //       </Card.Body>
    //     </Card>
    //     <Card className={`!mx-0`}>
    //       <Card.Body>
    //         <h1 className="">TOTAL REQUESTS</h1>
    //         <p>1,284</p>
    //         <p>+12% from last week</p>
    //       </Card.Body>
    //     </Card>
    //   </div>
    //   <Card>
    //     <Card.Header
    //       icon={
    //         <h1 className="text-xl font-bold text-black ">
    //           Seller Applications
    //         </h1>
    //       }
    //       title={
    //         <span className="bg-red-900/10 text-red-900 py-1 px-2 rounded-lg text-sm font-semibold">
    //           Live Queue
    //         </span>
    //       }
    //     >
    //       <div className="flex justify-center items-center gap-2  text-lg font-semibold border border-red-900 rounded-md text-red-900 bg-red-900/5 px-2 py-1">
    //         <Filter size={18} /> Filter
    //       </div>
    //     </Card.Header>
    //     <Card.Body>
    //       <table className="w-full">
    //         <thead>
    //           <tr className="bg-red-900/20 ">
    //             <th className="text-left">SELLER NAME</th>
    //             <th>PHONE</th>
    //             <th>SUBMISSION DATE</th>
    //             <th>STATUS</th>
    //             <th className="text-right">ACTION</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {requests?.map((request, index) => (
    //             <tr key={index}>
    //               <td className="py-4 flex gap-2 ">
    //                 <img
    //                   className="h-[50px] w-[50px] rounded-lg "
    //                   src={request.image}
    //                   alt=""
    //                 />
    //                 <div>
    //                   <h1 className=" text-lg font-bold capitalize">
    //                     {request.name}
    //                   </h1>
    //                   <p className="text-sm font-semibold text-gray-500">
    //                     {request.email}
    //                   </p>
    //                 </div>
    //               </td>
    //               <td>{request.phone}</td>
    //               <td>
    //                 <div>
    //                   <p className="text-sm font-semibold text-gray-500">
    //                     {request.createdAt.split("T")[0]}
    //                   </p>
    //                   <p className="text-sm font-semibold text-gray-500">
    //                     {request.createdAt.split("T")[1].split(".")[0]}
    //                   </p>
    //                 </div>
    //               </td>
    //               <td>
    //                 <span>{request.sellerRequestStatus}</span>
    //               </td>
    //               <td>
    //                 <div className="flex gap-4">
    //                   <div
    //                     onClick={() => handleApprove(request._id)}
    //                     className="h-[35px] w-[35px] flex justify-center items-center rounded-full border border-green-500 text-green-500 cursor-pointer"
    //                   >
    //                     <Check size={18} />
    //                   </div>
    //                   <div
    //                     onClick={() => handleReject(request._id)}
    //                     className="h-[35px] w-[35px] flex justify-center items-center rounded-full border border-red-500 text-red-500 cursor-pointer"
    //                   >
    //                     <X size={18} />
    //                   </div>
    //                 </div>
    //               </td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     </Card.Body>
    //   </Card>
    // </div>
    // requests?.map((user)=>(
    //   <div className='border w-[500px] m-auto mt-8 rounded-lg p-4 bg-gray-100' key={user._id}>
    //     <h1 className='text-xl font-bold'>{user.name}</h1>
    //     <p className='text-sm font-semibold'>{user.email}</p>
    //     <p className='text-xs'>{user.sellerRequestStatus}</p>
    //     <div className='flex justify-end gap-4'>
    //       <button className="px-5 py-2 bg-white rounded-lg text-orange-500 border  border-orange-500" onClick={()=> handleReject(user._id)}>Reject</button>
    //       <button className="px-5 py-2 bg-orange-500 rounded-lg hover:bg-orange-600 transition text-white" onClick={()=> handleApprove(user._id)}>Approve</button>
    //     </div>
    //   </div>
    // ))

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
          {/* {editModalOpen ? (
                <Modal
                  onClose={setEditModalOpen}
                  outerClassName={`bg-black/5`}
                  className={`overflow-y-auto`}
                >
                  <Modal.Body>
                    <div className="w-full bg-white rounded-xl shadow-xl px-8 pb-8">
                      <div className="flex flex-col items-center mb-6">
                        <img className="h-[70px]" src={GharTakLogo} alt="" />
                        <h1 className="text-2xl font-bold text-[var(--primary)]">
                          Edit Product
                        </h1>
    
                        <p className="text-sm text-[var(--text-secondary)]">
                          Fill in product details to update product
                        </p>
                      </div>
    
                      <div className="grid md:grid-cols-2 gap-4">
                        <input
                          className="border border-[var(--primary)] rounded-lg px-4 py-3"
                          placeholder="Name"
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
    
                        <input
                          type="text"
                          className="border border-[var(--primary)] rounded-lg px-4 py-3"
                          placeholder="Description"
                          onChange={(e) => setForm({ ...form, description: e.target.value })}
                        />
    
                        <input
                          className="border border-[var(--primary)] rounded-lg px-4 py-3"
                          placeholder="Price"
                          onChange={(e) =>
                            setForm({
                              ...form,
                              price: e.target.value,
                            })
                          }
                        />
    
                        <input
                          className="border border-[var(--primary)] rounded-lg px-4 py-3"
                          placeholder="Category"
                          onChange={(e) =>
                            setForm({
                              ...form,
                              category: e.target.value,
                            })
                          }
                        />
    
                        <input
                          className="border border-[var(--primary)] rounded-lg px-4 py-3"
                          placeholder="Brand"
                          onChange={(e) =>
                            setForm({
                              ...form,
                              brand: e.target.value,
                            })
                          }
                        />
    
                        <input
                          className="border border-[var(--primary)] rounded-lg px-4 py-3 "
                          placeholder="Stock"
                          onChange={(e) =>
                            setForm({
                              ...form,
                              stock: e.target.value,
                            })
                          }
                        />
                        <input
                          className="border border-[var(--primary)] rounded-lg px-4 py-3 md:col-span-2"
                          placeholder="Image URL"
                          onChange={(e) =>
                            setForm({
                              ...form,
                              image: e.target.value,
                            })
                          }
                        />
                      </div>
    
                      <button
                        style={{ background: "var(--gradient-primary)" }}
                        className="w-full mt-6 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
                        onClick={()=>handleProductUpdate(productId)}
                      >
                        Update Product
                      </button>
                    </div>
                  </Modal.Body>
                </Modal>
              ) : null} */}
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

export default SellerRequest;
