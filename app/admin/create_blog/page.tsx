"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Import the hook for navigation
import Navbar from "@/components/Navbar";
import Quill from "@/components/Quill";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("GENERAL");
  const [membersOnly, setMembersOnly] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Initialize the router

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Log the description to check its content
    console.log("Description:", description);

    // Trim description to remove unnecessary spaces
    const trimmedDescription = description.trim();

    // Prevent submission if description is empty
    if (!trimmedDescription) {
      setError("Content cannot be empty.");
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8000/blogs", {
          title,
          description: trimmedDescription,
          tag,
          members_only: membersOnly,
      });
  
      router.push("/welcome");
  } catch (err) {
    console.log("err", err);
    
      if (axios.isAxiosError(err) && err.response) {
          const status = err.response.status;
          if (status === 400) {
              setError("Bad request: " + (err.response.data.detail || "Invalid data"));
          } else if (status === 500) {
              setError("Server error: Please try again later.");
          } else {
              setError("Unexpected error: " + (err.response.data.detail || "Please try again."));
          }
      } else {
          setError("Failed to create blog. Please try again.");
      }
  }
  
  };

  console.log("desc", description);

  return (
    <section className="bg-readreblack-1 min-h-screen p-4">
      <Navbar />
      <div className="container mx-auto mt-6">
        <h1 className="text-3xl font-bold mb-6 text-readrepurple-5">
          Create a New Blog
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-readreblack-6 bg-opacity-20 text-white p-6 rounded shadow-md"
        >
          {error && <p className="text-red-500">{error}</p>}
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-bold mb-2">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none bg-transparent"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-bold mb-2"
            >
              Content
            </label>
            <Quill value={description} setValue={setDescription} />
          </div>
          <div className="mb-4">
            <label htmlFor="tag" className="block text-sm font-bold mb-2">
              Tag
            </label>
            <Select
              value={tag}
              onValueChange={(value) => setTag(value)}
            >
              <SelectTrigger className="w-full p-2  rounded bg-readreblack-6 bg-opacity-20">
                <SelectValue placeholder="Select a tag" />
              </SelectTrigger>
              <SelectContent className="bg-readreblack-4 font-semibold text-xl">
                <SelectItem value="GENERAL">General</SelectItem>
                <SelectItem value="TECHNOLOGY">Technology</SelectItem>
                <SelectItem value="LIFESTYLE">Lifestyle</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="membersOnly"
              className="block text-sm font-bold mb-2"
            >
              Members Only
            </label>
            <input
              id="membersOnly"
              type="checkbox"
              checked={membersOnly}
              onChange={(e) => setMembersOnly(e.target.checked)}
              className="mr-2"
            />
            Yes
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-readrepurple-5 bg-opacity-80 text-white py-2 px-4 rounded hover:bg-readrepurple-5"
            >
              Create Blog
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateBlog;
