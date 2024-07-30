// app/blogs/[slug]/page.tsx
import ClientBlogPost from './ClientBlogPost';


interface BlogPostProps {
  params: { slug: string };
}

const BlogPost = async ({ params }: BlogPostProps) => {
  const { slug } = params;

  // Fetch blog post data based on the slug
  // This is where you'd fetch your actual data. For now, we'll just return the slug.
  const postData = { slug };

  return (
    <section className='bg-readreblack-1 text-white'>
      <ClientBlogPost slug={postData.slug} />
      
    </section>
  );
};

export async function generateStaticParams() {
  // Fetch all available slugs from your data source
  const slugs = ['animes-impact-on-cracked-devs', "wondering-if-you'd-ever-be-cracked?"]; // Example slugs

  return slugs.map(slug => ({
    slug,
  }));
}

export default BlogPost;
