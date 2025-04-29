"use client";
import React, { useEffect, useState } from "react";
import { useSelectedTab } from "../context/selectedTabContext";
import { HomeIcon, BellIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import UploadForm from "../component/upload/uploadForm";
import Spinner from "../utility/spinner";

interface FileData {
  _id: string;
  projectId: string;
  name: string;
  transcript: string;
  createdAt: Date;
  updatedAt: Date;
}

const Page = () => {
  const { selectedTab } = useSelectedTab();
  // const searchParams = useSearchParams();

  // const projectName = searchParams.get("projectName");
  // const id = searchParams.get("");

  const [selectedProjectData, setSelectedProjectData] = useState<{projectId:string,projectName:string}|null>(null);

  useEffect(()=>{
    const storedProjectData = localStorage.getItem("selectProject");
    if (storedProjectData) {
      console.log("storedProjectData",storedProjectData)
      setSelectedProjectData(JSON.parse(storedProjectData));
    }
  },[])
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [fileData, setFileData] = useState<FileData[]>([]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    router.push("/");
  };

  useEffect(()=>{
    getFiles();
  },[selectedProjectData])

  const handleFileUpload = async (fileName: string, transcription: string) => {
    try {
      setIsLoading(true);
      const url = process.env.NEXT_PUBLIC_API_URL + `/file/upload`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          projectId: selectedProjectData?.projectId||0,
          name: fileName,
          transcript: transcription,
        }),
      });

      const data = await response.json();

      if (data.status === true) {
        getFiles();
      } else {
        alert(data.message || "file upload failed");
      }
    } catch (error) {
      console.error("Error creating file:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getFiles = async () => {
    try {
      setIsLoading(true);
      const url = process.env.NEXT_PUBLIC_API_URL + `/file/get-all-files/${selectedProjectData?.projectId}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      const data = await response.json();

      if (data.status === true) {
        setFileData(data.data);
      } else {
        // alert(data.message || "Failed to get files");
      }
    } catch (error) {
      console.error("Error creating file:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-[calc(100vh-85px)] flex flex-col justify-start items-center gap-3 px-14 py-">
      {/* <div className="w-full  flex justify-between items-center">
        <div className="flex items-center space-x-2 text-[#999999] font-bold">
          <HomeIcon className="w-4 h-4 " />
          <span onClick={()=>router.push("/dashboard")} className="hover:underline cursor-pointer">Home Page</span>
          <span>/</span>
          <span>{projectName}</span>
          <span>/</span>
          <span className="text-[#7E22CE] ">{selectedTab}</span>
        </div>
        <div className="flex justify-center items-center gap-4">
          <BellIcon className="w-7 h-7 border rounded-full p-1 border-[#CCCCCC] cursor-pointer" />
          <div
            className="border rounded-full p-1 border-[#CCCCCC] cursor-pointer"
            onClick={handleLogout}
          >
            <Image src="/logout-icon.png" alt="logout" width={18} height={18} />
          </div>
        </div>
      </div> */}

      <div className="flex flex-col ">
        <div className="text-3xl font-bold">Add Padcast</div>
        <UploadCard handleFileUpload={handleFileUpload} />
      </div>

      {fileData.length === 0 && (
          <div className="flex-1 w-full bg-white shadow rounded-md mt-5 flex flex-col justify-center items-center gap-2.5">
            <Image
              src="/cloud-upload-icon.png"
              alt="upload"
              width={100}
              height={100}
            />
            <p>
              Select a file or drag and drop here (Podcast Media or
              Transcription Text)
            </p>
            <p className="text-[rgba(0,0,0,0.4)]">
              MP4, MOV, MP3, WAV, PDF, DOCX or TXT file
            </p>
            <button className="border border-[#7E22CE] p-2 px-5 rounded-full text-[#7E22CE] font-medium">
              Select File
            </button>
          </div>
        )} 
        {
        fileData.length !== 0 &&(
          <div className="flex-1 w-full bg-white shadow rounded-md mt-5 flex flex-col justify-start items-start px-14">
            <FileTable fileData={fileData} getFiles={getFiles}/>
          </div>
        )}

      {isLoading && (
        <div className="fixed inset-0 bg-gray-300 bg-opacity-50 flex justify-center items-center z-50">
          <Spinner loading={isLoading} />
        </div>
      )}
    </div>
  );
};

export default Page;

const UploadCard = ({
  handleFileUpload,
}: {
  handleFileUpload: (fileName: string, transcription: string) => void;
}) => {
  const uploadOptions = [
    {
      title: "RSS Feed",
      description: "Lorem ipsum dolor sit. Dolor lorem sit.",
      imageUrl: "/wifi-logo.png", // Make sure you have these images in `public/`
    },
    {
      title: "YouTube",
      description: "Lorem ipsum dolor sit. Dolor lorem sit.",
      imageUrl: "/youtube-logo.png",
    },
    {
      title: "Upload",
      description: "Lorem ipsum dolor sit. Dolor lorem sit.",
      imageUrl: "/upload-icon.png",
    },
  ];

  const [cardClick, setCardClick] = useState(false);
  const [cardType, setCardType] = useState("");

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-5">
      {uploadOptions.map((option, index) => (
        <div
          key={index}
          className="flex justify-between items-center gap-5  p-6 rounded-lg shadow-sm hover:shadow-md cursor-pointer transition duration-300"
          onClick={() => {
            setCardClick(true);
            setCardType(option.title);
          }}
        >
          <div>
            <h3 className="text-lg font-semibold mb-2">{option.title}</h3>
            <p className="text-gray-600 text-sm ">{option.description}</p>
          </div>
          <div className=" flex justify-end ">
            <Image
              src={option.imageUrl}
              alt={option.title}
              width={80}
              height={80}
              className="object-contain rounded-md"
            />
          </div>
        </div>
      ))}
      {cardClick && cardType && (
        <UploadForm
          type={cardType}
          onClose={setCardClick}
          handleFileUpload={handleFileUpload}
        />
      )}
    </div>
  );
};

const FileTable = ({ fileData,getFiles }: { fileData: FileData[],getFiles:()=>void }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear().toString().slice(-2);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day} ${month} ${year} | ${hours}:${minutes}`;
  };

  const router = useRouter();


  const handleDeleteFile = async (fileId: string) => {
    try {
      const url = process.env.NEXT_PUBLIC_API_URL + `/file/delete`;

      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({fileId:fileId}),
      });

      const data = await response.json();

      if (data.status === true) {
        getFiles(); 
      } else {
        alert(data.message || "Failed to delete file");
      }
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="flex-1 w-full bg-white flex flex-col justify-start items-start">
      <div className="text-left text-[#1D1929] font-semibold text-[20px] p-3">
        Your Files
      </div>
      {/* Scrollable area for table body */}
      <div className="w-full max-h-[250px] overflow-y-auto ">
        <table className="w-full table-auto">
          {/* Table Header */}
          <thead className="sticky top-0 bg-[#EDEDED] text-[#646464] z-10">
            <tr>
              <th className="px-4 py-2 text-center text-sm font-semibold">S.No</th>
              <th className="px-4 py-2 text-center text-sm font-semibold">File Name</th>
              <th className="px-4 py-2 text-center text-sm font-semibold">Upload Date & Time</th>
              <th className="px-4 py-2 text-right text-sm font-semibold">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {fileData.map((file, index) => (
              <tr key={index} className="border-b border-[#EDEDED]">
                <td className="px-4 py-4 text-sm text-center">{index + 1}</td>
                <td className="px-4 py-2 text-sm text-center">{file.name}</td>
                <td className="px-4 py-2 text-sm text-center">
                  {formatDate(file.updatedAt.toString())}
                </td>
                <td className="px-4 py-2 text-sm text-right">
                  <div className="flex items-end justify-end">
                    <button className="text-[#646464] cursor-pointer border border-[#C7C7C7] px-3 py-1 rounded-l" onClick={()=>{router.push(`/uploadDashboard/viewTranscription?id=${file._id}`)}}>
                      View
                    </button>
                    <button className="text-[#FF274C] cursor-pointer border border-[#C7C7C7] px-3 py-1 rounded-r" onClick={()=>handleDeleteFile(file._id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
