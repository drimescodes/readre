import axios from 'axios';
import BlogCard from "@/components/BlogCard";
import Newsletter from "@/components/welcomeUI/Newsletter";

const page = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/blogs');
    const blogs = response.data;

    return (
      <section className="pt-10 pb-8">
        <div className="flex items-center justify-center gap-4">
          <div className="border-b-2 border-b-readreblack-4 flex-1"></div>
          <p className="sm:px-10 text-center sm:text-3xl text-xl font-bold flex-nowrap">Featured Posts</p>
          <div className="border-b-2 border-b-readreblack-4 flex-1"></div>
        </div>

        <section className="pt-6 grid place-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog: any, index: number) => (
            <BlogCard 
              key={index}
              title={blog.title}
              slug={blog.slug}
              category={blog.tag}
              date={new Date(blog.date_added).toLocaleDateString()}
              readTime={`${blog.reading_time} min read`}
            />
          ))}
        </section>

        <button className="border border-readrepurple-5 flex mx-auto p-3 my-6 rounded-md text-readrepurple-5 hover:bg-readrepurple-5 hover:text-white">
          Explore More Articles
        </button>

        <Newsletter />
      </section>
    );
  } catch (error) {
    console.error('Error fetching blogs:', error);
    // Handle error case here
    return <p>Error loading blogs. Please try again later.</p>;
  }
};

export default page;
