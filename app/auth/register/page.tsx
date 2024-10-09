'use client'
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/app/store/authStore';
import { useState } from 'react';
import Loading from './loading';

const Register = () => {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      console.log('Google login success:', codeResponse);
      setLoading(true);
      try {
        await login(codeResponse.access_token);
        router.push('/welcome');
      } catch (error) {
        console.error('Error during backend authentication:', error);
        setLoading(false);
      }
    },
    onError: (error) =>{
    console.log('Login Failed:', error)
    setLoading(false);}
  });

  return (
    <section className="w-full bg-readreblack-1 text-white h-svh sm:p-8 p-4">
      <p className="w-[121px] font-bold sm:text-[40px] text-[30px] leading-[48px] tracking-[-3%] h-[48px] mb-16">
        Readre<span className="font-bold text-6xl text-[#9333ea]">.</span>
      </p>
      <section className="flex flex-col items-center">
        <h1 className="font-bold sm:text-[48px] text-[50px] leading-[55px] tracking-[-3%] mb-8">
          Welcome to Readre<span className="font-bold text-6xl text-[#9333ea]">.</span>
        </h1>
       
        
          <button
            onClick={() => handleGoogleLogin()}
            className={`font-bold text-[1.1rem] leading-[22px] rounded-[48px] text-white items-center gap-2 flex bg-readrepurple-5 h-[64px] mt-12 w-[298px] px-[41px] mb-8 cursor-pointer ${loading ? 'opacity-80' : ''}`}
            
    >
      <FcGoogle size={30} />
      {loading ? (
        <>
          <span>Signing Up...</span> 
          <Loading /> 
        </>
      ) : (
        <span>Sign Up With Google</span>
      )}
    </button>

          
        <p className="text-center mt-4 text-readreblack-6 ">
          If you have an account, by clicking sign up with Google you will be automatically logged in.
        </p>
      </section>
    </section>
  );
};

export default Register;