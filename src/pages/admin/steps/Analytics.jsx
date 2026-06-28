import React, { useEffect, useState } from "react";
import Card from "../../../components/common/Card";
import { Calendar, IndianRupee, TrendingUp, Wallet } from "lucide-react";
import { getRevenue } from "../../../services/order.service";
import toast from "react-hot-toast";

function Analytics() {

  const [todayRevenue, setTodayRevenue] = useState(0);
  const [yesterdayRevenue, setYesterdayRevenue] = useState(0);
  const [monthRevenue, setMonthRevenue] = useState(0);
  const [totalRevenu, setTotalRevenue] = useState(0);

  const fetchData = async () => {
    try{
      const [revenue] = await Promise.all([
    getRevenue()
  ]);

  setTodayRevenue(revenue?.todaySell[0]?.revenue);
  setYesterdayRevenue(revenue?.yesterdaySell[0]?.revenue);
  setMonthRevenue(revenue?.monthSell[0]?.revenue);
  setTotalRevenue(revenue?.overAllRevenue[0]?.revenue);

    } catch(e){
      console.log(e);
      toast.error(e.response.data.message || e.message);
    }
  }

  useEffect(()=>{
    fetchData();
  }, []);

  const stats = [
    {
      title: "Today Revenue",
      value: todayRevenue?.toLocaleString("en-IN"),
      icon: <IndianRupee size={20} />,
      growth: "+12%",
    },
    {
      title: "Yesterday Revenue",
      value: yesterdayRevenue?.toLocaleString("en-IN"),
      icon: <Calendar size={20} />,
      growth: "+8%",
    },
    {
      title: "This Month Revenue",
      value: monthRevenue?.toLocaleString("en-IN"),
      icon: <Wallet size={20} />,
      growth: "+15%",
    },
    {
      title: "Total Revenue",
      value: totalRevenu?.toLocaleString("en-IN"),
      icon: <TrendingUp size={20} />,
      growth: "+5%",
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 font-sans pb-24 h-full overflow-y-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]">
          Financial Analytics
        </h1>
        <p className="text-[var(--text-secondary)] text-[14px] font-medium mt-1">
          Track platform revenue, daily sales, and overall financial performance.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <div key={index} className="bg-white rounded-[24px] p-6 shadow-[var(--shadow-md)] border border-[var(--border-light)] flex flex-col hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-default">
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
                ₹{item.value || 0}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Analytics;
