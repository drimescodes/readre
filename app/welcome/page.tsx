import BlogCard from "@/components/BlogCard";
import Newsletter from "@/components/welcomeUI/Newsletter";

const page = () => {
  const blogs = [
    {
      title: "Anime's Impact On Cracked Devs",
      slug: "animes-impact-on-cracked-devs",
      category: "Anime",
      date: "March 22, 2023",
      readTime: "4 min read"
    },
    {
      title: "Wondering If You'd Ever Be Cracked?",
      slug: "wondering-if-you'd-ever-be-cracked",
      category: "Self Help",
      date: "June 28, 2023",
      readTime: "6 min read"
    },
    {
      title: "The Rise of TypeScript in Modern Development",
      slug: "rise-of-typescript-in-modern-development",
      category: "Technology",
      date: "July 15, 2023",
      readTime: "5 min read"
    },
    {
      title: "Effective Remote Work Strategies for Developers",
      slug: "effective-remote-work-strategies-for-developers",
      category: "Productivity",
      date: "April 10, 2023",
      readTime: "7 min read"
    },
    {
      title: "Understanding the Basics of Next.js",
      slug: "understanding-the-basics-of-nextjs",
      category: "Web Development",
      date: "May 5, 2023",
      readTime: "8 min read"
    },
    {
      title: "How to Master Tailwind CSS for Your Projects",
      slug: "how-to-master-tailwind-css-for-your-projects",
      category: "CSS",
      date: "August 12, 2023",
      readTime: "10 min read"
    }
  ];
  
  return (
    <section className="pt-10 pb-8">
      <div className="flex items-center justify-center gap-4">
        <div className="border-b-2 border-b-readreblack-4 flex-1"></div>
        <p className="sm:px-10 text-center sm:text-3xl text-xl font-bold flex-nowrap">Featured Posts</p>
        <div className="border-b-2 border-b-readreblack-4 flex-1"></div>
      </div>

      <section className="pt-6 grid place-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog, index) => (
          <BlogCard key={index} {...blog} />
        ))}
      </section>

      <button className="border border-readrepurple-5 flex mx-auto p-3 my-6 rounded-md text-readrepurple-5 hover:bg-readrepurple-5 hover:text-white">
        Explore More Articles
      </button>

      <Newsletter />
    </section>
  );
};

export default page;
