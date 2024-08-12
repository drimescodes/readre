import Image from 'next/image';
import Link from 'next/link';
import samurai from '@/public/samurai_champloo.jpg';

interface BlogCardProps {
  title: string;
  slug: string;
  category: string;
  date: string;
  readTime: string;
}

const BlogCard = ({ title, slug, category, date, readTime }: BlogCardProps) => {
  return (
    <Link href={`/blogs/${slug}`} passHref>
      <section className="w-[21rem] h-[23rem] sm:w-[22rem] sm:h-[24rem] lg:w-[26rem] lg:h-[26rem] bg-readreblack-2 p-3 rounded-md relative group overflow-hidden cursor-pointer">
        <div className="overflow-hidden rounded-md">
          <Image
            src={samurai}
            alt={title}
            className="rounded-md transform transition-transform duration-500 ease-in-out group-hover:scale-105 sm:group-hover:scale-110"
          />
        </div>
        <div>
          <span className="border-[1.5px] border-readrepurple-5 absolute sm:top-[16rem] top-[13.4rem] left-0 h-10"></span>
          <p className="pt-8 text-readrepurple-5 font-semibold">{category}</p>
        </div>
        <p className="pt-4 font-bold text-lg">{title}</p>
        <p className="text-readreblack-6 text-sm absolute bottom-4">
          {date}<span className="pl-6">{readTime}</span>
        </p>
      </section>
    </Link>
  );
};

export default BlogCard;
