"use client";
import React, { useState } from "react";

const CreateProjectForm = ({ onClose,handleProjectCreation }: { onClose: React.Dispatch<React.SetStateAction<boolean>>,handleProjectCreation:(name:string)=>void }) => {
  const [projectName, setProjectName] = useState("");
  const [error, setError] = useState("");

  const handleCreate = () => {
    if (projectName.trim() === "") {
      setError("Project Name Can't be empty");
      return;
    }
    // Handle successful creation here (API call etc.)
    console.log("Project Created:", projectName);
    setError("");
    handleProjectCreation(projectName);
    onClose(false); // Close modal after creating
  };

  return (
<div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
<div className="bg-white rounded-xl p-3 w-[500px] shadow-lg">
        {/* Title */}
        <h2 className="text-xl font-bold mb-4">Create Project</h2>

        {/* Input */}
        <div className="flex flex-col mb-4">
          <label className="text-gray-700 mb-2">Enter Project Name:</label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Type here"
          />
          {/* Error */}
          {error && (
            <span className="text-red-500 text-sm mt-1">{error}</span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={()=>onClose(false)}
            className="text-red-600 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="px-4 py-1 rounded-md text-sm bg-purple-600 text-white hover:bg-purple-700"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectForm;
