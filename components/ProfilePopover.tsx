import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useAuthStore } from "@/app/store/authStore";
import { useRouter } from "next/navigation";

interface ProfilePopoverProps {
  image: string;
}

const ProfilePopover: React.FC<ProfilePopoverProps> = ({ image }) => {
  const { logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/auth/register");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className=" rounded-full border-readrepurple-5 border-2 p-0 w-10 h-10 ">
          <Image
            src={image}
            alt="Profile"
            className="w-8 h-8 rounded-full"
            width={40}
            height={40}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4 rounded-md shadow-md bg-readreblack-1 text-white mt-1 mr-3 h-96 border-[.1rem] border-readreblack-4">
        <nav className="flex flex-col gap-2">
          <Button
            variant="ghost"
            className="justify-start"
            onClick={() => router.push("/admin/manage-blogs")}
          >
            Manage Your Blogs
          </Button>

          <Button
            variant="ghost"
            className="justify-start"
            onClick={() => router.push("/admin/create_blog")}
          >
            Create New Blog
          </Button>

          <Button
            variant="ghost"
            className="justify-start"
            onClick={() => router.push("/admin/create_blog")}
          >
            Profile
          </Button>

          <Button
            variant="ghost"
            className="justify-start "
            onClick={handleLogout}
          >
            Logout
          </Button>
          {/* Additional options can be added here */}
        </nav>
      </PopoverContent>
    </Popover>
  );
};

export default ProfilePopover;
