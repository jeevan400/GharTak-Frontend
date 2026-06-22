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

  console.log("totoal revenue: ", revenue);
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
      title: "Yesturday Revenue",
      value: yesterdayRevenue?.toLocaleString("en-IN"),
      icon: <Calendar size={20} />,
      growth: "+8%",
    },
    {
      title: "This Month Revenue",
      value:monthRevenue?.toLocaleString("en-IN"),
      icon: <Wallet size={20} />,
      growth: "+15%",
    },
    {
      title: "Total Revenue",
      value:totalRevenu?.toLocaleString("en-IN"),
      icon: <TrendingUp size={20} />,
      growth: "+5%",
    },
  ];
  return (
    <div className="p-4 space-y-6">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold text-[var(--primary)]">Analytics</h1>

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
    </div>
  );
}

export default Analytics;
