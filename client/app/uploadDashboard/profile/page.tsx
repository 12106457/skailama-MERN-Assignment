"use client"
import { useProfile } from '@/app/context/profileContext'
import { roboto } from '@/app/fonts/fonts'
import Spinner from '@/app/utility/spinner'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

const Page = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const {setProfile}=useProfile()
  const [profileData, setProfileData] = useState<{
    _id: string
    email: string
    name: string
  }>({
    _id: '',
    email: '',
    name: '',
  })

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('userData') || '{}')
    setProfileData({
      _id: data._id ?? '',
      email: data.email ?? '',
      name: data.name ?? '',
    })
  }, [])

  const updateProfile=async()=>{
    try {
      setIsLoading(true);
      const url = process.env.NEXT_PUBLIC_API_URL + `/auth/update`;

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
       body:JSON.stringify({name:profileData.name})
      });

      const data = await response.json();

      if (data.status === true) {
        console.log("update profile data success:", data);
         localStorage.setItem("userData",JSON.stringify(data.data));
         setProfile(data.data);
       toast.success("Profile updated successfully.");
      } else {
        alert(data.message || "file upload failed");
      }
    } catch (error) {
      console.error("Error creating file:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const generateImageURL = (name: string) => {
    const encodedName = encodeURIComponent(name || 'User')
    return `https://ui-avatars.com/api/?name=${encodedName}&size=1080&background=5d4037&rounded=true&color=fff`
  }

  

  return (
    <div className="h-[calc(100vh-160px)] px-14 mt-5 flex flex-col">
      {/* Header */}
      <div className="flex justify-start items-center mb-5">
        <div className={`flex items-center gap-2 ${roboto.className}`}>
          <div className="cursor-pointer" onClick={() => router.back()}>
            <ArrowLeftIcon className="w-6 h-6 stroke-3" />
          </div>
          <div className="font-semibold text-2xl">Account Settings</div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="w-full h-[200px] flex justify-start  items-center bg-white ">
        {/* Avatar */}
        <div className="w-[20%] flex justify-center">
          <Image
            src={generateImageURL(profileData.name)}
            alt="Profile"
            width={100}
            height={100}
            className="rounded-full border shadow"
          />
        </div>

        {/* Form Fields */}
        <div className="w-[80%] flex justify-end items-end gap-6">
          <div className="flex flex-col w-full">
            <label className="mb-1 text-[16px] font-bold text-gray-700">User Name</label>
            <input
              value={profileData.name}
              onChange={(e) =>
                setProfileData((prev) => ({ ...prev, name: e.target.value }))
              }
              
              placeholder="Enter Name"
              className="p-1 border shadow rounded w-full"
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="mb-1 text-[16px] font-bold text-gray-700">Email</label>
            <input
              value={profileData.email}
              disabled
              placeholder="Enter Email"
              className="p-1 border shadow rounded w-full bg-gray-100 text-gray-500"
            />
          </div>
          <div className='flex justify-end items-center cursor-pointer' onClick={()=>updateProfile()}>
              <button className='text-white bg-[#211935] px-5 py-1 rounded mr-16'>Update</button>
          </div>
        </div>
      </div>

      <div className='text-2xl font-bold'>
        Subscriptions
      </div>
      <div className='w-full h-[60px] rounded p-4 border flex justify-between items-center mt-6 bg-[#F3E8FF88] shadow'>
        <p className='text-[#7E22CE] '>Oops! You don't have any active plans. <span className='font-bold'>Upgrade now!</span></p>
        <button className='text-white bg-[#7E22CE] px-5 py-1 rounded mr-16'>Upgrade</button>
      </div>

      {/* Loading Spinner */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
          <Spinner loading={isLoading} />
        </div>
      )}
    </div>
  )
}

export default Page
