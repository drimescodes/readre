"use client";

import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { Pen } from "lucide-react";
import { useAuthStore } from "@/app/store/authStore";
import { useRouter } from "next/navigation";
import ProfilePopover from "@/components/ProfilePopover";

const Navbar = () => {
  const { user, isAuthenticated } = useAuthStore();

  return (
    <header className="w-full bg-readreblack-1 text-white sticky top-0 z-50 border-b border-b-readreblack-4">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link
          href="/welcome"
          className="flex items-center gap-2"
          prefetch={false}
        >
          <p className="text-2xl font-semibold">
            Readre<span className="font-bold text-3xl text-[#9333ea]">.</span>
          </p>
        </Link>
        <nav className="flex items-center gap-6 ">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 text-white">
            <Link
              href="/"
              className="text-sm font-medium hover:text-readrepurple-5 transition-colors"
              prefetch={false}
            >
              Home
            </Link>
            <Link
              href="/blogs"
              className="text-sm font-medium hover:text-readrepurple-5 transition-colors"
              prefetch={false}
            >
              Blog
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:text-readrepurple-5 transition-colors"
              prefetch={false}
            >
              About
            </Link>
{!isAuthenticated &&

            (<Link
              href="/auth/register"
              className="text-sm  bg-readrepurple-5 bg-opacity-80 hover:bg-readrepurple-5 font-bold rounded-md py-1 px-4 transition-colors"
              prefetch={false}
            >
              Log In
            </Link>)}
          </div>

          {/* Write Button (visible on both mobile and desktop when authenticated) */}
          {isAuthenticated && (
            <Link
              href="/admin/create_blog"
              className="text-[1.1rem] font-medium hover:text-readrepurple-5 transition-colors"
              prefetch={false}
            >
              <Pen className="inline-flex w-5 mr-[.1rem]" /> Write
            </Link>
          )}

          {/* Profile Image or Hamburger Menu */}
          {isAuthenticated && user?.picture ? (
            <ProfilePopover image={user.picture} />
          ) : (
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden hover:bg-readreblack-1"
                >
                  <HiOutlineMenuAlt4 className="w-6 h-6 text-white bg-readreblack-1" />
                  <span className="sr-only">Toggle navigation</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-64 bg-background p-4 bg-readreblack-1 text-white"
              >
                <nav className="grid gap-4">
                  <Link
                    href="/"
                    className="text-sm font-medium hover:text-readrepurple-5 transition-colors"
                    prefetch={false}
                  >
                    Home
                  </Link>
                  <Link
                    href="/blogs"
                    className="text-sm font-medium hover:text-readrepurple-5 transition-colors"
                    prefetch={false}
                  >
                    Blog
                  </Link>
                  <Link
                    href="#"
                    className="text-sm font-medium hover:text-readrepurple-5 transition-colors"
                    prefetch={false}
                  >
                    About
                  </Link>

                  <Link
                    href="/auth/register"
                    className="text-sm  bg-readrepurple-5 bg-opacity-80 hover:bg-readrepurple-5 font-bold rounded-md py-1 px-4 transition-colors"
                    prefetch={false}
                  >
                    Log In
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
