import React from 'react'
import toast from 'react-hot-toast';
import { getAllStatusUser, getSellerRequest } from '../../../services/auth.service';
import { useState } from 'react';
import { useEffect } from 'react';
import Card from '../../../components/common/Card';
import { Check, Filter, X } from 'lucide-react';

function SellerRequest() {

    const [requests, setRequests] = useState();

    const fetchRequests = async () => {
        try{
            const res = await getAllStatusUser();
            setRequests(res);
        } catch(e){
            toast.error(e?.response?.data?.message);
        }
    }

    useEffect(()=> {
        fetchRequests();
    },[]);

    const handleApprove = async (id) => {
        try{
           const res = await approveSellerRequest(id);
    
          fetchRequests();
          toast.success(res.message);
        } catch(e){
          console.log(e);
          toast.error(e.response.data.message)
        }
      }
    
      const handleReject = async (id) => {
        try{
          const res = await rejectSellerRequest(id);
    
          fetchRequests();
          toast.success(res.message);
        } catch(e){
          toast.error(e.response.data.message);
          console.log(e);
        }
      }
  return (
    <div className='h-full overflow-y-auto'>
      <div className="p-4">
        <h1 className="text-xl font-bold">Seller Requests</h1>
        <p className="text-sm font-semibold text-gray-500">
          Review and manage onboarding applications from artisans and independent brands.
        </p>
      </div>
      <div className='grid grid-cols-3 p-4 gap-4'>
        <Card className={`!mx-0`}>
          <Card.Body>
            <h1 className=''>TOTAL REQUESTS</h1>
            <p>1,284</p>
            <p>+12% from last week</p>
          </Card.Body>
        </Card>
        <Card className={`!mx-0`}>
          <Card.Body>
    <h1 className=''>TOTAL REQUESTS</h1>
            <p>1,284</p>
            <p>+12% from last week</p>
          </Card.Body>
        </Card>
        <Card className={`!mx-0`}>
          <Card.Body>
            <h1 className=''>TOTAL REQUESTS</h1>
            <p>1,284</p>
            <p>+12% from last week</p>
          </Card.Body>
        </Card>
      </div>
      <Card>
        <Card.Header icon={<h1 className='text-xl font-bold text-black '>Seller Applications</h1>} title={<span className='bg-red-900/10 text-red-900 py-1 px-2 rounded-lg text-sm font-semibold'>Live Queue</span>}>
          <div className='flex justify-center items-center gap-2  text-lg font-semibold border border-red-900 rounded-md text-red-900 bg-red-900/5 px-2 py-1'><Filter size={18}/> Filter</div>
        </Card.Header>
        <Card.Body>
          <table className='w-full'>
            <tr className='bg-red-900/20 '>
              <th className='text-left'>SELLER NAME</th>
              <th>PHONE</th>
              <th>SUBMISSION DATE</th>
              <th>STATUS</th>
              <th className='text-right'>ACTION</th>
            </tr>
            {
              requests?.map((request)=>(
                <tr>
                  <td className='py-4 flex gap-2 '>
                    <img className='h-[50px] w-[50px] rounded-lg ' src={request.image} alt="" />
                    <div>
                      <h1 className=' text-lg font-bold capitalize'>{request.name}</h1>
                      <p className='text-sm font-semibold text-gray-500'>{request.email}</p>
                    </div>
                  </td>
                  <td >
                    {
                      request.phone
                    }
                  </td>
                  <td>
                    <div>
                      <p className='text-sm font-semibold text-gray-500'>
                      {
                      (request.createdAt).split("T")[0]
                    }
                      </p>
                      <p className='text-sm font-semibold text-gray-500'>{
                        (request.createdAt).split("T")[1].split(".")[0]
}</p>
                    </div>
                  </td>
                  <td>
                    <span>{request.sellerRequestStatus}</span>
                  </td>
                  <td>
                    <div className="flex gap-4">
                        <div onClick={()=> handleApprove(request._id)} className="h-[35px] w-[35px] flex justify-center items-center rounded-full border border-green-500 text-green-500 cursor-pointer">
                          <Check size={18}/>
                        </div>
                        <div onClick={()=> handleReject(request._id)} className="h-[35px] w-[35px] flex justify-center items-center rounded-full border border-red-500 text-red-500 cursor-pointer">
                          <X size={18}/>
                        </div>
                      </div>
                  </td>
                </tr>
              ))
            }
          </table>
        </Card.Body>
      </Card>
    </div>
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
  )
}

export default SellerRequest
