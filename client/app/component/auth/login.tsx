'use client';

import { useProfile } from '@/app/context/profileContext';
import { roboto } from '@/app/fonts/fonts';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast'

const Login = ({ onChangeForm, changeForm }: any) => {
  const router = useRouter();

  const {setProfile}=useProfile()
  // Capture email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.status === true) {
        toast.success('Login successful!');
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userData', JSON.stringify(data.data));
        setProfile(data.data);
        router.push('/dashboard');
      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full bg-[#f5f7fb] flex flex-col justify-center items-center px-10">
      <div className="flex flex-col justify-center items-center w-full max-w-[400px]">
        <Image src="/logo-1.png" alt="logo2" width={80} height={80} />
        <p className="flex flex-col justify-center items-center w-full text-center text-[22px] text-[#7E22CE] mt-4">
          <span>Welcome to</span>
          <span className={`${roboto.className} font-bold`}>Ques.AI</span>
        </p>

        <div className="w-full mt-8 flex flex-col justify-center items-center gap-4">
          {/* Email Input */}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="border border-[#DBDBDB] focus:border-gray-400 rounded-[7px] p-3 w-full outline-none text-sm"
          />
          
          {/* Password Input */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="border border-[#DBDBDB] focus:border-gray-400 rounded-[7px] p-3 w-full outline-none text-sm"
          />

          {/* Checkbox and Forgot Password */}
          <div className="w-full flex justify-between items-center text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="w-4 h-4" />
              <label htmlFor="remember">Remember Me</label>
            </div>
            <a href="#" className="text-[#7E22CE] hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className={`text-center p-3 ${
              loading ? 'bg-[#7E22CE] hover:bg-[#6a1bbd] cursor-pointer' : 'bg-[#7E22CE] hover:bg-[#6a1bbd] cursor-pointer'
            } w-full rounded-[7px] text-white ${roboto.className} font-bold transition`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          {/* Separator */}
          <div className="flex items-center w-full gap-2 my-2">
            <hr className="border-gray-300 border-t w-full" />
            <span className="text-gray-500 text-xs">OR</span>
            <hr className="border-gray-300 border-t w-full" />
          </div>

          {/* Google Login Button */}
          <button className="flex items-center justify-start gap-2 p-3 border border-[#DBDBDB] w-full rounded-[7px] text-gray-700 font-medium hover:bg-gray-100 text-sm transition">
            <Image src="/google-icon.png" alt="Google Icon" width={18} height={18} />
            Continue with Google
          </button>

          {/* Create Account Link */}
          <p className="text-xs text-gray-600 mt-4">
            Don't have an account?{' '}
            <button
              type="button"
              className="text-[#7E22CE] font-semibold hover:underline bg-transparent cursor-pointer"
              onClick={() => onChangeForm(!changeForm)}
            >
              Create Account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
