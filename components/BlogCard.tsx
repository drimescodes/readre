import Image from 'next/image';
import Link from 'next/link';

interface BlogCardProps {
    title: string;
    slug: string;
    author?: string;
    category: string;
    date: string;
    readTime: string;
    imageUrl: string;  // Add imageUrl prop
}

const BlogCard = ({ title, slug, author, category, date, readTime, imageUrl }: BlogCardProps) => {
    return (
        <Link href={`/blogs/${slug}`} passHref>
            <section className="w-[21rem] h-[23rem] sm:w-[22rem] sm:h-[24rem] lg:w-[26rem] lg:h-[26rem] bg-readreblack-2 p-3 rounded-md group overflow-hidden cursor-pointer flex flex-col">
                <div className="relative w-full h-44 sm:h-48 lg:h-56 overflow-hidden rounded-md shrink-0">
                    <Image
                        src={imageUrl}  // Use dynamic image URL
                        alt={title}
                        className="rounded-md object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-105 sm:group-hover:scale-110"
                        fill
                        sizes="(max-width: 640px) 21rem, (max-width: 1024px) 22rem, 26rem"
                    />
                </div>
                <div className="flex-1 flex flex-col">
                    <div className="pt-5 flex items-center gap-3">
                        <span className="h-10 w-[2px] bg-readrepurple-5"></span>
                        <p className="text-readrepurple-5 font-semibold line-clamp-1">{category}</p>
                    </div>
                    <p className="pt-4 font-bold text-lg text-white line-clamp-2">{title}</p>
                    <p className="pt-2 text-readreblack-6 text-sm line-clamp-1">By {author || "Unknown"}</p>
                    <p className="text-readreblack-6 text-sm mt-auto">
                        {date}<span className="pl-6">{readTime}</span>
                    </p>
                </div>
            </section>
        </Link>
    );
};

export default BlogCard;
