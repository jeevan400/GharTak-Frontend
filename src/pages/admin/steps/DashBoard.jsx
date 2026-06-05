import {
  Archive,
  CalendarClock,
  Car,
  Check,
  Eye,
  Store,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import Card from "../../../components/common/Card";
import toast from "react-hot-toast";
import {
  approveSellerRequest,
  getSellerRequest,
  rejectSellerRequest,
} from "../../../services/auth.service";

function DashBoard() {
  const [requests, setRequests] = useState();

  const fetchRequests = async () => {
    try {
      const res = await getSellerRequest();
      console.log("this is request response", res);
      setRequests(res);
    } catch (e) {
      toast.error(e?.response?.data?.message);
      console.log(e);
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

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4">
        <h1 className="text-xl font-bold">Marketplace Pulse</h1>
        <p className="text-sm font-semibold text-gray-500">
          Overview of today's performance and operations.
        </p>
      </div>
      <div className="p-4 grid grid-cols-4 gap-4 ">
        <Card className={`!mx-0`}>
          <Card.Header
            className={`flex justify-between`}
            icon={
              <div className="bg-red-600/20 p-2 rounded-lg">
                <Archive size={18} />
              </div>
            }
          >
            <div className="text-[12px] text-violet-600 font-bold bg-violet-600/20 h-fit py-1 px-2 rounded-full">
              +12%
            </div>
          </Card.Header>
          <Card.Body>
            <h1 className="text-sm font-semibold text-gray-600">TOTAL SALES</h1>
            <p className="text-lg font-bold">&#8377; 4,28,900</p>
          </Card.Body>
        </Card>
        <Card className={`!mx-0`}>
          <Card.Header
            className={`flex justify-between`}
            icon={
              <div className="bg-blue-600/20 p-2 rounded-lg">
                <Store size={18} color="#1D4ED8" />
              </div>
            }
          >
            <div className="text-[12px] text-red-800 font-bold bg-red-600/20 h-fit py-1 px-2 rounded-full">
              +8%
            </div>
          </Card.Header>
          <Card.Body>
            <h1 className="text-sm font-semibold text-gray-600">NEW SELLERS</h1>
            <p className="text-lg font-bold"> 42</p>
          </Card.Body>
        </Card>
        <Card className={`!mx-0`}>
          <Card.Header
            className={`flex justify-between`}
            icon={
              <div className="bg-red-600/25 p-2 rounded-lg">
                <CalendarClock size={18} color="#DC2626" />
              </div>
            }
          >
            <div className="text-[12px] text-red-600 font-bold bg-red-600/25 h-fit py-1 px-2 rounded-full">
              High Priority
            </div>
          </Card.Header>
          <Card.Body>
            <h1 className="text-sm font-semibold text-gray-600">
              PENDING ORDERS
            </h1>
            <p className="text-lg font-bold"> 1,024</p>
          </Card.Body>
        </Card>
        <Card className={`!mx-0`}>
          <Card.Header
            className={`flex justify-between`}
            icon={
              <div className="bg-indigo-600/25 p-2 rounded-lg">
                <Eye size={18} color="#4F46E5" />
              </div>
            }
          >
            <div className="text-[12px] text-blue-600 font-bold bg-blue-600/25 h-fit py-1 px-2 rounded-full">
              Real-time
            </div>
          </Card.Header>
          <Card.Body>
            <h1 className="text-sm font-semibold text-gray-600">
              ACTIVE USERS
            </h1>
            <p className="text-lg font-bold"> 1,024</p>
          </Card.Body>
        </Card>
      </div>
      <div className="">
        <Card className={`!p-0`}>
          <Card.Header title={`Pending Seller Approvals`} className={`p-4`}>
            <button className="text-lg font-light text-red-900">
              View All
            </button>
          </Card.Header>
          <Card.Body>
            {/* <div className="grid grid-cols-4 gap-4 -mx-4 p-4 bg-green-100">
              <div className="text-md font-bold">Seller Name</div>
              <div className="text-md font-bold">Category</div>
              <div className="text-md font-bold">Status</div>
              <div className="text-md font-bold flex justify-end">Actions</div>
            </div> */}
            <table className="w-full">
              <thead>
                <tr className="text-left bg-red-900/15 px-4 py-2">
                  <th className="px-4 py-2">Seller Name</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests?.map((request, idx) => (
                  <tr key={idx} className="hover:bg-red-900/5 transition-all duration-200 ease-in cursor-pointer">
                    <td className="flex gap-4 px-4 py-2">
                      <div className="h-[50px] w-[50px]">
                        <img
                          className="w-full h-full rounded-full"
                          src={request.image}
                          alt=""
                        />
                      </div>
                      <div>
                        <h1 className="text-lg font-bold capitalize">
                          {request.name}
                        </h1>
                        <p className="text-sm font-medium text-gray-600">
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
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card.Body>
        </Card>
      </div>

      {/* <div className='p-4 grid grid-cols-3 grid-rows-2 gap-4'>
            <div className='bg-white p-4 rounded-lg shadow-lg border border-gray-600/15 flex flex-col gap-4'>
              <div className='flex justify-between items-start'>
                <div className='bg-red-300/30 p-2 rounded-lg'><Archive size={18} /></div>
                <div className='text-[12px] text-green-600 font-bold'>+12%</div>
              </div>
              <div>
                <h1 className='text-sm font-medium text-gray-600'>TOTAL PRODUCTS</h1>
                <p className='text-md font-bold'>1,284</p>
              </div>
            </div>
            <div className='bg-white p-4 rounded-lg shadow-lg border border-gray-600/15 flex flex-col gap-4'>
              <div className='flex justify-between items-start'>
                <div className='bg-red-300/30 p-2 rounded-lg'><Archive size={18} /></div>
                <div className='text-[12px] text-green-600 font-bold'>+12%</div>
              </div>
              <div>
                <h1 className='text-sm font-medium text-gray-600'>TOTAL PRODUCTS</h1>
                <p className='text-md font-bold'>1,284</p>
              </div>
            </div>
            <div className='bg-white p-4 rounded-lg shadow-lg border border-gray-600/15 flex flex-col gap-4'>
              <div className='flex justify-between items-start'>
                <div className='bg-red-300/30 p-2 rounded-lg'><Archive size={18} /></div>
                <div className='text-[12px] text-green-600 font-bold'>+12%</div>
              </div>
              <div>
                <h1 className='text-sm font-medium text-gray-600'>TOTAL PRODUCTS</h1>
                <p className='text-md font-bold'>1,284</p>
              </div>
            </div>
            <div className='bg-white p-4 rounded-lg shadow-lg border border-gray-600/15 flex flex-col gap-4'>
              <div className='flex justify-between items-start'>
                <div className='bg-red-300/30 p-2 rounded-lg'><Archive size={18} /></div>
                <div className='text-[12px] text-green-600 font-bold'>+12%</div>
              </div>
              <div>
                <h1 className='text-sm font-medium text-gray-600'>TOTAL PRODUCTS</h1>
                <p className='text-md font-bold'>1,284</p>
              </div>
            </div>
            <div className='bg-white p-4 rounded-lg shadow-lg border border-gray-600/15 flex flex-col gap-4'>
              <div className='flex justify-between items-start'>
                <div className='bg-red-300/30 p-2 rounded-lg'><Archive size={18} /></div>
                <div className='text-[12px] text-green-600 font-bold'>+12%</div>
              </div>
              <div>
                <h1 className='text-sm font-medium text-gray-600'>TOTAL PRODUCTS</h1>
                <p className='text-md font-bold'>1,284</p>
              </div>
            </div>
            <div className='bg-white p-4 rounded-lg shadow-lg border border-gray-600/15 flex flex-col gap-4'>
              <div className='flex justify-between items-start'>
                <div className='bg-red-300/30 p-2 rounded-lg'><Archive size={18} /></div>
                <div className='text-[12px] text-green-600 font-bold'>+12%</div>
              </div>
              <div>
                <h1 className='text-sm font-medium text-gray-600'>TOTAL PRODUCTS</h1>
                <p className='text-md font-bold'>1,284</p>
              </div>
            </div>
          </div> */}
    </div>
  );
}

export default DashBoard;
