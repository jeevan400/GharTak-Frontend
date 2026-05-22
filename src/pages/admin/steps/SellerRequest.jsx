import React from 'react'
import toast from 'react-hot-toast';
import { getSellerRequest } from '../../../services/auth.service';
import { useState } from 'react';
import { useEffect } from 'react';

function SellerRequest() {

    const [requests, setRequests] = useState();

    const fetchRequests = async () => {
        try{
            const res = await getSellerRequest();
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
          await approveSellerRequest(id);
    
          fetchRequests();
        } catch(e){
          console.log(e);
        }
      }
    
      const handleReject = async (id) => {
        try{
          await rejectSellerRequest(id);
    
          fetchRequests();
        } catch(e){
          console.log(e);
        }
      }
  return (
      requests?.map((user)=>(
        <div className='border w-[500px] m-auto mt-8 rounded-lg p-4 bg-gray-100' key={user._id}> 
          <h1 className='text-xl font-bold'>{user.name}</h1>
          <p className='text-sm font-semibold'>{user.email}</p>
          <p className='text-xs'>{user.sellerRequestStatus}</p>
          <div className='flex justify-end gap-4'>
            <button className="px-5 py-2 bg-white rounded-lg text-orange-500 border  border-orange-500" onClick={()=> handleReject(user._id)}>Reject</button>
            <button className="px-5 py-2 bg-orange-500 rounded-lg hover:bg-orange-600 transition text-white" onClick={()=> handleApprove(user._id)}>Approve</button>
          </div>
        </div>
      ))
  )
}

export default SellerRequest
