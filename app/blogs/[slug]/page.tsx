import axios from 'axios';
import ClientBlogPost from './ClientBlogPost';

interface BlogPostProps {
  params: { slug: string };
}

const BlogPost = async ({ params }: BlogPostProps) => {
  const { slug } = params;

  try {
    const response = await axios.get(`http://127.0.0.1:8000/blogs/${slug}`);
    const postData = response.data;

    return (
      <section className='bg-readreblack-1 text-white '>
        <div dangerouslySetInnerHTML={{ __html: postData.description }} />
        <ClientBlogPost slug={postData.title} />
        
        {/* Render other postData fields if necessary */}
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

    return blogs.map((blog: { id: number, title: string }) => ({
      slug: blog.id.toString(),
    }));
  } catch (error) {
    console.error('Error fetching blog slugs:', error);
    return [];
  }
}
export default BlogPost;
