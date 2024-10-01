

import axios from 'axios';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import ClientBlogPost from './ClientBlogPost';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getApiUrl } from '@/utils/api';


const API_BASE_URL = getApiUrl();
async function getBlogPost(slug: string) {
  try {
    const res = await axios.get(`${API_BASE_URL}/blogs/${slug}`);
    console.log('Fetched blog post:', res.data);
    return res.data;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return undefined;
  }
}


export default async function BlogPost({ params }: { params: { slug: string } }) {
  const postData = await getBlogPost(params.slug);

  if (!postData) {
    notFound();
  }

  const formattedDate = new Date(postData.date_added).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section className="bg-readreblack-1 text-white overflow-hidden">
      <Navbar />
      <header className="text-center py-8">
        <p className="text-readrepurple-5 uppercase">{postData.tag}</p>
        <h1 className="text-4xl font-bold my-4">{postData.title}</h1>
        <p className="text-readreblack-4">{formattedDate} | {postData.reading_time} min read</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 mx-auto">
        <div className="col-span-1 md:col-span-3 my-6">
          <div className="relative w-full h-[400px]">
            <Image
              src={postData.image}
              alt={postData.title}
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-lg"
            />
          </div>
        </div>

        <div className="col-span-1 md:col-span-2">
          <ClientBlogPost content={postData.description} blogSlug={params.slug} />
        </div>

        <aside className="col-span-1 border-l pl-3">
          <section className="bg-readreblack-6 p-4 rounded-lg mb-6">
            <h2 className="text-xl font-bold mb-4">Subscribe To Our Newsletter</h2>
            <form>
              <input type="email" placeholder="name@email.com" className="w-full p-2 rounded-lg mb-4 bg-readreblack-5" />
              <button type="submit" className="w-full bg-readrepurple-5 p-2 rounded-lg">Subscribe</button>
            </form>
          </section>

          <section className="bg-readreblack-6 p-4 rounded-lg">
            <p className="font-bold text-2xl">Share It On:</p>
          </section>
        </aside>
      </div>

      <Footer />
    </section>
  );
}
