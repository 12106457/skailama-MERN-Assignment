"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { PlusIcon, PencilIcon, DocumentDuplicateIcon, Cog6ToothIcon,ChevronDoubleLeftIcon } from "@heroicons/react/24/outline"
import { useSelectedTab } from '@/app/context/selectedTabContext'
import { useRouter } from 'next/navigation'
import { useProfile } from '@/app/context/profileContext'

interface userDataType {
  _id: number,
  name: string,
  email: string
}


const Sidebar = ({setSelectedTab,selectedTab}:any) => {
  // Track the selected tab
  // const { selectedTab, setSelectedTab } = useSelectedTab();
  const {profile}=useProfile()
  const [userData, setUserData] = useState<userDataType | null>(null);
  const router=useRouter();

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const getTabClasses = (tab: string, isIcon = false) => {
    if (selectedTab === tab) {
      return isIcon ? 'text-[#7E22CE]' : 'bg-[#F3E8FF88] text-[#7E22CE]'; 
    } else {
      return isIcon ? 'text-[#999999]' : 'bg-white text-[#646464]'; 
    }
  };

  // Function to generate image URL based on user name
  const generateImageURL = (name: string | undefined) => {
    if (name) {
      return `https://ui-avatars.com/api/?name=${name}&size=1080&background=5d4037&rounded=false&color=fff`;
    }
    return ''; // Fallback in case name is undefined
  };

  return (
    <div className=" relative w-[270px] h-screen flex flex-col justify-start items-start py-3 shadow">
      {/* Logo */}
      <div className="my-4 px-6">
        <Image src="/logo-2.png" alt="logo" width={130} height={100} />
      </div>

      {/* Navigation buttons */}
      <div className="flex flex-col space-y-4 w-full text-[#646464]  pb-4">
        <button
          className={`flex items-center justify-start w-[90%] py-2 pl-6 text-sm font-semibold cursor-pointer rounded-md ${getTabClasses('AddPodcast')}`}
          onClick={() => {router.push("/uploadDashboard");setSelectedTab('AddPodcast');}}
        >
          <PlusIcon className={`h-4 w-4 mr-2 ${getTabClasses('AddPodcast', true)}`} />
          Add your podcast(s)
        </button>
        <button
          className={`flex items-center justify-start w-[90%] py-2 pl-6 text-sm font-semibold cursor-pointer rounded-md ${getTabClasses('CreateRepurpose')}`}
          onClick={() =>{ router.push("/uploadDashboard/createAndRepurpose");setSelectedTab('CreateRepurpose');}}
        >
          <PencilIcon className={`h-4 w-4 mr-2 ${getTabClasses('CreateRepurpose', true)}`} />
          Create & Repurpose
        </button>
        <button
          className={`flex items-center justify-start w-[90%] py-2 pl-6  text-sm font-semibold cursor-pointer rounded-md ${getTabClasses('PodcastWidget')}`}
          onClick={() => {router.push("/uploadDashboard/postWidget");setSelectedTab('PodcastWidget')}}
        >
          <DocumentDuplicateIcon className={`h-4 w-4 mr-2 ${getTabClasses('PodcastWidget', true)}`} />
          Podcast Widget
        </button>
        <button
          className={`flex items-center justify-start w-[90%] py-2 pl-6  text-sm font-semibold cursor-pointer rounded-md ${getTabClasses('Upgrade')}`}
          onClick={() => {router.push("/uploadDashboard/upgrade");setSelectedTab('Upgrade')}}
        >
          <div className='mr-2.5'>
            <Image src="/diamond.png" alt='diamond logo' width={14} height={14} />
          </div>
          Upgrade
        </button>
      </div>
      <div className='border-b border-[#CCCCCC] w-[80%] mx-6'></div>

      {/* Help with Icon */}
      <div className="mt-auto w-full py-2 flex items-center justify-start text-sm pl-6 font-semibold cursor-pointer rounded-md text-[#646464]">
        <Cog6ToothIcon className="h-4 w-4 mr-2 text-[#999999]" />
        Help
      </div>

      <div className='border-b border-[#CCCCCC] w-[80%] mx-6 mt-4'></div>

      {/* User Profile Section */}
      <div className="w-full mt-4 px-6 py-2 flex items-center justify-start text-sm gap-4 rounded-md cursor-pointer" 
      onClick={()=>{router.push("/uploadDashboard/profile")}}
      >
        {/* Render Image only if userData is available */}
        {userData && (
          <div className='rounded'>
            <Image
              src={generateImageURL(userData.name)}
              alt='User Avatar'
              width={35}
              height={35}
              unoptimized 
              className='rounded'
            />
          </div>
        )}
        <div>
          <p className="font-bold text-md">{profile?.name || "User Name"}</p>
          <p className="text-[10px]">{profile?.email || "useremail@example.com"}</p>
        </div>
      </div>
      <div className="absolute right-[-14px] bottom-[150px]  rounded-full p-1  shadow-md cursor-pointer bg-[#7E22CE] ">
        <ChevronDoubleLeftIcon className="h-5 w-5 text-white bg-[#7E22CE]" />
      </div>
    </div>
  )
}

export default Sidebar;
