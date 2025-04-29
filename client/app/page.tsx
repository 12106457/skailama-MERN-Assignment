"use client";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { poppins } from './fonts/fonts';
import Login from './component/auth/login';
import Register from "./component/auth/register";

const Page = () => {
  const route = useRouter();
  const [changeForm, setChangeForm] = useState(true);

  return (
    <div className='w-screen h-screen flex justify-between items-center'>
      <div className='w-[65%] h-full p-14 text-white bg-gradient-to-tr from-[#3A0B63] to-[#C37EFF] flex flex-col justify-start'>
        <div>
          <Image src="/logo-3.png" alt="logo2" width={180} height={156} />
        </div>

        <p className='text-[40px] w-[280px] mt-10'>
          Your podcast will no longer be just a hobby.
        </p>
        <p className={`${poppins.className} w-[280px] mt-3`}>
          Supercharge Your Distribution using our AI assistant!
        </p>
      </div>

      <div className='w-[35%] h-full'>
        {changeForm ? (
          <Login onChangeForm={setChangeForm} changeForm={changeForm} />
        ) : (
          <Register onChangeForm={setChangeForm} changeForm={changeForm} />
        )}
      </div>
    </div>
  );
};

export default Page;
