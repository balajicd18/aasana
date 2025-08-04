import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

const PatientInfo = () => {


  const { state } = useLocation();
  const [patientData, setPatientData] = useState(null);


  useEffect(() => {
    const fetchPatientInfo = async () => {
      try {
        const response = await axios.get("https://assana-test.vercel.app/v1/nurse/get-all-patients", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // 🔐 if required
          },
        });

        const allPatients = response.data.result;

        // Find the specific patient by ID passed from Dashboard
        const targetPatient = allPatients.find(
          (patient) => patient.patient_id === state.patient_id
        );

        setPatientData(targetPatient);
      } catch (error) {
        console.error("Error fetching patient data", error);
      }
    };

    if (state?.patient_id) {
      fetchPatientInfo();
    }
  }, [state]);

  if (!patientData) return <div>Loading patient info...</div>;

  return (
    <div className=' h-screen'>
        <div className='bg-[] self-start w-[95%] m-auto mt-6 '>
            <Link to="/dashboard"><h1 className="text-[#2563eb] text-lg font-semibold hover:text-[#6499e0]  w-full items-start">Back</h1></Link>
        </div>
        <div className='bg-[#ffffff] h-200 w-[95%] m-auto rounded-lg flex flex-col justify-center mt-4'>
            <h1 className='font-bold text-3xl mb-12 px-30'>Patient Information</h1>
           <div className=''>
          <div className='grid grid-cols-2 grid-rows-4 px-30  gap-10 bg-[]'>
            <div className='bg-[]'>
                <h1 className='font-bold text-xl'>First Name</h1>
                <p className='text-lg bg-[#80808012] w-[80%] rounded-lg px-4 min-h-10 py-3 mt-6'>{patientData.first_name}</p>
            </div>
            <div className='bg-[#]'>
                <h1 className='font-bold text-xl'>Last Name</h1>
                <p className='text-lg bg-[#80808012] w-[80%] rounded-lg px-4 min-h-10 py-3 mt-6'>{patientData.last_name}</p>
            </div>
            <div className='bg-[]'>
                <h1 className='font-bold text-xl'>Gender</h1>
                <p className='text-lg bg-[#80808012] w-[80%] rounded-lg px-4 min-h-10 py-3 mt-6'>{patientData.gender}</p>
            </div>
            <div className='bg-[]'>
                <h1 className='font-bold text-xl'>Date of Birth </h1>
                <p className='text-lg bg-[#80808012] w-[80%] rounded-lg px-4 min-h-10 py-3 mt-6'>{patientData.date_of_birth}</p>
            </div>
            <div className='bg-[]'>
                <h1 className='font-bold text-xl'>email</h1>
                <p className='text-lg bg-[#80808012] w-[80%] rounded-lg px-4 min-h-10 py-3 mt-6'>{patientData.email}</p>
            </div>
            <div className='bg-[]'>
                <h1 className='font-bold text-xl'>Phone Number</h1>
                <p className='text-lg bg-[#80808012] w-[80%] rounded-lg px-4 min-h-10 py-3 mt-6'>{patientData.phone_number}</p>
            </div>
            <div className='bg-[]'>
                <h1 className='font-bold text-xl'>Address</h1>
                <p className='text-lg bg-[#80808012] w-[80%] rounded-lg px-4 min-h-10 py-3 mt-6'>{patientData.address}</p>
            </div>
          </div>
          </div> 
        </div>
    </div>
  )
}

export default PatientInfo