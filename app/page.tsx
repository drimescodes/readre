'use client'
import Navbar from "@/components/Navbar"
import Image from "next/image"
import Hero from "@/public/illustrationsblack.svg"
import Link from "next/link"
import { LucideHeart, Github, Twitter, Globe } from "lucide-react"

const page = () => {
  return (
    <section className="relative flex flex-col min-h-screen bg-readreblack-1 text-white">
      <Navbar />

      {/* Main content */}
      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left side - Text Content */}
            <div className="flex-1 text-center lg:text-left animate-fadeIn">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="block">Share Your Story on</span>
                <span className="block text-readrepurple-5 hover:scale-105 transition-transform">
                  Readre
                </span>
              </h1>
              <p className="mt-6 text-lg text-[#D7D7D7] max-w-3xl">
                Your thoughts deserve a beautiful space. Write, read, and connect 
                with passionate writers and readers in a community that celebrates 
                creativity and authentic voices.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/auth/register" className="px-8 py-3 rounded-lg bg-readrepurple-5 bg-opacity-80 text-white font-semibold hover:bg-readrepurple-5 transition-all hover:scale-105">
                  Start Writing
                </Link>
                <Link href="/blogs" className="px-8 py-3 rounded-lg border border-readrepurple-5 border-opacity-80 font-semibold hover:border-readrepurple-5 transition-all hover:scale-105">
                  Explore Blogs
                </Link>
              </div>
            </div>

            {/* Right side - Image */}
            <div className="flex-1 animate-fadeInRight">
              <Image
                src={Hero}
                alt="Hero illustration"
                className="w-full h-auto rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                width={600}
                height={400}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-readreblack-6 border-opacity-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-readreblack-6">
              <span>© 2024 Made with</span>
              <LucideHeart className="w-4 h-4 text-readrepurple-5 animate-pulse" />
              <span>by drimes</span>
            </div>
            <div className="flex gap-6">
              <a href="https://github.com/drimescodes" target="_blank" className="text-readreblack-6 hover:text-readrepurple-5 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://twitter.com/drimesbot" target="_blank" className="text-readreblack-6 hover:text-readrepurple-5 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://drimes-portfolio.vercel.app/" target="_blank" className="text-readreblack-6 hover:text-readrepurple-5 transition-colors">
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
        .animate-fadeInRight {
          animation: fadeInRight 0.8s ease-out;
        }
      `}</style>
    </section>
  );
};

export default page;
