import React, { useEffect, useState } from "react";
import Card from "../../../components/common/Card";
import {
  DollarSign,
  ShoppingBag,
  Users,
  Store,
  Truck,
  AlertTriangle,
  Clock3,
  Activity,
  Check,
  X,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { approveSellerRequest, getAllUser, getSellerRequest, rejectSellerRequest } from "../../../services/auth.service";
import { getAllOrders, getRevenue } from "../../../services/order.service";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

function DashBoard() {

  const [requests, setRequests] = useState();
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalSellers, setTotalSellers] = useState(0);
  const [totalOrderCount, setTotalOrdercount] = useState(0);
  const [todaysRevenue, setTodaysRevenue] = useState(0);


  const location = useLocation();

// useEffect(() => {
//   console.log("Current Path:", location.pathname);
// }, [location]);

  const fetchRequests = async () => {
    try {
      const [res, totalUser, orders, revenue] = await Promise.all([
        getSellerRequest(),
        getAllUser(),
        getAllOrders("", 0, 0),
        getRevenue(),
      ]);
      
      const users = totalUser.filter((user)=> user.role === "user");
      const sellers = totalUser.filter((seller)=> seller.role === "seller");


      setTotalUsers(users.length);
      setTotalSellers(sellers.length);
      setTotalOrdercount(orders.totalOrders);
      setTodaysRevenue(revenue?.todaySell[0]?.revenue);
      setRequests(res);
    } catch (e) {
      toast.error(e?.response?.data?.message);
    console.log("FULL ERROR:", e);
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
      console.log(e);
      toast.error(e.response.data.message);
    }
  };
  
  const salesData = [
    { month: "Jan", sales: 12000 },
    { month: "Feb", sales: 19000 },
    { month: "Mar", sales: 24000 },
    { month: "Apr", sales: 18000 },
    { month: "May", sales: 29000 },
    { month: "Jun", sales: 35000 },
  ];

  const stats = [
    {
      title: "Revenue",
      value: todaysRevenue?.toLocaleString("en-IN"),
      icon: <DollarSign size={20} />,
      growth: "+12%",
    },
    {
      title: "Orders",
      value: totalOrderCount,
      icon: <ShoppingBag size={20} />,
      growth: "+8%",
    },
    {
      title: "Users",
      value: totalUsers,
      icon: <Users size={20} />,
      growth: "+15%",
    },
    {
      title: "Sellers",
      value: totalSellers,
      icon: <Store size={20} />,
      growth: "+5%",
    },
  ];

  const activities = [
    "New Seller Registered",
    "Order #1024 Delivered",
    "User Created Account",
    "Product Added",
    "Seller Approved",
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold text-[var(--primary)]">
          GharTak Admin Dashboard
        </h1>

        <p className="text-gray-500 text-sm">
          Manage marketplace operations, sellers, users and orders.
        </p>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((item, index) => (
          <Card key={index} className="!mx-0">
            <Card.Body>
              <div className="flex justify-between items-start">
                <div className="bg-[var(--primary-light)] p-3 rounded-xl text-[var(--primary)]">
                  {item.icon}
                </div>

                <span className="text-green-600 text-xs font-bold">
                  {item.growth}
                </span>
              </div>

              <div className="mt-4">
                <h2 className="text-gray-500 text-sm">{item.title}</h2>

                <p className="text-2xl font-bold">&#8377;{item.value}</p>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* Analytics */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Chart */}

        <Card className="xl:col-span-2 !mx-0">
          <Card.Header title="Sales Analytics" />

          <Card.Body>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="sales"
                    stroke="#7c3aed"
                    fill="#c4b5fd"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card.Body>
        </Card>

        {/* Activities */}

        <Card className="!mx-0">
          <Card.Header title="Recent Activities" />

          <Card.Body>
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 border-b pb-3"
                >
                  <Activity
                    size={16}
                    className="text-[var(--primary)]"
                  />

                  <span className="text-sm">{activity}</span>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* Marketplace Insights */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <Card className="!mx-0 !border-none shadow-md">
          <Card.Body>
            <div className="flex justify-between">
              <Truck className="text-blue-600" />
              <span className="text-blue-600 text-xs font-semibold">
                Active
              </span>
            </div>

            <h2 className="mt-4 text-gray-500 text-sm">
              Deliveries Running
            </h2>

            <p className="text-2xl font-bold">432</p>
          </Card.Body>
        </Card>

        <Card className="!mx-0 !border-none shadow-md">
          <Card.Body>
            <div className="flex justify-between">
              <Clock3 className="text-orange-500" />
              <span className="text-orange-500 text-xs font-semibold">
                Pending
              </span>
            </div>

            <h2 className="mt-4 text-gray-500 text-sm">
              Pending Orders
            </h2>

            <p className="text-2xl font-bold">89</p>
          </Card.Body>
        </Card>

        <Card className="!mx-0 !border-none shadow-md">
          <Card.Body>
            <div className="flex justify-between">
              <AlertTriangle className="text-red-500" />
              <span className="text-red-500 text-xs font-semibold">
                Alert
              </span>
            </div>

            <h2 className="mt-4 text-gray-500 text-sm">
              Return Requests
            </h2>

            <p className="text-2xl font-bold">17</p>
          </Card.Body>
        </Card>

        <Card className="!mx-0 !border-none shadow-md">
          <Card.Body>
            <div className="flex justify-between">
              <Store className="text-green-600" />
              <span className="text-green-600 text-xs font-semibold">
                Growth
              </span>
            </div>

            <h2 className="mt-4 text-gray-500 text-sm">
              Active Sellers
            </h2>

            <p className="text-2xl font-bold">432</p>
          </Card.Body>
        </Card>
      </div>

      {/* Top Sellers */}

      <Card className={`!p-0 !mx-0 !border-none shadow-md`}>
          <Card.Header title={`Pending Seller Approvals`} className={`p-4`}>
            <button className="text-[14px] font-medium text-[var(--primary)]">
              View All
            </button>
          </Card.Header>
          <Card.Body>
            <table className="w-full">
              <thead>
                <tr className="text-left text-white bg-[var(--primary)] px-4 py-2">
                  <th className="px-4 py-2">Seller Name</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
            <tbody>
              {requests?.map((request, idx) => (
                <tr key={idx} className="hover:bg-[var(--primary-light)] transition-all duration-200 ease-in cursor-pointer">
                  <td className="flex gap-4 px-4 py-2">
                    <div className="h-[50px] w-[50px]">
                      <img
                       className="w-full h-full rounded-full"
                       src={request.image}
                       alt=""
                     />
                   </div>
                      <div>
                        <h1 className="text-[14px] font-bold capitalize">
                          {request.name}
                        </h1>
                        <p className="text-[12px] font-medium text-gray-600">
                          {request.email}
                        </p>
                      </div>
                    </td>
                    <td>{request.phone}</td>
                    <td>
                      <span className="px-4 py-1 border border-orange-500  text-orange-500 bg-orange-500/10 text-xs rounded-full capitalize">
                        {request.sellerRequestStatus}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-4">
                        <div
                          onClick={() => handleApprove(request._id)}
                          className="px-3 py-1 rounded bg-[var(--success)] text-white cursor-pointer flex gap-2 justify-center items-center"
                        >
                          <Check size={12} /> Approve
                        </div>
                        <div
                          onClick={() => handleReject(request._id)}
                          className="px-3 py-1 rounded bg-[var(--danger)] text-white cursor-pointer flex gap-2 justify-center items-center"
                        >
                          <X size={12} /> Reject
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card.Body>
        </Card>
    </div>
  );
}

export default DashBoard;