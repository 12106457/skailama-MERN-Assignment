"use client";
import Sidebar from "@/app/component/upload/sidebar";
import {
  SelectedTabProvider,
  useSelectedTab,
} from "@/app/context/selectedTabContext";
import { BellIcon, HomeIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster } from 'react-hot-toast';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const { selectedTab } = useSelectedTab();
  // const searchParams = useSearchParams();

  // const projectName = searchParams.get("projectName");
  // const id = searchParams.get("id");
  const [selectedProjectData, setSelectedProjectData] = useState<any>(null);

  useEffect(()=>{
    const storedProjectData = localStorage.getItem("selectProject");
    if (storedProjectData) {
      console.log("storedProjectData",storedProjectData)
      setSelectedProjectData(JSON.parse(storedProjectData));
    }
  },[])

  const router = useRouter();

  const [selectedTab, setSelectedTab] = useState("AddPodcast");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    router.push("/");
  };

  return (
    <SelectedTabProvider>
      
      <div className="flex max-h-screen max-w-screen bg-gray-50 text-gray-900 ">
      <Toaster key='toasterkey' position="top-center" />
        <Sidebar setSelectedTab={setSelectedTab} selectedTab={selectedTab} />
        <div className="flex-1 flex-col justify-start items-start gap-5 overflow-y-auto">
          <div className="w-full  flex justify-between items-center px-14 pt-14">
            <div className="flex items-center space-x-2 text-[#999999] font-bold">
              <HomeIcon className="w-4 h-4 " />
              <span
                onClick={() => router.push("/dashboard")}
                className="hover:underline cursor-pointer"
              >
                Home Page
              </span>
              <span>/</span>
              <span>{selectedProjectData?.projectName||""}</span>
              <span>/</span>
              <span className="text-[#7E22CE] ">{selectedTab}</span>
            </div>
            <div className="flex justify-center items-center gap-4">
              <BellIcon className="w-7 h-7 border rounded-full p-1 border-[#CCCCCC] cursor-pointer" />
              <div
                className="border rounded-full p-1 border-[#CCCCCC] cursor-pointer"
                onClick={handleLogout}
              >
                <Image
                  src="/logout-icon.png"
                  alt="logout"
                  width={18}
                  height={18}
                />
              </div>
            </div>
          </div>

    <main>

          {children}
    </main>
        </div>
      </div>
      
    </SelectedTabProvider>
  );
}
