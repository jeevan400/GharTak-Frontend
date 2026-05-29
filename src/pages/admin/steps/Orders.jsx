import React from "react";
import { useState, useEffect } from "react";
import {
  getAllOrders,
  updateOrderStatus,
} from "../../../services/order.service";
import toast from "react-hot-toast";
import Card from "../../../components/common/Card";
import { Download, Filter, X } from "lucide-react";
import Modal from "../../../components/common/Modal";
import { ToggleBlockUser } from "../../../services/auth.service";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [productModal, setProductModal] = useState(false);
  const [user, setUser] = useState({});
  const [order, setOrder] = useState();

  const fetchAllOrders = async () => {
    try {
      const res = await getAllOrders();
      setOrders(res);
      console.log("this is all order response ", res);
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      const data = await updateOrderStatus(orderId, status);

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId
            ? {
                ...order,
                orderStatus: status,
              }
            : order,
        ),
      );
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
    }
  };

  const getTimeAgo = (date) => {
    const second = Math.floor((new Date() - new Date(date)) / 1000);

    const minutes = Math.floor(second / 60);
    const hours = Math.floor(second / 3600);
    const days = Math.floor(second / 84600);

    if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else {
      return `${days} days ago`;
    }
  };

  const handleModalOpen = (data) => {
    setModalOpen(true);
    setUser(data);
  };

  const handleProductModal = (data) => {
    setProductModal(true);
    setOrder(data);
  };

  const handleDeactivateUserAccount = async (id) => {
    try {
      const res = await ToggleBlockUser(id);
      toast.success(res.message);
      setUser(res.user);
      setOrders((prev) =>
        prev.map((order) =>
          order.user?._id === res.user._id
            ? {
                ...order,
                user: res.user,
              }
            : order,
        ),
      );
      fetchAllOrders();
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
    }
  };
  return (
    <Card className={`overflow-auto`}>
      <Card.Header
        icon={
          <h1 className="text-xl font-bold text-black ">Seller Applications</h1>
        }
        title={
          <span className="bg-red-900/10 text-red-900 py-1 px-2 rounded-lg text-sm font-semibold">
            Live Queue
          </span>
        }
      >
        <div className="flex justify-center items-center gap-2  text-lg font-semibold border border-red-900 rounded-md text-red-900 bg-red-900/5 px-2 py-1">
          <Filter size={18} /> Filter
        </div>
      </Card.Header>
      <Card.Body className={`w-full `}>
        <table className="">
          <thead>
            <tr className="bg-red-900/20 ">
              <th className="text-left px-4 whitespace-nowrap">ORDER ID</th>
              <th className="px-4 whitespace-nowrap">CUSTOMER</th>
              <th className="px-4 whitespace-nowrap">PRODUCTS</th>
              <th className="px-4 whitespace-nowrap">TOTAL PRICE</th>
              <th className="px-4 whitespace-nowrap">ORDER STATUS</th>
              <th className="px-4 whitespace-nowrap">DELIVERY METHOD</th>
              <th className="px-4 whitespace-nowrap">PAYMENT METHOD</th>
              <th className="px-4 whitespace-nowrap">PAYMENT STATUS</th>
              <th className="px-4 whitespace-nowrap">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr className="">
                <td className="!py-4 flex gap-2 ">
                  <div className="flex flex-col">
                    <h1 className="text-indigo-500 text-lg font-bold">
                      {order._id}
                    </h1>
                    <p className="text-sm font-semibold italic text-gray-500">
                      {getTimeAgo(order.createdAt)}
                    </p>
                  </div>
                </td>
                <td className="px-4">
                  <div>
                    <h1
                      onClick={() => handleModalOpen(order.user)}
                      className=" text-[18px] font-semibold capitalize hover:text-red-900 cursor-pointer"
                    >
                      {order?.user?.name}
                    </h1>
                    <p className="text-sm font-medium text-gray-500">
                      {order?.user?.email}
                    </p>
                  </div>
                </td>
                <td className="">
                  <div
                    onClick={() => handleProductModal(order)}
                    className=" flex gap-2 px-4 cursor-pointer"
                  >
                    <img
                      className="h-[50px] w-[50px] rounded-lg "
                      src={order?.items[0]?.product?.image}
                      alt=""
                    />
                    <div>
                      <h1 className=" text-lg font-bold capitalize line-clamp-1">
                        {order?.items[0]?.product?.name}
                      </h1>
                      <p className="text-sm font-semibold text-gray-500 line-clamp-1">
                        {order?.items[0]?.product?.description}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="">
                  <div className="flex justify-center items-center">
                    &#8377;{order.totalPrice}
                  </div>
                </td>
                <td>
                  <span className="w-fit flex justify-center items-center text-[14px] font-medium text-blue-600 border border-blue-600 bg-blue-200  !px-4 !py-0.5 rounded-lg">
                    {order.orderStatus}
                  </span>
                </td>
                <td>
                  {/* <div className="flex gap-4">
                      <div
                        onClick={() => handleApprove(request._id)}
                        className="h-[35px] w-[35px] flex justify-center items-center rounded-full border border-green-500 text-green-500 cursor-pointer"
                      >
                        <Check size={18} />
                      </div>
                      <div
                        onClick={() => handleReject(request._id)}
                        className="h-[35px] w-[35px] flex justify-center items-center rounded-full border border-red-500 text-red-500 cursor-pointer"
                      >
                        <X size={18} />
                      </div>
                    </div> */}
                  {order.deliveryMethod}
                </td>
                <td>{order.paymentMethod}</td>
                <td>{order.paymentStatus}</td>
                <td>
                  <select
                    value={order.orderStatus}
                    onChange={(e) =>
                      handleUpdateOrderStatus(order._id, e.target.value)
                    }
                    className="px-4 py-2 rounded-md text-xs font-medium bg-red-900/10 text-red-900
                            border border-red-900 "
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {modalOpen ? (
          <Modal onClose={setModalOpen} className={`!w-[50%]`}>
            <Modal.Header>
              <h1 className="w-full flex justify-center items-center text-3xl font-bold py-4">
                User Details
              </h1>
            </Modal.Header>
            <Modal.Body>
              <div className="p-8 h-full flex justify-center items-start gap-20">
                <div className="pt-10 flex flex-col gap-10">
                  <img
                    className="h-[14rem] w-[14rem]  rounded-full "
                    src={user.image}
                    alt="user profile"
                  />
                  <button
                    onClick={() => handleDeactivateUserAccount(user._id)}
                    className={`px-4 py-2 rounded-xl text-lg font-bold flex justify-center items-center border  
                      ${user.isBlocked ? "border-green-600 text-green-600 bg-green-50" : "border-red-600 text-red-600 bg-red-50"}`}
                  >
                    {user.isBlocked ? "Activate" : "Deactivate"}
                  </button>
                </div>
                <div className="">
                  <div className="flex justify-between gap-20 py-10">
                    <h1 className="text-3xl font-bold capitalize">
                      {user.name}
                    </h1>
                    <p className="border border-blue-600 w-fit h-fit px-4 py-1 rounded-lg bg-blue-50 text-blue-600 text-sm font-semibold">
                      {user.role}
                    </p>
                  </div>
                  <div className="flex  gap-10">
                    <div className="flex flex-col gap-6">
                      <p className="text-[18px] font-semibold text-gray-500">
                        Email:{" "}
                      </p>
                      <p className="text-[18px] font-semibold text-gray-500">
                        City:
                      </p>
                      <p className="text-[18px] font-semibold text-gray-500">
                        State:
                      </p>
                      <p className="text-[18px] font-semibold text-gray-500">
                        Pincode:{" "}
                      </p>
                      <p className="text-[18px] font-semibold text-gray-500">
                        Phone:{" "}
                      </p>
                    </div>
                    <div className="flex flex-col gap-6">
                      <span className="text-gray-700 font-bold text-[18px]">
                        {user.email}
                      </span>
                      <span className="text-gray-700 font-bold text-[18px]">
                        {user.address.city}
                      </span>
                      <span className="text-gray-700 font-bold text-[18px]">
                        {user.address.state}
                      </span>
                      <span className="text-gray-700 font-bold text-[18px]">
                        {user.address.pincode}
                      </span>
                      <span className="text-gray-700 font-bold text-[18px]">
                        {user.phone}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        ) : (
          ""
        )}

        {productModal ? (
          <Modal onClose={setProductModal}>
            <Modal.Header
              className={`bg-[#F1F3FF] rounded-tl-lg rounded-tr-lg border-b border-gray-300`}
            >
              <div>
                <p className="text-[12px] font-semibold text-gray-500">
                  ORDER REFERENCE
                </p>
                <h1 className="text-[14px] font-bold">#{order._id}</h1>
              </div>
              <div onClick={()=> setProductModal(false)} className=" p-1 rounded-md hover:bg-gray-300 transition-all duration-300 ease-in cursor-pointer">
                <X size={18} />
              </div>
            </Modal.Header>
            <Modal.Body className={`overflow-y-auto`}>
              <div className="flex justify-between p-4  border-b border-gray-300">
                <div className=" flex-1 flex flex-col gap-2">
                  <div>
                    <h1 className="text-[0.7rem] font-semibold text-gray-500">
                      CUSTOMER
                    </h1>
                    <p className="text-[0.9rem] font-bold">{order.user.name}</p>
                  </div>
                  <div>
                    <h1 className="text-[0.7rem] font-semibold text-gray-500">
                      EMAIL ADDRESS
                    </h1>
                    <p className="text-[0.9rem] font-bold">
                      {order.user.email}
                    </p>
                  </div>
                </div>
                <div className="flex-1 border-l border-gray-300 px-6 flex flex-col gap-2">
                  <div>
                    <p className="text-[0.7rem] font-semibold text-gray-500">
                      ORDER DATE
                    </p>
                    <h1 className="text-[0.9rem] font-bold">
                      {order.createdAt.split("T")[0]}
                    </h1>
                  </div>
                  <div>
                    <p className="text-[0.7rem] font-semibold text-gray-500">
                      STATUS
                    </p>
                    <h1 className={`border w-fit px-4 py-0.5 rounded-md text-[12px] font-medium mt-1
                      ${order.orderStatus === "Cancelled"&&"text-red-500  border-red-500  bg-red-50 "}
                      ${order.orderStatus === "Shipped"&&"text-blue-500  border-blue-500  bg-blue-50 "}
                      ${order.orderStatus === "Delivered"&&"text-green-500  border-green-500  bg-green-50 "}
                      ${order.orderStatus === "Processing"&&"text-orange-500  border-orange-500  bg-orange-50 "}
                      `}>
                      {order.orderStatus}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center px-4 py-2 bg-[#F1F3FF]">
                <h1 className="text-[0.7rem] font-semibold text-gray-700">
                  LINE ITEMS
                </h1>
                {console.log(order)}
                <span className="text-[0.7rem] font-semibold text-gray-500">
                  {order.items.length} Items total
                </span>
              </div>
              {order?.items?.map((item) => (
                <div key={item.product._id} className="flex p-4 border-b border-gray-300 gap-4">
                  <div className="">
                    <img className="h-[6rem] w-[6rem] border border-gray-400 rounded-md" src={item.product.image} alt="product image" />
                  </div>
                  <div className="flex-1 flex justify-between">
                    <div className="flex flex-col justify-between">
                      <div>
                        <h1 className="text-base font-bold">{item.product.name}</h1>
                        <span className=" w-fit text-xs capitalize py-0.5 px-2 flex justify-center items-center rounded-full bg-blue-100 text-blue-600 font-medium">{item.product.category}</span>
                      </div>
                      <div className="text-[12px] font-semibold">Qty: <span className="text-gray-500">{item.quantity}</span></div>
                    </div>
                    <div className="flex flex-col justify-between">
                      <div className="text-right">
                        <h1 className="text-lg font-bold">&#8377;{item.quantity * item.product.price}</h1>
                        <span className="text-xs font-medium text-gray-400">&#8377;{item.product.price}/unit</span>
                      </div>
                      <button className="text-xs font-medium text-blue-700">Track Item</button>
                    </div>
                  </div>
                </div>
              ))}
            </Modal.Body>
            <Modal.Footer className={`bg-[#F1F3FF] p-4 rounded-bl-lg rounded-br-lg`}>
              <div className="flex justify-between items-center">
                <div className=" flex-1 flex flex-col">
                  <div className="flex-1 border-b border-gray-300 py-2">
                    <div className="flex justify-between items-center ">
                      <p className="text-[12.5px] font-normal text-gray-500 mb-2">Total items &#40;{order.items.length}&#41;</p>
                      <p className="text-[12.5px] font-normal text-gray-500">&#8377;{order.totalPrice}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-[12.5px] font-normal text-gray-500">Shipping & Handling</p>
                      <p className="text-[12.5px] font-normal text-gray-500">&#8377;150</p>
                    </div>
                  </div>
                  <div className="flex justify-between py-2">
                    <p className="text-[14px] font-bold">Grand Total</p>
                      <p className="text-[14px] font-bold text-blue-700">&#8377;{order.totalPrice + 150}</p>
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-center items-center gap-2 pl-[100px]">
                  <button className="bg-red-900 text-white flex justify-center items-center px-4 py-2 text-[14px] font-medium rounded-sm w-full"><Download size={16}/>&nbsp; Download Invoice</button>
                  <button className="border border-red-900 text-red-900 flex justify-center items-center px-4 py-2 text-[14px] font-medium rounded-sm w-full">View Receipt</button>
                </div>
              </div>
            </Modal.Footer>
          </Modal>
        ) : (
          ""
        )}
      </Card.Body>
    </Card>
  );
}

export default Orders;
