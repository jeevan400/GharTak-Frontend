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
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 font-sans pb-24">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]">
          GharTak Admin Dashboard
        </h1>
        <p className="text-[var(--text-secondary)] text-[14px] font-medium mt-1">
          Manage marketplace operations, sellers, users and orders.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <div key={index} className="bg-white rounded-[24px] p-6 shadow-[var(--shadow-md)] border border-[var(--border-light)] flex flex-col hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[var(--primary)] flex items-center justify-center">
                {item.icon}
              </div>
              <span className="text-green-600 text-[12px] font-bold bg-green-50 px-2 py-1 rounded-lg border border-green-100">
                {item.growth}
              </span>
            </div>
            <div>
              <h2 className="text-[var(--text-secondary)] text-[13px] font-bold mb-1 uppercase tracking-wider">{item.title}</h2>
              <p className="text-3xl font-black text-[var(--text-primary)]">
                {item.title === "Revenue" ? `₹${item.value || 0}` : item.value || 0}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="xl:col-span-2 bg-white rounded-[24px] shadow-[var(--shadow-md)] border border-[var(--border-light)] p-6 sm:p-8">
          <h2 className="text-[18px] font-extrabold text-[var(--text-primary)] mb-6">Sales Analytics</h2>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af', fontWeight: 'bold' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af', fontWeight: 'bold' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontWeight: 'bold' }} 
                  itemStyle={{ color: 'var(--primary)' }}
                />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="var(--primary)"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorSales)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activities */}
        <div className="bg-white rounded-[24px] shadow-[var(--shadow-md)] border border-[var(--border-light)] p-6 sm:p-8">
          <h2 className="text-[18px] font-extrabold text-[var(--text-primary)] mb-6">Recent Activities</h2>
          <div className="flex flex-col gap-6">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-50 text-[var(--primary)] flex items-center justify-center shrink-0 border border-orange-100">
                  <Activity size={18} strokeWidth={2.5} />
                </div>
                <span className="text-[14px] font-bold text-[var(--text-primary)] leading-tight">{activity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Marketplace Insights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white rounded-[24px] shadow-[var(--shadow-sm)] border border-[var(--border-light)] p-6 hover:-translate-y-1 transition-transform">
          <div className="flex justify-between items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
              <Truck size={20} />
            </div>
            <span className="text-blue-600 text-[11px] font-bold bg-blue-50 px-2 py-1 rounded-md uppercase tracking-wider">Active</span>
          </div>
          <h2 className="text-[13px] font-bold text-[var(--text-secondary)] mb-1">Deliveries Running</h2>
          <p className="text-2xl font-black text-[var(--text-primary)]">432</p>
        </div>

        <div className="bg-white rounded-[24px] shadow-[var(--shadow-sm)] border border-[var(--border-light)] p-6 hover:-translate-y-1 transition-transform">
          <div className="flex justify-between items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center">
              <Clock3 size={20} />
            </div>
            <span className="text-orange-500 text-[11px] font-bold bg-orange-50 px-2 py-1 rounded-md uppercase tracking-wider">Pending</span>
          </div>
          <h2 className="text-[13px] font-bold text-[var(--text-secondary)] mb-1">Pending Orders</h2>
          <p className="text-2xl font-black text-[var(--text-primary)]">89</p>
        </div>

        <div className="bg-white rounded-[24px] shadow-[var(--shadow-sm)] border border-[var(--border-light)] p-6 hover:-translate-y-1 transition-transform">
          <div className="flex justify-between items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
              <AlertTriangle size={20} />
            </div>
            <span className="text-red-500 text-[11px] font-bold bg-red-50 px-2 py-1 rounded-md uppercase tracking-wider">Alert</span>
          </div>
          <h2 className="text-[13px] font-bold text-[var(--text-secondary)] mb-1">Return Requests</h2>
          <p className="text-2xl font-black text-[var(--text-primary)]">17</p>
        </div>

        <div className="bg-white rounded-[24px] shadow-[var(--shadow-sm)] border border-[var(--border-light)] p-6 hover:-translate-y-1 transition-transform">
          <div className="flex justify-between items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
              <Store size={20} />
            </div>
            <span className="text-green-600 text-[11px] font-bold bg-green-50 px-2 py-1 rounded-md uppercase tracking-wider">Growth</span>
          </div>
          <h2 className="text-[13px] font-bold text-[var(--text-secondary)] mb-1">Active Sellers</h2>
          <p className="text-2xl font-black text-[var(--text-primary)]">432</p>
        </div>
      </div>

      {/* Top Sellers Table */}
      <div className="bg-white rounded-[32px] shadow-[var(--shadow-md)] border border-[var(--border-light)] overflow-hidden">
        <div className="p-6 border-b border-[var(--border-light)] flex justify-between items-center bg-gray-50/30">
          <h2 className="text-[18px] sm:text-xl font-extrabold text-[var(--text-primary)]">Pending Seller Approvals</h2>
          <button className="text-[13px] font-bold text-[var(--primary)] hover:text-orange-600 transition-colors bg-orange-50 px-4 py-2 rounded-xl border border-orange-100">
            View All
          </button>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[700px] text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-[var(--border-light)]">
                <th className="px-6 py-5 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Seller Profile</th>
                <th className="px-6 py-5 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-5 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-5 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-light)]">
              {requests?.map((request, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img className="h-12 w-12 rounded-full border border-[var(--border-medium)] object-cover shadow-sm" src={request.image || "https://ui-avatars.com/api/?name=Seller"} alt="" />
                      <div>
                        <h1 className="text-[14px] font-bold text-[var(--text-primary)] capitalize group-hover:text-[var(--primary)] transition-colors">{request.name}</h1>
                        <p className="text-[12px] font-semibold text-[var(--text-secondary)]">{request.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[14px] font-bold text-[var(--text-primary)]">{request.phone || "N/A"}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1.5 bg-orange-50 text-[var(--primary)] border border-orange-200 text-[11px] font-bold rounded-lg uppercase tracking-wide">
                      {request.sellerRequestStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button onClick={() => handleApprove(request._id)} className="px-3.5 py-2 rounded-xl bg-green-50 hover:bg-green-500 text-green-600 hover:text-white font-bold text-[12px] flex items-center gap-1.5 transition-all duration-300 border border-green-200 hover:border-green-500 shadow-sm hover:shadow-md">
                        <Check size={14} strokeWidth={3} /> Approve
                      </button>
                      <button onClick={() => handleReject(request._id)} className="px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-500 text-red-600 hover:text-white font-bold text-[12px] flex items-center gap-1.5 transition-all duration-300 border border-red-200 hover:border-red-500 shadow-sm hover:shadow-md">
                        <X size={14} strokeWidth={3} /> Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!requests?.length && (
                 <tr>
                    <td colSpan="4" className="px-6 py-16 text-center text-[var(--text-secondary)]">
                       <div className="flex flex-col items-center justify-center gap-3">
                         <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                           <Check size={32} />
                         </div>
                         <h3 className="text-lg font-bold text-[var(--text-primary)]">All Caught Up!</h3>
                         <p className="text-sm font-medium text-gray-400">No pending seller requests at the moment.</p>
                       </div>
                    </td>
                 </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;