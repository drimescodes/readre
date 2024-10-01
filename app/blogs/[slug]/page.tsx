import BlogPost from './BlogPost';

export default function Page({ params }: { params: { slug: string } }) {
  return <BlogPost params={params} />;
}