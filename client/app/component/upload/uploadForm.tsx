"use client";
import React, { useState } from "react";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface UploadCardProps {
  type: string;
  onClose: React.Dispatch<React.SetStateAction<boolean>>; 
  handleFileUpload: (fileName: string, transcription: string) => void; 
}

const UploadCard: React.FC<UploadCardProps> = ({ type, onClose,handleFileUpload }) => {
  const [fileName, setFileName] = useState<string>("");
  const [transcription, setTranscription] = useState<string>("");

  let iconUrl = "";
  let title = "";
  let description = "";

  if (type === "YouTube") {
    iconUrl = "/youtube-logo.png";
    title = "YouTube";
    description = "Enter the YouTube video URL or file name";
  } else if (type === "RSS Feed") {
    iconUrl = "/wifi-logo.png";
    title = "RSS Feed";
    description = "Enter the RSS Feed URL";
  } else if (type === "Upload") {
    iconUrl = "/upload-icon.png";
    title = "Upload";
    description = "Enter the file name to upload";
  }


  const handleFileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value); 
  };

  const handleUpload = () => {

    handleFileUpload(fileName, transcription); 
    onClose(false); 
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="bg-white rounded-xl p-6 w-[700px] shadow-lg">
        
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3 mb-5 rounded-full">
            <Image
              src={iconUrl}
              alt={title}
              width={35}
              height={35}
              className="rounded-full"
            />
            <h3 className="text-xl font-semibold">Upload from {title}</h3>
          </div>
          <XMarkIcon
            onClick={() => onClose(false)} 
            className="w-6 h-6 stroke-2 cursor-pointer"
          />
        </div>

    
        <div>
            <label htmlFor="input" className="text-[#3C3C3C]">Name</label>
          <input
            id="input"
            type="text"
            value={fileName}
            onChange={handleFileNameChange}
            className="mt-1 mb-3 p-2 border rounded-md w-full"
            placeholder="Enter file name"
          />
         
        </div>

        
        <label htmlFor="transcription" className="text-[#3C3C3C]">Transcription</label>
        <textarea
          id="transcription"
          value={transcription}
          onChange={(e) => setTranscription(e.target.value)}
          placeholder="Enter transcription here..."
          className="mt-1 p-3 border rounded-md w-full border-[#000000]"
          rows={4}
        />

        
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={handleUpload}
            className="px-4 py-1.5 rounded-md text-sm bg-[#211935] text-white cursor-pointer"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadCard;
