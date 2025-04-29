"use client"
import React, { useEffect, useState, Suspense } from 'react';
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { roboto } from '@/app/fonts/fonts';
import { useRouter, useSearchParams } from 'next/navigation';
import Spinner from '@/app/utility/spinner';
import { toast } from 'react-hot-toast';

interface fileData {
  _id: string;
  projectId: string;
  name: string;
  transcript: string;
}

const Page = () => {
  const [isEditing, setIsEditing] = useState(false);
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const id = searchParams.get('id');
  const [fileData, setFileData] = useState<fileData>();
  const router = useRouter();

  useEffect(() => {
    getFileTranscript();
  }, [id]);

  const getFileTranscript = async () => {
    try {
      setIsLoading(true);
      const url = process.env.NEXT_PUBLIC_API_URL + `/file/get-file/${id}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      const data = await response.json();
      if (data.status === true) {
        console.log("File retrieved successfully:", data);
        setFileData(data.data);
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

  const handleUpdateContent = async () => {
    try {
      setIsLoading(true);
      const url = process.env.NEXT_PUBLIC_API_URL + `/file/update`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          fileId: fileData?._id,
          transcript: fileData?.transcript,
        }),
      });

      const data = await response.json();

      if (data.status === true) {
        console.log("File retrieved successfully:", data);
        toast.success("Updated Success");
      } else {
        alert(data.message || "file upload failed");
        toast.error("Failed to update");
      }
    } catch (error) {
      console.error("Error creating file:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    handleUpdateContent();
    setIsEditing(false);
  };

  const handleDiscardClick = () => {
    setIsEditing(false);
  };

  return (
    <div className="h-[calc(100vh-160px)] px-14 mt-5 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <div className={`flex items-center gap-2 ${roboto.className}`}>
          <div className='cursor-pointer' onClick={() => router.back()}>
            <ArrowLeftIcon className="w-6 h-6 stroke-3" />
          </div>
          <div className="font-semibold text-2xl">Edit Transcript</div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {!isEditing ? (
            <button
              onClick={handleEditClick}
              className="bg-[#211935] w-[130px] h-[36px] rounded text-white"
            >
              Edit
            </button>
          ) : (
            <>
              <button
                onClick={handleDiscardClick}
                className="border border-red-500 w-[90px] h-[36px] rounded text-red-500"
              >
                Discard
              </button>

              <button
                onClick={handleSaveClick}
                className="bg-[#211935] w-[90px] h-[36px] rounded text-white"
              >
                Save
              </button>
            </>
          )}
        </div>
      </div>

      {/* Transcript Content */}
      <div className={`flex-1 bg-white rounded-lg shadow-md px-10 py-4 text-[#63635E] border border-[#C7C7C7] ${roboto.className} `}>
        <p className='text-[#7E22CE] font-semibold text-xl pb-10'>Speaker</p>
        <textarea
          className="w-full h-[calc(100%-100px)] outline-none resize-none overflow-auto text-sm"
          readOnly={!isEditing}
          value={fileData?.transcript}
          onChange={(e) => setFileData((prev) => ({
            _id: prev?._id ?? '',
            projectId: prev?.projectId ?? '',
            name: prev?.name ?? '',
            transcript: e.target.value,
          }))}
          placeholder='Type your transcript here...'
        />
      </div>

      {isLoading && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
          <Spinner loading={isLoading} />
        </div>
      )}
    </div>
  );
};

// Wrap the entire component with Suspense boundary
export default function SuspendedPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Page />
    </Suspense>
  );
}
