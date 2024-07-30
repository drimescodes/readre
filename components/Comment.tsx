// app/components/Comment.tsx
"use client";
import Image from "next/image";
import samurai from "@/public/samurai_champloo.jpg";

import { useState } from "react";

interface ReplyProps {
  id: number;
  text: string;
  author: string;
  onDelete: (id: number) => void;
  onEdit: (id: number, text: string) => void;
  onReply: (id: number, text: string) => void;
  onLike: (id: number) => void;
  liked: boolean;
}

interface CommentProps extends ReplyProps {
  replies: ReplyProps[];
}
const Comment = ({
  id,
  text,
  author,
  replies = [],
  onDelete,
  onEdit,
  onReply,
  onLike,
  liked,
}: CommentProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);
  const [replyText, setReplyText] = useState("");

  const handleEdit = () => {
    onEdit(id, editText);
    setIsEditing(false);
  };

  const handleReply = () => {
    onReply(id, replyText);
    setReplyText("");
  };

  return (
    <div className="mb-4 w-[70%]">
      <div className="flex items-start justify-between">
        <div className="">
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
            <p>{text}</p>
          )}
          <div className="flex items-center space-x-4">
            <button onClick={() => onLike(id)}>
              {liked ? "Unlike" : "Like"}
            </button>
            <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
            <button onClick={() => onDelete(id)}>Delete</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </div>
      </div>
      {isEditing && <button onClick={handleEdit}>Save</button>}
      <div className="mt-2">
        <textarea
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder="Reply to this comment"
          className="w-full"
        />
        <button onClick={handleReply}>Reply</button>
      </div>
      <div className="pl-4 border-l-2 mt-4">
        

{replies.map((reply) => (
          <Comment
            key={reply.id}
            {...reply}
            replies={[]} // Replies don't have their own replies
          />
        ))}
      </div>
    </div>
  );
};

export default Comment;
