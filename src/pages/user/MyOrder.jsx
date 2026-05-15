import React, { useEffect, useState } from "react";
import boy from "../../assets/boy.jpg";
import { getMyOrder } from "../../services/order.service";
import Navbar from "../../components/layout/Navbar";

function MyOrder() {
  const [orderData, setOrderData] = useState();
  const [items, setItems] = useState();

  const fetchMyOrder = async () => {
    try {
      const orders = await getMyOrder();
      // console.log(orders);
      setOrderData(orders);
      setItems()
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);
  return (
    <>
    <Navbar/>
      {orderData?.map((order) => (
        <div
          key={order._id}
          className="w-[60%] m-auto flex flex-col justify-center items-start bg-red-50 mt-6 rounded-lg border border-red-800"
        >
          <h1 className="text-xl font-bold border-b border-b-red-900 w-full p-4 flex justify-between items-center">
            Items{" "}
            <span className="text-red-800">&#8377;{order.totalPrice}</span>{" "}
          </h1>
          <div className="flex flex-col gap-2 w-full p-2">
            {
                order.items?.filter(item => item.product !== null).map((item, index)=>(
                    <div key={index} className="flex justify-between border p-4  shadow-md bg-white rounded-lg">
              <div className="flex gap-4">
                <div className="h-[70px] w-[70px]">
                  <img className="w-full h-full rounded-lg" src={item.product?.image || boy} alt="" />
                </div>
                <div className="flex flex-col justify-start items-start">
                  <h4 className="text-lg font-bold">{item.product?.name || "Product Unavailable"}</h4>
                  <p className="text-sm font-semibold text-gray-800 line-clamp-1 ">
                    Order {item.product?.description || "Description not available"}
                  </p>
                  <p className={`text-sm font-medium text-gray-600 ${order.paymentStatus === "Pending"?"text-red-500":"text-green-500"}`}><span className="text-gray-500">Pyament : </span> {order.paymentStatus}</p>
                </div>
              </div>
              <div className="flex flex-col justify-start items-center">
                <h1 className="text-amber-900 font-bold text-lg mb-2">
                  &#8377;{item.price}
                </h1>
                <span
                  className="px-4 py-0.5 rounded-md text-xs font-medium bg-green-100 text-green-700
                            border border-green-700 "
                >
                  {order.orderStatus}
                </span>
              </div>
            </div>
                ))
            }
          </div>
        </div>
      ))}
    </>
  );
}

export default MyOrder;
