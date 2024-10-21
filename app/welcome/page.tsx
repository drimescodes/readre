'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import BlogCard from '@/components/BlogCard';
import Newsletter from '@/components/welcomeUI/Newsletter';
import { useAuthStore } from '@/app/store/authStore';
import useSWR from 'swr';
import BlogCardSkeleton from '@/components/BlogCardSkeleton';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

// Skeleton component for blog cards
// const BlogCardSkeleton = () => (
//   <div className="w-full max-w-sm mx-auto bg-white rounded-lg overflow-hidden shadow-md animate-pulse">
//     <div className="h-48 bg-gray-200"></div>
//     <div className="p-4">
//       <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
//       <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
//       <div className="flex gap-4 items-center">
//         <div className="h-3 bg-gray-200 rounded w-1/4"></div>
//         <div className="h-3 bg-gray-200 rounded w-1/4"></div>
//       </div>
//     </div>
//   </div>
// );

const WelcomePage = () => {
  const { user, isAuthenticated, checkAuth } = useAuthStore();
  const router = useRouter();
  
  const { data: blogs, error } = useSWR(
    isAuthenticated ? '/blogs?limit=6' : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );

  useEffect(() => {
    const initAuth = async () => {
      const isAuthed = await checkAuth();
      if (!isAuthed) {
        router.replace('/auth/register');
      }
    };

    initAuth();
  }, [checkAuth, router]);

 

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-red-500">Error loading blogs</p>
      </div>
    );
  }

  return (
    <section className="pt-10 pb-8">
      <div className="flex items-center justify-between mb-8 px-4">
        <h1 className="text-2xl font-bold">Welcome back, {user?.name.split(' ')[0]}!</h1>
      </div>
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="border-b-2 border-b-readreblack-4 flex-1"></div>
        <p className="sm:px-10 text-center sm:text-3xl text-xl font-bold flex-nowrap">
          Featured Posts
        </p>
        <div className="border-b-2 border-b-readreblack-4 flex-1"></div>
      </div>

      <section className="pt-6 grid place-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:px-6">
        {!blogs ? (
          
          [...Array(6)].map((_, index) => (
            <BlogCardSkeleton key={index} />
          ))
        ) : (
          blogs.map((blog: any, index: number) => (
            <BlogCard
              key={blog.id || index}
              title={blog.title}
              slug={blog.slug}
              category={blog.tag}
              date={new Date(blog.date_added).toLocaleDateString()}
              readTime={`${blog.reading_time} min read`}
              imageUrl={blog.image}
            />
          ))
        )}
      </section>

      <button 
        onClick={() => router.push('/blogs')}
        className="border border-readrepurple-5 flex mx-auto p-3 my-6 rounded-md text-readrepurple-5 hover:bg-readrepurple-5 hover:text-white transition-colors duration-300"
      >
        Explore More Articles
      </button>

      <Newsletter />
    </section>
  );
};

export default WelcomePage;