import BlogPost from './BlogPost';



const Page = ({ params }: { params: { slug: string } }) => {
  return <BlogPost params={params} />;
}


export default Page