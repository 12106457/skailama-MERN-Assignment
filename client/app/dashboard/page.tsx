"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { roboto } from "../fonts/fonts";
import CreateProjectForm from "../component/dashboard/createProjectForm";

import { PlusCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Spinner = dynamic(() => import("../utility/spinner"), { ssr: false });

interface projectDataType{
    _id: string;
    userId: string;
    projectName: string;
    createdAt: string;
    updatedAt: string;
    files: any[];  
    image: string | null;
    __v: number;
}
const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [createProjectButtonClick, setCreateProjectButtonClick] = useState(false);
  const [projectList,setProjectList]=useState<projectDataType[]>([]);
  const [hitGetProjectListApi,setHitGetProjectListApi]=useState(false);

  useEffect(()=>{
    handleGetProjectDetails();
  },[])

  useEffect(()=>{

    if(hitGetProjectListApi){

    }
  },[hitGetProjectListApi])

  const handleProjectCreation = async (name: string) => {
    const userDataString = JSON.parse(localStorage.getItem("userData")||'{}');
  
    try {
      setIsLoading(true);
       const url = process.env.NEXT_PUBLIC_API_URL + `/project/create`
  
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ projectName: name, userId: userDataString?._id || 0 }),
      });
  
      const data = await response.json();
  
      if (data.status === true) {
        handleGetProjectDetails();
      } else {
        alert(data.message || 'Project creation failed');
      }
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGetProjectDetails = async () => {
    const userDataString = JSON.parse(localStorage.getItem("userData")||'{}');
    try {
      setIsLoading(true);
       const url = process.env.NEXT_PUBLIC_API_URL + `/project/get/${userDataString._id}`
  
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
  
      const data = await response.json();
  
      console.log("Project data:", data);
      if (data.status === true) {
        setProjectList(data.data)
      } else {
        alert(data.message || 'Failed to fetch projects');
      }
    } catch (error) {
      console.error('Error fetching project details:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className={`${roboto.className} w-full flex justify-center items-center`}>

      {
        projectList.length===0 ? 
        <CreateProjectLanding onCreateClick={() => setCreateProjectButtonClick(true)} />
        :<ProjectDisplayContainer setIsLoading={setIsLoading} handleProjectCreation={handleProjectCreation} projectData={projectList}/>
      }
      
     
      {createProjectButtonClick && <CreateProjectForm onClose={setCreateProjectButtonClick} handleProjectCreation={handleProjectCreation} />}

      {/* Spinner */}
      {isLoading && (
        <div className="fixed inset-0 bg-gray-300 bg-opacity-50 flex justify-center items-center z-50">
          <Spinner loading={isLoading} />
        </div>
      )}
    </div>
  );
};

export default Page;


const CreateProjectLanding = ({ onCreateClick }: { onCreateClick: () => void }) => {
  return (
    <div className="flex flex-col justify-start items-center gap-5 w-[60%]">
      <div className="font-bold text-[#7E22CE] text-3xl">Create a New Project</div>

      <Image src="/svgviewer-png-output.png" alt="logo" width={250} height={200} />

      <div className="text-center font-normal text-[#838383]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
        Duis aute irure dolor in reprehenderit in.
      </div>

      <button 
        className="bg-[#211935] text-white p-2 flex justify-center items-center gap-1 rounded" 
        onClick={onCreateClick}
      >
        <PlusCircleIcon className="w-6 h-6" /> Create a New Project
      </button>
    </div>
  );
};


const ProjectHeader = ({ onCreateClick }: { onCreateClick: () => void }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      
      <h1 className="text-3xl font-bold text-[#7E22CE]">Projects</h1>

      
      <button 
        className="bg-[#211935] text-white p-2 flex justify-center items-center gap-1 rounded"
        onClick={onCreateClick}
      >
        <PlusCircleIcon className="w-6 h-6" />
        Create a New Project
      </button>
    </div>
  );
};



interface ProjectCardProps {
  imageUrl?: string|null;
  projectName: string;
  fileCount: number;
  lastUpdated: string;
  projectId:string
}


const ProjectCard = ({ projectName, fileCount, lastUpdated,projectId }: ProjectCardProps) => {
  
  const router=useRouter();
  const generatedImageUrl = `https://ui-avatars.com/api/?name=${projectName}&size=1080&background=F8A01D&color=fff`;

  const formatDate = (timestamp: string) => {
    const currentDate = new Date();
    const lastUpdatedDate = new Date(timestamp);
  
   
    if (currentDate.toDateString() === lastUpdatedDate.toDateString()) {
      
      return lastUpdatedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return lastUpdatedDate.toLocaleDateString();
    }
  };
  
  const formattedDate = formatDate(lastUpdated);

  const handleSelectCard=()=>{
    localStorage.setItem("selectProject",JSON.stringify({projectName,projectId}));
    // router.push(`/uploadDashboard?projectName=${projectName}&id=${projectId}`)
    router.push(`/uploadDashboard`)
  }  

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex justify-start items-center gap-5 w-[300px] cursor-pointer" onClick={handleSelectCard}>
      {/* Top part: Image and Name */}
      <div className="">
        <Image src={generatedImageUrl} alt="Project" width={70} height={70} className="rounded-md" />
      </div>

      <div>
        <div className="font-semibold text-lg text-[#211935]">{projectName}</div>
        {/* Middle part: Number of files */}
        <div className="text-gray-600 font-normal text-[10px]">{fileCount} files</div>

        {/* Bottom part: Last updated */}
        <div className="text-xs text-gray-400 mt-2">Last edited on: {formattedDate}</div>
      </div>
    </div>
  );
};


const ProjectDisplayContainer = ({setIsLoading,handleProjectCreation,projectData}:any) => {
  const [createProjectButtonClick, setCreateProjectButtonClick] = useState(false);

  const [projectList,setProjectList]=useState<projectDataType[]>(projectData)
  useEffect(()=>{
    setProjectList(projectData);
  },[projectData])
  

  return (
    <div className={`${roboto.className} w-full p-8  `}>
      {/* Header */}
      <ProjectHeader onCreateClick={() => setCreateProjectButtonClick(true)} />

      {/* Project Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projectList.map((project, index) => (
          <ProjectCard
            key={index}
            imageUrl={project.image||null}
            projectName={project.projectName}
            fileCount={project.files.length}
            lastUpdated={project.updatedAt}
            projectId={project._id}
          />
        ))}
      </div>

      {/* Create Project Form Popup */}
      {createProjectButtonClick && (
        <CreateProjectForm onClose={setCreateProjectButtonClick} handleProjectCreation={handleProjectCreation} />
      )}
    </div>
  );
};

