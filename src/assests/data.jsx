import whatsapp from '../assests/images/whatsapp.webp'
import voice from '../assests/images/voice.png'
import acne1 from '../assests/images/acne1.jpg'
import acne2 from '../assests/images/acne2.jpg'


import {Eye } from "lucide-react";
import axios from 'axios';


axios.get("https://assana-test.vercel.app/v1/nurse/get-all-bookings")
  .then((response) => {
    console.log(response.data); // ✅ This is the data from the API
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

export  const mockData = [
  {

    "name": "John Doe",
    "date":"2025-07-28",
    "source":whatsapp,
    "status":"UnVerified",
    "action":<Eye className='text-[#3cc24e] font-bold'/>
  },
  {
    "name": "Balaji",
    "date":"2025-03-18",
    "source":voice,
    "status":"Verified",
    "action":<Eye className='text-[#3cc24e] font-bold' />
  },
  {
    "name": "Prem",
    "date":"2025-02-21",
    "source":voice,
    "status":"UnVerified",
    "action":<Eye className='text-[#3cc24e] font-bold'/>
  },
  {
   "name": "Sathish",
    "date":"2025-7-12",
    "source":voice,
    "status":"Verified",
    "action":<Eye className='text-[#3cc24e] font-bold'/>
  },
  {
    "name": "Kishore",
    "date":"2025-03-11",
    "source":whatsapp,
    "status":"UnVerified",
    "action":<Eye className='text-[#3cc24e] font-bold'/>
  },
  {
    "name": "Kumar",
    "date":"2025-01-26",
    "source":whatsapp,
    "status":"UnVerified",
    "action":<Eye className='text-[#3cc24e] font-bold'/>
  },
  {
    "name": "Willson",
    "date":"2025-05-24",
    "source":voice,
    "status":"Verified",
    "action":<Eye className='text-[#3cc24e] font-bold'/>
  },
  {
    "name": "Akash",
    "date":"2025-04-16",
    "source":whatsapp,
    "status":"Verified",
    "action":<Eye className='text-[#3cc24e] font-bold'/>
  },

]

export const actionData = [
  {
    bot:"How long have you had this skin issue? (e.g., days, weeks, months, years)",
    user:"By birth"
  },
  {
    bot:"Which parts of your body are affected? (e.g., legs, arms, face, back)",
    user:"Legs arms and face"
  },
  {
    bot:"Is this the first time or does it recur?",
    user:"Recur"
  },
  {
    bot:"Does any specific condition worsen it? (e.g., food, dust, sunlight, seasonal change)",
    user:"Mosquito"
  },
  {
    bot:"Does any family member have a similar issue? If yes, who?",
    user:"And seasonal"
  },
  {
    bot:"Have you taken any previous treatment? If yes, from a dermatologist, general doctor, or OTC?",
    user:"No"
  },
  {
    bot:"Do you have any other illnesses? (e.g., diabetes, hypertension, asthma)",
    user:"Yes"
  },
  {
    bot:"Do you have any specific habits? (e.g., alcohol, tobacco, smoking)",
    user:"Dermatologist"
  },
]

export const actionImage = [
  {
    img:acne1
  },
  {
    img:acne2
  }
]

export const actionSummary = "How long have you had this skin issue? (e.g., days, weeks, months, years) By birth. Which parts of your body are affected? (e.g., legs, arms, face, back) Legs arms and face. Is this the first time or does it recur? Recur. Does any specific condition worsen it? (e.g., food, dust, sunlight, seasonal change) Mosquito. Does any family member have a similar issue? If yes, who? And seasonal. Do you have any other illnesses? (e.g., diabetes, hypertension, asthma) Yes. Do you have any specific habits? (e.g., alcohol, tobacco, smoking) Dermatologist."