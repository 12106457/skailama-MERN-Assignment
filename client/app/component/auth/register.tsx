'use client'

import { roboto } from '@/app/fonts/fonts'
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
const Register = ({ onChangeForm, changeForm }: any) => {
  const [name, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert('Please fill all fields');
      return;
    }
  
    // Validate Email format using Regular Expression
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }
  
    // Validate Password (e.g., check if password length is at least 6 characters)
    if (password.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }
  
    try {
      setLoading(true);
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
  
      const result = await response.json();
  
      if (result.status) {
        // alert(result.message || 'Registered successfully!');
        toast.success('Registered successfully!');
        onChangeForm(!changeForm); 
      } else {
       
        if (result.error && result.error.includes('E11000')) {
          alert('This email is already registered. Please use a different email.');
        } else {
          toast.error(result.message || 'Registration failed');
          // alert(result.message || 'Registration failed');
        }
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="w-full h-full bg-[#f5f7fb] flex flex-col justify-center items-center px-10">
      <div className="flex flex-col justify-center items-center w-full max-w-[400px]">
        <Image src="/logo-1.png" alt="logo" width={80} height={80} />
        <p className="flex flex-col justify-center items-center w-full text-center text-[22px] text-[#7E22CE] mt-4">
          <span>Welcome to</span>
          <span className={`${roboto.className} font-bold`}>Ques.AI</span>
        </p>

        <div className="w-full mt-8 flex flex-col justify-center items-center gap-4">
          {/* Name Input */}
          <input
            placeholder="Full Name"
            value={name}
            type='text'
            onChange={(e) => setFullName(e.target.value)}
            className="border border-[#DBDBDB] focus:border-gray-400 rounded-[7px] p-3 w-full outline-none text-sm"
          />
          
          {/* Email Input */}
          <input
            placeholder="Email Address"
            value={email}
            type='email'
            onChange={(e) => setEmail(e.target.value)}
            className="border border-[#DBDBDB] focus:border-gray-400 rounded-[7px] p-3 w-full outline-none text-sm"
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-[#DBDBDB] focus:border-gray-400 rounded-[7px] p-3 w-full outline-none text-sm"
          />

          {/* Register Button */}
          <button
            onClick={handleRegister}
            disabled={loading}
            className={`text-center p-3 bg-[#7E22CE] w-full rounded-[7px] text-white ${roboto.className} font-bold hover:bg-[#6a1bbd] transition ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

          {/* Separator */}
          <div className="flex items-center w-full gap-2 my-2">
            <hr className="border-gray-300 border-t w-full" />
            <span className="text-gray-500 text-xs">OR</span>
            <hr className="border-gray-300 border-t w-full" />
          </div>

          {/* Google Register Button */}
          <button className="flex items-center justify-start gap-2 p-3 border border-[#DBDBDB] w-full rounded-[7px] text-gray-700 font-medium hover:bg-gray-100 text-sm transition">
            <Image src="/google-icon.png" alt="Google Icon" width={18} height={18} />
            Sign up with Google
          </button>

          {/* Already have an account link */}
          <p className="text-xs text-gray-600 mt-4">
            Already have an account?{' '}
            <button
              type="button"
              className="text-[#7E22CE] font-semibold hover:underline cursor-pointer"
              onClick={() => onChangeForm(!changeForm)}
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
