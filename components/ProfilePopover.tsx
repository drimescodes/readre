
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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
      <PopoverTrigger asChild >
        <Button  className=" rounded-full border-readrepurple-5 border-2 p-0 w-10 h-10 ">
          <Image
            src={image}
            alt="Profile"
            className="w-8 h-8 rounded-full"
            width={40}
            height={40}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4 rounded-md shadow-md">
        <nav className="flex flex-col gap-2">
          <Button variant="ghost" className="justify-start" onClick={handleLogout}>
            Logout
          </Button>
          <Button variant="ghost" className="justify-start">
            My Drafts
          </Button>
          <Button variant="ghost" className="justify-start">
            Manage Blogs
          </Button>
          {/* Additional options can be added here */}
        </nav>
      </PopoverContent>
    </Popover>
  );
};

export default ProfilePopover;
