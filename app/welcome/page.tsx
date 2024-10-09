'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import BlogCard from '@/components/BlogCard';
import Newsletter from '@/components/welcomeUI/Newsletter';
import { useAuthStore } from '@/app/store/authStore';
import Spinner from '@/components/Spinner';

const WelcomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const { user, isAuthenticated, isLoading, checkAuth } = useAuthStore();
  const [pageLoading, setPageLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      const isAuthed = await checkAuth();
      if (!isAuthed) {
        router.replace('/auth/register');
        return;
      }

      try {
        const response = await axios.get('/blogs');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setPageLoading(false);
      }
    };

    initAuth();
  }, [checkAuth, router]);

  if (isLoading || pageLoading) {
    return <Spinner className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'/>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <section className="pt-10 pb-8 ">
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

   
        {pageLoading ? <Spinner className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'/> : (
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

      <button className="border border-readrepurple-5 flex mx-auto p-3 my-6 rounded-md text-readrepurple-5 hover:bg-readrepurple-5 hover:text-white transition-colors duration-300">
        Explore More Articles
      </button>

      <Newsletter />
    </section>
  );
};

export default WelcomePage;