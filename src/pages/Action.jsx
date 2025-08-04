import React, { useEffect, useState } from "react";
import { Link, Links, useLocation, } from "react-router-dom";

import { actionSummary, actionImage } from "../assests/data";
import axios from "axios";


const Action = () => {
 const { state } = useLocation();
  const [patientData, setPatientData] = useState()
  const [summary, setSummary] = useState()
console.log("Booking ID from state:", state?.booking_id);


useEffect(() => {
  if (state?.booking_id) {
    axios.get(`https://assana-test.vercel.app/v1/nurse/get-booking/${state.booking_id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {setPatientData(JSON.parse(res.data.result.call_data.questionaries)); setSummary(res.data.result.call_data.short_summary)})
    .catch((err) => console.error("Error fetching booking:", err));
  }
}, [state?.booking_id]);

console.log('patientData',patientData);
console.log('summary',summary);


  return (
    <div className="w-[95%] m-auto">
      <Link to="/appointment"><span className="text-[#2563eb] text-lg font-semibold hover:text-[#6499e0]">Back</span></Link>
      <div className="bg-[#ffffff] w-[10%] px-20 py-4 flex justify-center items-center rounded-t-lg mb-0.5 mt-2">
        <span className="bg-[#2563eb] px-6.5 py-1 rounded-4xl text-lg text-white font-semibold">Voice</span>
      </div>
    <div className="bg-[#ffffff] p-4 py-6 rounded-lg">
    <div className="grid grid-cols-2 mt-4 rounded-2xl">
       <div className="p-6">
          <h1 className="text-lg font-bold">TRANSCRIPT</h1>

          <div className="overflow-y-auto h-150 p-6 rounded-lg mt-2 bg-[#f9fafb]">


            {Array.isArray(patientData) && patientData.map((data, index) => (
                <div key={index} className="mb-4">
                  {data.role === "MESSAGE_ROLE_AGENT" && (
                    <p className="text-lg text-black">Bot: {data.text}</p>
                  )}
                  {data.role === "MESSAGE_ROLE_USER" && (
                    <p className="text-lg text-[#6499e0]">User: {data.text}</p>
                  )}
                </div>
              ))}
            
              {/* {patientData?.map((data, index) => (
              <div key={index}>
                <p className="text-lg">Bot: {data.text}</p>
                <p className="text-lg text-[#6499e0] mt-2">User: {data.timespan.start}</p>
              </div>
            ))} */}
          </div>
       </div>
       <div className="p-6">
          <h1 className="text-lg font-bold">SUMMARY</h1>
            <div className="bg-[#f9fafb] overflow-y-auto p-6 rounded-lg mt-2">
              <p className="text-lg">{summary}</p>
            </div>
           {/* <h1 className="text-lg font-bold mt-4">IMAGES</h1> 
           <div className="flex gap-x-4 mt-3">
              {actionImage.map((item,index)=>(
                <div key={index} className="bg-[#f9fafb] h-30 w-30 rounded-lg "> 
                    <img src={item.img} alt="acne" className="h-30 w-30 rounded-lg" />
                </div>
              ))}
           </div> */}
       </div>

    </div>
    </div>
    </div>
  );
};

export default Action;
