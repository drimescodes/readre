'use client';
import Image from "next/image";
import React from "react";
import { FcGoogle } from "react-icons/fc";
const Register = () => {

  
  return (
    <section className="w-full  bg-readreblack-1 text-white h-svh sm:p-8 p-4">
      <p className="w-[121px]  font-bold sm:text-[40px] text-[30px] leading-[48px] tracking-[-3%] h-[48px] mb-16 ">
        
        Readre<span className="font-bold text-6xl text-[#9333ea]">.</span>
      </p>
      <section className="flex flex-col items-center">
        <h1 className="font-bold sm:text-[48px] text-[50px]  leading-[55px] tracking-[-3%] mb-8">
          Welcome to Readre<span className="font-bold text-6xl text-[#9333ea]">.</span>
        </h1>
        <button
          
          className="font-bold text-[18px] leading-[22px] rounded-[48px] text-white items-center gap-2 flex bg-readrepurple-5 h-[64px] mt-12 w-[298px] px-[41px] mb-8"
        >
          <FcGoogle size={30}/>
          Sign in with Google
        </button>
        <p className="text-center mt-4 text-readreblack-6">
          If you have an account, by clicking sign up with Google you will be automatically logged in.
        </p>
      </section>
    </section>
  );
};

export default Register;