
import Link from "next/link"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { HiOutlineMenuAlt4 } from "react-icons/hi";


const Navbar = () => {
  return (
    <header className="w-full bg-readreblack-1 text-white sticky top-0 z-50 border-b border-b-readreblack-4">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          
          <p className="text-2xl font-semibold">Readre<span className="font-bold text-3xl text-[#9333ea]">.</span> </p>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="#" className="text-sm font-medium hover:text-readrepurple-5 transition-colors" prefetch={false}>
            Home
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-readrepurple-5 transition-colors" prefetch={false}>
            Blog
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-readrepurple-5 transition-colors" prefetch={false}>
          About
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-readrepurple-5 transition-colors" prefetch={false}>
            Contact
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden hover:bg-readreblack-1">
              <HiOutlineMenuAlt4  className="w-6 h-6 text-white bg-readreblack-1" />
              <span className="sr-only">Toggle navigation</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 bg-background p-4 bg-readreblack-1 text-white">
            <nav className="grid gap-4">
              <Link href="#" className="text-sm font-medium hover:text-readrepurple-5 transition-colors" prefetch={false}>
                Home
              </Link>
              <Link href="#" className="text-sm font-medium hover:text-readrepurple-5 transition-colors" prefetch={false}>
                Blog
              </Link>
              <Link href="#" className="text-sm font-medium hover:text-readrepurple-5 transition-colors" prefetch={false}>
              About
              </Link>
              <Link href="#" className="text-sm font-medium hover:text-readrepurple-5 transition-colors" prefetch={false}>
                Contact
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

export default Navbar





