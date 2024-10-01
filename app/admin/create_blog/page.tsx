// admin/create_blog/page.tsx
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Quill from "@/components/Quill";
import BlogPostPreview from "./BlogPostPreview";
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
  const [image, setImage] = useState<File | null>(null);
  const [imageName, setImageName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const router = useRouter();

  // useEffect(() => {

  //   return () => {
  //     second
  //   }
  // }, [third])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (image) {
      console.log("Hello!");
      console.log(e.target.files);
    }
    if (e.target.files) {
      setImage(e.target.files[0]);
      setImageName(e.target.files[0].name);
    }
  };

  console.log(image);
  const cloudinaryAxios = axios.create({
    baseURL: 'https://api.cloudinary.com/v1_1/domxafi8k',
    withCredentials: false, // Ensure no credentials are sent
  });
  
  // Do not add Authorization header to Cloudinary requests
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const trimmedDescription = description.trim();
    if (!trimmedDescription) {
      setError("Content cannot be empty.");
      return;
    }
  
    if (!image && !uploadedImageUrl) {
      setError("Please upload an image.");
      return;
    }
  
    try {
      let imageUrl = uploadedImageUrl;
  
      if (imageName && !uploadedImageUrl) {
        // Upload the image to Cloudinary using the new Axios instance
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "next-blog");
  
        const cloudinaryResponse = await cloudinaryAxios.post('/image/upload', formData);
        imageUrl = cloudinaryResponse.data.secure_url;
        setUploadedImageUrl(imageUrl);
      }
  
      // Payload to send to the backend
      const payload = {
        title,
        description: trimmedDescription,
        tag,
        members_only: membersOnly,
        image: imageUrl,
      };
  
      // Create the blog post with the image URL using the default Axios instance
      await axios.post("http://127.0.0.1:8000/blogs", payload);
      router.push("/welcome");
    } catch (err) {
      console.error("Error creating blog:", err);
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

  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  return (
    <section className="bg-readreblack-1 min-h-screen p-4">
      <Navbar />
      <div className="container mx-auto mt-6">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold mb-6 text-readrepurple-5">
            Create a New Blog
          </h1>
          <button
            onClick={togglePreviewMode}
            className="mb-4 bg-readrepurple-5 hover:bg-readrepurple-4 text-white py-2 px-4 rounded"
          >
            {isPreviewMode ? "Edit Mode" : "Preview Mode"}
          </button>
        </div>
        {isPreviewMode ? (
          <BlogPostPreview
            title={title}
            content={description}
            tag={tag}
            image={image}
          />
        ) : (
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
              <Select value={tag} onValueChange={(value) => setTag(value)}>
                <SelectTrigger className="w-full p-2 rounded bg-readreblack-6 bg-opacity-20">
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
            <div className="mb-4">
  <label htmlFor="imageUpload" className="block text-sm font-bold mb-2">
    Upload Image
  </label>
  <div className="relative cursor-pointer">
    <input
      id="imageUpload"
      type="file"
      onChange={handleImageUpload}
      className="w-full p-2 rounded bg-readreblack-6 bg-opacity-20 opacity-0 absolute z-50 h-[100%] cursor-pointer"
     
    />
    <div className="w-full p-2 rounded bg-readreblack-6 bg-opacity-20 text-white cursor-pointer">
      {imageName ? `Selected file: ${imageName}` : 'Choose an image'}
    </div>
  </div>
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
        )}
      </div>
    </section>
  );
};

export default CreateBlog;