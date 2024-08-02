"use client";
import Image from "next/image";
import samurai from "@/public/samurai_champloo.jpg";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";


interface CommentProps {
  id: number;
  text: string;
  author: string;
  onDelete: (id: number) => void;
  onEdit: (id: number, text: string) => void;
  onLike: (id: number) => void;
  liked: boolean;
}

const Comment = ({
  id,
  text,
  author,
  onDelete,
  onEdit,
  onLike,
  liked,
}: CommentProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleEdit = () => {
    onEdit(id, editText);
    setIsEditing(false);
  };

  return (
    <div className="mb-4  p-4">
      <div className="flex items-start justify-between">
        <div className="my-4">
          <section className="inline-flex gap-4 items-center">
            <Image src={samurai} alt="" className="w-6 h-6 " />
            <p className="font-bold ">{author}</p>
          </section>

          {isEditing ? (
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full text-readreblack-1"
            />
          ) : (
            <p className="my-2">{text}</p>
          )}
          <div className="flex items-center space-x-4 " >
            <button onClick={() => onLike(id)}>
              {liked ? <p>Like</p> : <p className="text-readrepurple-5">Like</p>}
            </button> 
            <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
            <button onClick={() => onDelete(id)}>Delete</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
            <p className="inline-flex items-center justify-self-end gap-2 pl-9 ">
             <FaHeart className=" text-readrepurple-5"/> 4
            </p>
            
          </div>
          
        </div>
      </div>
      {isEditing && <button onClick={handleEdit}>Save</button>}
    </div>
  );
};

export default Comment;
