import Navbar from "@/components/Navbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="bg-readreblack-1 min-h-screen lg:p-4">
      <Navbar />
      <div className="mx-auto mt-6">
        {children}
      </div>
    </section>
  );
}