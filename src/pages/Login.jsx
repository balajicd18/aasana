import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import {Eye } from 'lucide-react'
import { toast } from 'react-toastify'
import axios from 'axios'

const Login = () => {
    const navigate = useNavigate();

    const [register, setRegister]  = useState('')

    const [showPassword, setShowPassword] = useState(true)
    const [loginData, setLoginData] = useState(
        {
            name:"",
            email:"",
            password:""
        }
    )

    const inputHandler = (e) =>{
        setLoginData((prev) => ({...prev, [e.target.name]:e.target.value.replace(/^\s+/, '')}))
    }

    console.log(loginData);
    console.log(showPassword);
    console.log(showPassword);

    const Register = async () =>{
      let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if(loginData.name){
        if(loginData.email){
          if(regex.test(loginData.email)){
                    if(loginData.password){
                    if((loginData.password).length>=4){
                        const response = await axios.post("http://localhost:4000/login/register",loginData);
                        if(response.data.status){
                          localStorage.setItem("token",response.data.token);
                          setLoginData({
                            name:"",
                            email:"",
                            password:"",
                          })
                          toast.success("Account Created Successfully")

                          navigate("/dashboard");
                        }else{
                          toast.error("Email already Exists")

                        }
                    }else{
                      toast.error("Enter Strong Password")

                    }
                      
                  }else{
                    toast.error("Password is Required")
                  }
          }else{
            toast.error("Enter Valid Email")
          }
          
        }
        else{
            toast.error("Email is Required")
        }
      }
      else{
            toast.error("Name is Required")

      }

    }

    //login 

    const login = async () =>{
      if(loginData.email){
        if(loginData.password){
          const response = await axios.post("https://assana-test.vercel.app/auth/login/login-verification",loginData);
            if(response.data.status){
              localStorage.setItem("token",response.data.result.token);
              setLoginData({
                name:"",
                email:"",
                password:"",
              })
              toast.success("Login Successfully")

              navigate("/dashboard");
            
            }else{
            toast.error(response.data.message)

            }
        }else{
            toast.error("Password is Required")
        }
      }
      else{
            toast.error("Email is Required")

      }
    }

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
        <div className=' w-150 flex flex-col gap-y-8 p-4'>
            <h1 className='text-3xl font-bold text-center '>Login</h1>
            {register==="register"?<div className=''>
                <label className='font-bold' >Name</label>
                <input type='text' name='name' value={loginData.name} onChange={inputHandler} placeholder='admin' className='border-1 w-full p-3 rounded-lg mt-2 placeholder-black bg-[#1c1c641f]' />
            </div>:''}
            <div className=''>
                <label className='font-bold' >E-mail</label>
                <input type='email' name='email' value={loginData.email} onChange={inputHandler} placeholder='example@gmail.com' className='border-1 w-full p-3 rounded-lg mt-2 placeholder-black bg-[#1c1c641f]' />
            </div>
            <div>
                <label className='font-bold'>Password</label>
                <div className='relative'>
                    <input type={showPassword?'password':'text'} name='password' value={loginData.password} onChange={inputHandler} placeholder='------------' className='border-1 w-full p-3 rounded-lg mt-2 placeholder-black bg-[#1c1c641f]' />
                    <Eye onClick={()=>setShowPassword((prev)=>!prev)} className='absolute  right-5 top-8.5 transform -translate-y-1/2 text-gray-500 cursor-pointer'/>
                </div>
            </div>
            <div>
                <button className='bg-[#2056e0] py-3 w-full text-white hover:bg-[#1c1c64]' onClick={()=>{register==="register"? Register():login()}}>Continue</button>
            </div>

        </div>
    </div>
  )
}

export default Login