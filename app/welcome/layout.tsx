import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BlogLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="bg-readreblack-1 text-white ">
      <Navbar />
      
      {children}

      <Footer />

    </section>
  );
};

export default BlogLayout;