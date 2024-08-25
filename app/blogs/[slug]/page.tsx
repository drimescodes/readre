import axios from 'axios';
import ClientBlogPost from './ClientBlogPost';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

interface BlogPostProps {
  params: { slug: string };
}

const BlogPost = async ({ params }: BlogPostProps) => {
  const { slug } = params;

  try {
    const response = await axios.get(`http://127.0.0.1:8000/blogs/${slug}`);
    const postData = response.data;
    console.log(postData);
    

    return (
      <section className='bg-readreblack-1 text-white'>
        <Navbar />
        {/* Header Section */}
        <header className="text-center py-8">
          <p className="text-readrepurple-5 uppercase">{postData.tag}</p>
          <h1 className="text-4xl font-bold my-4">{postData.title}</h1>
          <p className="text-readreblack-4">{postData.date_added} | {postData.reading_time} min read</p>
        </header>
        
        {/* Main Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 mx-auto">
          {/* Image */}
          <Image src={postData.image} alt={postData.title} className="w-full col-span-1 md:col-span-3 rounded-lg" />

          {/* Blog Post Content */}
          <div className="col-span-1 md:col-span-2">
            <ClientBlogPost content={postData.description} />
          </div>

          {/* Newsletter Subscription */}
          <aside className="col-span-1 border-l pl-3">
            <section className='bg-readreblack-6 p-4 rounded-lg mb-6'>
            <h2 className="text-xl font-bold mb-4">Subscribe To Our Newsletter</h2>
            <form>
              <input type="email" placeholder="name@email.com" className="w-full p-2 rounded-lg mb-4 bg-readreblack-5" />
              <button type="submit" className="w-full bg-readrepurple-5 p-2 rounded-lg">Subscribe</button>
            </form>
            </section>

            <section className='bg-readreblack-6 p-4 rounded-lg '>
        <p className='font-bold text-2xl'>Share It On:</p>
            </section>
          </aside>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return <p>Error loading blog post.</p>;
  }
};

export async function generateStaticParams() {
  try {
    const response = await axios.get('http://127.0.0.1:8000/blogs');
    const blogs = response.data;

    return blogs.map((blog: { slug: string }) => ({
      slug: blog.slug, 
    }));
  } catch (error) {
    console.error('Error fetching blog slugs:', error);
    return [];
  }
}

export default BlogPost;
