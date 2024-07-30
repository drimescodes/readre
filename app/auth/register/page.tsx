'use client';
import Image from "next/image";
import React from "react";
import { FcGoogle } from "react-icons/fc";
const Register = () => {

  
  return (
    <div className="w-full relative bg-readreblack-1 text-white h-svh flex justify-center items-center">
      <div className="w-[121px] text-buddyPrimary font-bold text-[40px] leading-[48px] tracking-[-3%] absolute left-[100px] top-16 h-[48px]">
        <div className="rounded-full bg-buddyDark -top-[8px] size-4 absolute right-[0px]"></div>
        Readre<span className="font-bold text-6xl text-[#9333ea]">.</span>
      </div>
      <div className="flex justify-center items-center flex-col">
        <h1 className="font-bold text-[48px]  leading-[55px] tracking-[-3%] px-4">
          Welcome to Readre<span className="font-bold text-6xl text-[#9333ea]">.</span>
        </h1>
        <button
          
          className="font-bold text-[18px] leading-[22px] rounded-[48px] text-white items-center gap-2 flex bg-readrepurple-5 h-[64px] mt-12 w-[298px] px-[41px]"
        >
          <FcGoogle size={30}/>
          Sign in with Google
        </button>
        <p className="max-w-[803px] text-[24px] leading-[29px] tracking-[-3%] font-normal text-center mt-[32px] text-readreblack-6">
          If you have an account, by clicking sign up with Google you will be automatically logged in.
        </p>
      </div>
    </div>
  );
};

export default Register;