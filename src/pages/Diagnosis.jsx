import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'

const Diagnosis = () => {
  const { state } = useLocation();
  const bookingId = state?.booking_id;
  return (

    <div className='bg-[#ffffff] h-210 w-[80%] m-auto rounded-lg overflow-y-auto mt-4'>
      <div className='p-4'><Link to="/action" state={{ booking_id: bookingId }}><span className="text-[#2563eb] text-lg font-semibold hover:text-[#6499e0]">Back</span></Link></div>

        <div className='bg-[#ffffff]  w-[95%] m-auto mt-10 grid grid-cols-2 grid-rows-2 gap-4 gap-y-6 rounded-lg'>
            <div className='bg-[#f0f3fb] p-8 rounded-lg shadow-xl'>
                <h1 className='font-semibold text-2xl'>Doctor Notes</h1>
                <input type='text' placeholder="Enter doctor's notes here" className='bg-[#f9fafb] w-full pb-110 mt-4 rounded-lg px-6 pt-6 text-lg shadow-xl' />
            </div>
            <div className='bg-[#f0f3fb] p-8 rounded-lg shadow-xl'>
                <h1 className='font-semibold text-2xl'>Prescription</h1>
                <input type='text' placeholder="Enter prescription details here" className='bg-[#f9fafb] w-full pb-110 mt-4 rounded-lg px-6 pt-6 text-lg shadow-xl' />
            </div>
            <div className=' p-8 rounded-lg h-110 '>
                <h1 className='font-semibold text-2xl'>Upload Prescription</h1>
                <input type='file' placeholder="Enter prescription details here" className='bg-[#f9fafb] w-full pb-50 mt-4 rounded-lg px-6 pt-6 text-lg border-2 border-[#acabab] border-dotted shadow-xl' />
            </div>
            <div className='bg-[#f0f3fb] p-8 rounded-lg h-110 shadow-xl'>
                <h1 className='font-semibold text-2xl'>Additional Notes</h1>
                <input type='text' placeholder="Enter additional comments or instructions here" className='bg-[#f9fafb] w-full pb-60 mt-4 rounded-lg px-6 pt-6 text-lg shadow-xl' />
            </div>

        </div>
        <div  className="flex justify-end relative right-10 bottom-20"><button onClick={()=>toast.error("A demo version, operational in development mode.")} className="p-2 px-6 rounded-xl bg-[#2563eb] text-white text-lg hover:bg-[#6499e0]">Save</button></div>
    </div>
  )
}

export default Diagnosis