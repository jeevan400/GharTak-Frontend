import React from "react";
import { useState, useEffect } from "react";
import {
  getAllOrders,
  updateOrderStatus,
} from "../../../services/order.service";
import toast from "react-hot-toast";
import Card from "../../../components/common/Card";
import {
  Banknote,
  CreditCard,
  Download,
  Filter,
  IndianRupee,
  Landmark,
  QrCode,
  X,
} from "lucide-react";
import Modal from "../../../components/common/Modal";
import { ToggleBlockUser } from "../../../services/auth.service";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { followCursor } from "tippy.js";
import "./Order.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [productModal, setProductModal] = useState(false);
  const [user, setUser] = useState({});
  const [order, setOrder] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isTotalPages, setIsTotalPages] = useState([]);
  const [debouncingSearch, setDebouncingSearch] = useState("");

  const fetchAllOrders = async () => {
    try {
      const res = await getAllOrders(debouncingSearch, currentPage, limit);
      setOrders(res.orders);
      let pageArray = [];
      for (let i = 1; i <= res.totalpages; i++) {
        pageArray[i] = i;
      }

      setIsTotalPages(pageArray);
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [debouncingSearch, currentPage, limit]);

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

  const handlePaginationButtonClick = (value) => {
    setCurrentPage(value);
  };
  return (
    <>
      <div className="p-4 h-full">
        <div className="bg-[var(--bg-card)] rounded-t-md shadow-md overflow-hidden h-[85%]">
          <div className="overflow-x-auto overflow-y-auto h-full">
            <table className="">
              <thead>
                <tr className="bg-[var(--primary)] text-white text-[14px] sticky top-0 z-10">
                  <th className="px-4 py-3 text-left whitespace-nowrap text-[13px]">
                    ORDER ID
                  </th>
                  <th className="px-4 py-3 text-left whitespace-nowrap text-[13px]">
                    CUSTOMER
                  </th>
                  <th className="px-4 py-3 text-left sticky left-0 bg-[var(--primary)] text-[13px]">
                    PRODUCTS
                  </th>
                  <th className="px-4 py-3 text-left whitespace-nowrap text-[13px]">
                    TOTAL PRICE
                  </th>
                  <th className="px-4 py-3 text-left whitespace-nowrap text-[13px]">
                    ORDER STATUS
                  </th>
                  <th className="px-4 py-3 text-left whitespace-nowrap text-[13px]">
                    DELIVERY METHOD
                  </th>
                  <th className="px-4 py-3 text-left whitespace-nowrap text-[13px]">
                    PAYMENT METHOD
                  </th>
                  <th className="px-4 py-3 text-left whitespace-nowrap text-[13px]">
                    PAYMENT STATUS
                  </th>
                  <th className="px-4 py-3 text-left sticky right-0 bg-[var(--primary)] text-[13px]">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order) => (
                  <tr
                    key={order._id}
                    className="hover:bg-[var(--primary-light)] transition group"
                  >
                    <td className="!py-4 !px-4 flex gap-2 ">
                      <div className="flex flex-col">
                        <h1 className="text-[var(--primary)] text-[12px] font-semibold">
                          {order._id}
                        </h1>
                        <p className="text-[10px] font-medium italic text-gray-500">
                          {getTimeAgo(order.createdAt)}
                        </p>
                      </div>
                    </td>
                    <td className="px-4">
                      <div>
                        <Tippy
                          followCursor={true}
                          plugins={[followCursor]}
                          interactive
                          theme="user-card"
                          content={
                            <div className="user-tooltip">
                              <img
                                src={order?.user?.image}
                                alt=""
                                className="h-8 w-8 rounded-full"
                              />

                              <div>
                                <h4 className="text-[12px] font-bold capitalize">
                                  {order?.user?.name}
                                </h4>
                                <p className="text-[8px] font-normal text-[var(--text-secondary)]">
                                  {order?.user?.email}
                                </p>
                              </div>
                            </div>
                          }
                        >
                          <h1
                            onClick={() => handleModalOpen(order.user)}
                            className=" text-[12px] font-bold capitalize hover:text-[var(--primary-hover)] cursor-pointer"
                          >
                            {order?.user?.name}
                          </h1>
                        </Tippy>
                        <p className="text-[10px] font-medium text-[var(--text-secondary)]">
                          {order?.user?.email}
                        </p>
                      </div>
                    </td>
                    <td className="sticky left-0 bg-white group-hover:bg-[var(--primary-light)] transition">
                      <div
                        onClick={() => handleProductModal(order)}
                        className=" flex gap-2 px-4 cursor-pointer"
                      >
                        <Tippy
                          followCursor={true}
                          plugins={[followCursor]}
                          interactive
                          theme="product-card"
                          content={
                            <div className="product-tooltip">
                              <img
                                src={order?.items[0]?.product?.image}
                                alt=""
                                className="product-image"
                              />

                              <div>
                                <h4 className="text-[12px] font-bold capitalize line-clamp-1">
                                  {order?.items[0]?.product?.name}
                                </h4>
                                <p className="text-[8px] font-normal text-[var(--text-secondary)] line-clamp-1">
                                  {order?.items[0]?.product?.description}
                                </p>
                              </div>
                            </div>
                          }
                        >
                          <div className="!h-[50px] !w-[50px] rounded-lg ">
                            <img
                              className="h-full w-full rounded-lg"
                              src={order?.items[0]?.product?.image}
                              alt=""
                            />
                          </div>
                        </Tippy>
                        <div className="flex-1">
                          <h1 className=" text-[12px] font-bold capitalize line-clamp-1">
                            {order?.items[0]?.product?.name}
                          </h1>
                          <p className="text-[10px] font-normal text-[var(--text-secondary)] line-clamp-1">
                            {order?.items[0]?.product?.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="">
                      <div className="w-full h-full flex justify-center items-center text-[12px] font-semibold ">
                        &#8377;{order.totalPrice}
                      </div>
                    </td>
                    <td className="pl-4">
                      <span
                        className={`w-fit flex justify-center items-center text-[10px] font-medium  !px-4 !py-0.5 rounded-lg
                        ${order.orderStatus === "Delivered" && "border border-green-500  text-green-500 bg-green-500/10"}
                        ${order.orderStatus === "Shipped" && "border border-blue-500  text-blue-500 bg-blue-500/10"}
                    ${order.orderStatus === "Processing" && "border border-orange-500  text-orange-500 bg-orange-500/10"}
                    ${order.orderStatus === "Cancelled" && "border border-red-500  text-red-500 bg-red-500/10"}`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className={`pl-4`}>
                      <span
                        className={`w-fit flex justify-center items-center text-[10px] font-medium  !px-4 !py-0.5 rounded-lg
                        ${order.deliveryMethod === "Standard Delivery" && "border border-green-500  text-green-500 bg-green-500/10"}
                        ${order.deliveryMethod === "Express Delivery" && "border border-yellow-500  text-yellow-500 bg-yellow-500/10"}`}
                      >
                        {order.deliveryMethod}
                      </span>
                    </td>
                    <td className="px-6">
                      <div className="flex justify-start items-center gap-2 text-[12px] font-medium">
                        {order.paymentMethod === "Card" && (
                          <CreditCard size={16} />
                        )}
                        {order.paymentMethod === "UPI/QR" && (
                          <QrCode size={16} />
                        )}
                        {order.paymentMethod === "COD" && (
                          <Banknote size={16} />
                        )}
                        {order.paymentMethod === "Net Banking" && (
                          <Landmark size={16} />
                        )}
                        {order.paymentMethod}
                      </div>
                    </td>
                    <td className="px-8">
                      <span
                        className={`w-full flex justify-center items-center text-[10px] font-medium !py-0.5 rounded-lg
                        ${order.paymentStatus === "Failed" && "border border-red-500  bg-red-500 text-red-50"}
                        ${order.paymentStatus === "Paid" && "border border-blue-500  bg-blue-500 text-blue-50"}
                    ${order.paymentStatus === "Pending" && "border border-orange-500  bg-orange-500 text-orange-50"}
                    `}
                      >
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="sticky right-0 bg-white group-hover:bg-[var(--primary-light)] transition">
                      <select
                        value={order.orderStatus}
                        onChange={(e) =>
                          handleUpdateOrderStatus(order._id, e.target.value)
                        }
                        className={`text-[12px] font-bold px-2 py-1 rounded-md ${order.orderStatus === "Delivered" && "border border-green-500  text-green-500 bg-green-500/10"}
                        ${order.orderStatus === "Shipped" && "border border-blue-500  text-blue-500 bg-blue-500/10"}
                    ${order.orderStatus === "Processing" && "border border-orange-500  text-orange-500 bg-orange-500/10"}
                    ${order.orderStatus === "Cancelled" && "border border-red-500  text-red-500 bg-red-500/10"}`}
                      >
                        <option
                          value="Processing"
                          className="bg-white text-black hover:bg-blue-700 hover:text-white transition cursor-pointer focus:ring-0 focus:outline-none"
                        >
                          Processing
                        </option>
                        <option
                          value="Shipped"
                          className="bg-white text-black hover:bg-blue-700 hover:text-white transition"
                        >
                          Shipped
                        </option>
                        <option
                          value="Delivered"
                          className="bg-white text-black hover:bg-blue-700 hover:text-white transition"
                        >
                          Delivered
                        </option>
                        <option
                          value="Cancelled"
                          className="bg-white text-black hover:bg-blue-700 hover:text-white transition"
                        >
                          Cancelled
                        </option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {modalOpen ? (
              <Modal onClose={setModalOpen} className={`!w-[50%]`}>
                <Modal.Header>
                  <h1 className="w-full flex justify-center items-center text-[24px] font-bold py-4">
                    User Details
                  </h1>
                </Modal.Header>
                <Modal.Body>
                  <div className="p-8 h-full flex justify-center items-start gap-20">
                    <div className="pt-10 flex flex-col gap-10">
                      <img
                        className="h-[12rem] w-[12rem]  rounded-full "
                        src={user.image}
                        alt="user profile"
                      />
                      <button
                        onClick={() => handleDeactivateUserAccount(user._id)}
                        className={`px-4 py-2 rounded-xl text-[14px] font-bold flex justify-center items-center border  
                      ${user.isBlocked ? "border-green-600 text-green-600 bg-green-50" : "border-red-600 text-red-600 bg-red-50"}`}
                      >
                        {user.isBlocked ? "Activate" : "Deactivate"}
                      </button>
                    </div>
                    <div className="">
                      <div className="flex justify-between gap-20 py-10">
                        <h1 className="text-[14px] font-bold capitalize">
                          {user.name}
                        </h1>
                        <p className="border border-blue-600 w-fit h-fit px-4 py-1 rounded-lg bg-blue-50 text-blue-600 text-[12px] font-semibold">
                          {user.role}
                        </p>
                      </div>
                      <div className="flex  gap-10">
                        <div className="flex flex-col gap-6">
                          <p className="text-[14px] font-semibold text-gray-500">
                            Email:{" "}
                          </p>
                          <p className="text-[14px] font-semibold text-gray-500">
                            City:
                          </p>
                          <p className="text-[14px] font-semibold text-gray-500">
                            State:
                          </p>
                          <p className="text-[14px] font-semibold text-gray-500">
                            Pincode:{" "}
                          </p>
                          <p className="text-[14px] font-semibold text-gray-500">
                            Phone:{" "}
                          </p>
                        </div>
                        <div className="flex flex-col gap-6">
                          <span className="text-gray-700 font-bold text-[14px]">
                            {user.email}
                          </span>
                          <span className="text-gray-700 font-bold text-[14px]">
                            {user.address.city}
                          </span>
                          <span className="text-gray-700 font-bold text-[14px]">
                            {user.address.state}
                          </span>
                          <span className="text-gray-700 font-bold text-[14px]">
                            {user.address.pincode}
                          </span>
                          <span className="text-gray-700 font-bold text-[14px]">
                            {user.phone}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Modal.Body>
              </Modal>
            ) : null}

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
                  <div
                    onClick={() => setProductModal(false)}
                    className=" p-1 rounded-md hover:bg-gray-300 transition-all duration-300 ease-in cursor-pointer"
                  >
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
                        <p className="text-[0.9rem] font-bold">
                          {order.user.name}
                        </p>
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
                        <h1
                          className={`border w-fit px-4 py-0.5 rounded-md text-[12px] font-medium mt-1
                      ${order.orderStatus === "Cancelled" && "text-red-500  border-red-500  bg-red-50 "}
                      ${order.orderStatus === "Shipped" && "text-blue-500  border-blue-500  bg-blue-50 "}
                      ${order.orderStatus === "Delivered" && "text-green-500  border-green-500  bg-green-50 "}
                      ${order.orderStatus === "Processing" && "text-orange-500  border-orange-500  bg-orange-50 "}
                      `}
                        >
                          {order.orderStatus}
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center px-4 py-2 bg-[#F1F3FF]">
                    <h1 className="text-[0.7rem] font-semibold text-gray-700">
                      LINE ITEMS
                    </h1>
                    <span className="text-[0.7rem] font-semibold text-gray-500">
                      {order.items.length} Items total
                    </span>
                  </div>
                  {order?.items?.map((item) => (
                    <div
                      key={item.product._id}
                      className="flex p-4 border-b border-gray-300 gap-4"
                    >
                      <div className="">
                        <img
                          className="h-[6rem] w-[6rem] border border-gray-400 rounded-md"
                          src={item.product.image}
                          alt="product image"
                        />
                      </div>
                      <div className="flex-1 flex justify-between">
                        <div className="flex flex-col justify-between">
                          <div>
                            <h1 className="text-base font-bold">
                              {item.product.name}
                            </h1>
                            <span className=" w-fit text-xs capitalize py-0.5 px-2 flex justify-center items-center rounded-full bg-blue-100 text-blue-600 font-medium">
                              {item.product.category}
                            </span>
                          </div>
                          <div className="text-[12px] font-semibold">
                            Qty:{" "}
                            <span className="text-gray-500">
                              {item.quantity}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col justify-between">
                          <div className="text-right">
                            <h1 className="text-[14px] font-bold">
                              &#8377;{item.quantity * item.product.price}
                            </h1>
                            <span className="text-xs font-medium text-gray-400">
                              &#8377;{item.product.price}/unit
                            </span>
                          </div>
                          <button className="text-xs font-medium text-blue-700">
                            Track Item
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </Modal.Body>
                <Modal.Footer
                  className={`bg-[#F1F3FF] p-4 rounded-bl-lg rounded-br-lg`}
                >
                  <div className="flex justify-between items-center">
                    <div className=" flex-1 flex flex-col">
                      <div className="flex-1 border-b border-gray-300 py-2">
                        <div className="flex justify-between items-center ">
                          <p className="text-[12.5px] font-normal text-gray-500 mb-2">
                            Total items &#40;{order.items.length}&#41;
                          </p>
                          <p className="text-[12.5px] font-normal text-gray-500">
                            &#8377;{order.totalPrice}
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-[12.5px] font-normal text-gray-500">
                            Shipping & Handling
                          </p>
                          <p className="text-[12.5px] font-normal text-gray-500">
                            &#8377;150
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between py-2">
                        <p className="text-[14px] font-bold">Grand Total</p>
                        <p className="text-[14px] font-bold text-blue-700">
                          &#8377;{order.totalPrice + 150}
                        </p>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col justify-center items-center gap-2 pl-[100px]">
                      <button className="bg-red-900 text-white flex justify-center items-center px-4 py-2 text-[14px] font-medium rounded-sm w-full">
                        <Download size={16} />
                        &nbsp; Download Invoice
                      </button>
                      <button className="border border-red-900 text-red-900 flex justify-center items-center px-4 py-2 text-[14px] font-medium rounded-sm w-full">
                        View Receipt
                      </button>
                    </div>
                  </div>
                </Modal.Footer>
              </Modal>
            ) : null}
          </div>
        </div>
        <div className="flex justify-between items-center bg-[var(--bg-card)] rounded-b-md">
          <div className=" flex justify-center items-center gap-2 my-4 px-2">
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
          </div>
          <div className="bg-[var(--primary)] px-2 py-2 rounded-md">
            <span className="text-[var(--primary-light)] text-[14px] font-semibold">
              Limit &nbsp;
            </span>
            <select
              className="text-[12px] p-1"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              name="limit"
              id=""
            >
              <option value={`5`}>5</option>
              <option value={`10`}>10</option>
              <option value={`50`}>50</option>
              <option value={`100`}>100</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}

export default Orders;
