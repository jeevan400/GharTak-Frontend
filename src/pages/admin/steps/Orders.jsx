import React from 'react'
import { useState } from 'react'
import { getAllOrders, updateOrderStatus } from '../../../services/order.service';
import toast from "react-hot-toast"
import { useEffect } from 'react';
import Card from '../../../components/common/Card';
import { Filter } from 'lucide-react';

function Orders() {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try{
      const res = await getAllOrders();
      setOrders(res);
      console.log("this is all order response ",res)
      toast.success(res.message);
    } catch(e){
      console.log(e);
      toast.error(e.response.data.message);
    }
  }

  useEffect(()=>{
    fetchAllOrders();
  },[]);

  const handleUpdateOrderStatus = async (orderId, status) => {
    try{
      const data = await updateOrderStatus(orderId, status);

      setOrders(
        (prev)=>
          prev.map(
            (order)=>
              order._id === orderId 
            ? {
              ...order,
              orderStatus: status,
            }
            : order
          )
      )
    } catch(e){
      console.log(e);
      toast.error(e.response.data.message);
    }
  }

const getTimeAgo = (date)=>{
  const second = Math.floor((new Date() - new Date(date))/1000);

  const minutes = Math.floor(second/60);
  const hours = Math.floor(second/3600);
  const days = Math.floor(second/84600);

  if(minutes < 60){
    return `${minutes} minutes ago`;
  } 
  else if(hours<24){
    return `${hours} hours ago`;
  }else{
    return `${days} days ago`;
  }
};

  return (
        <Card className={`overflow-auto`}>
        <Card.Header
          icon={
            <h1 className="text-xl font-bold text-black ">
              Seller Applications
            </h1>
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
                <th className='px-4 whitespace-nowrap'>CUSTOMER</th>
                <th className='px-4 whitespace-nowrap'>PRODUCTS</th>
                <th className="px-4 whitespace-nowrap">TOTAL PRICE</th>
                <th className='px-4 whitespace-nowrap'>ORDER STATUS</th>
                <th className='px-4 whitespace-nowrap'>DELIVERY METHOD</th>
                <th className='px-4 whitespace-nowrap'>PAYMENT METHOD</th>
                <th className='px-4 whitespace-nowrap'>PAYMENT STATUS</th>
                <th className='px-4 whitespace-nowrap'>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <tr>
                  <td className="py-4 flex gap-2 ">
                    <div className='flex flex-col'>
                      <h1 className='text-indigo-500 text-lg font-bold'>{order._id}</h1>
                      <p className='text-sm font-semibold italic text-gray-500'>{getTimeAgo(order.createdAt)}</p>
                    </div>
                  </td>
                  <td className='px-4'>
                    <div>
                      <h1 className=" text-[16px] font-semibold capitalize">
                        {order?.user?.name}
                      </h1>
                      <p className="text-sm font-medium text-gray-500">
                        {order?.user?.email}
                      </p>
                    </div></td>
                    <td className='flex gap-2 px-4'>
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
                    </td>
                  <td>
                    &#8377;{order.totalPrice}
                  </td>
                  <td>
                    <span className='w-fit flex justify-center items-center text-[14px] font-medium text-blue-600 border border-blue-600 bg-blue-200  !px-4 !py-0.5 rounded-lg'>{order.orderStatus}</span>
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
                  <td>
                    {order.paymentMethod}
                  </td>
                  <td>
                    {order.paymentStatus}
                  </td>
                  <td>
                    <select 
                          value={order.orderStatus}
                          onChange={(e)=> handleUpdateOrderStatus(order._id, e.target.value)}
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
        </Card.Body>
      </Card>
  )
}

export default Orders
