import { Archive } from 'lucide-react'
import React from 'react'

function DashBoard() {
  return (
    <div className='h-full overflow-y-auto'>
          <div className='p-4'>
            <h1 className='text-xl font-bold'>Marketplace Pulse</h1>
            <p className='text-sm font-semibold text-gray-500'>Overview of today's performance and operations.</p>
          </div>
          <div className='p-4 grid grid-cols-3 grid-rows-2 gap-4'>
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
          </div>
        </div>
  )
}

export default DashBoard;
