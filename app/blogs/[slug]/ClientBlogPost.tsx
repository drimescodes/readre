"use client";

import { useState } from 'react';
import Comment from '@/components/Comment';
import LikeButton from '@/components/LikeButton';

interface ClientBlogPostProps {
  content: string;
}


const ClientBlogPost = ({ content }: ClientBlogPostProps) => {
  const [comments, setComments] = useState([
    {
      id: 1,
      text: 'Great post!',
      author: 'Alice',
      liked: false,
    },
    {
      id: 2,
      text: 'Thanks for sharing!',
      author: 'Bob',
      liked: false,
    },
  ]);

  const [newCommentText, setNewCommentText] = useState('');

  const handleAddComment = () => {
    setComments([...comments, { id: comments.length + 1, text: newCommentText, author: 'You', liked: false }]);
    setNewCommentText('');
  };

  const handleDeleteComment = (id: number) => {
    setComments(comments.filter(comment => comment.id !== id));
  };

  const handleEditComment = (id: number, text: string) => {
    setComments(comments.map(comment => comment.id === id ? { ...comment, text } : comment));
  };

  const handleLikeComment = (id: number) => {
    setComments(comments.map(comment => comment.id === id ? { ...comment, liked: !comment.liked } : comment));
  };

   return (
    <article className='min-h-svh max-w-svw bg-readreblack-1'>
      <div dangerouslySetInnerHTML={{ __html: content }} className="leading-relaxed" />
      
      <LikeButton />
      
      {/* Comments Section */}
      <div className="h-[40%] bg-readreblack-1">
        <div className="flex items-center justify-center gap-4 py-6">
          <div className="border-b-2 border-b-readreblack-4 flex-1"></div>
          <p className="sm:px-10 text-center sm:text-3xl text-xl font-bold flex-nowrap">Comments</p>
          <div className="border-b-2 border-b-readreblack-4 flex-1"></div>
        </div>

        <section className='bg-readreblack-6 flex flex-col bg-opacity-20'>
          {comments.map(comment => (
            <Comment
              key={comment.id}
              {...comment}
              onDelete={handleDeleteComment}
              onEdit={handleEditComment}
              onLike={handleLikeComment}
            />
          ))}
          <textarea
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            placeholder="Add a comment"
            className="w-[60%]"
          />
          <button onClick={handleAddComment} className='py-3 px-6 ml-4 my-4 w-64 bg-readrepurple-5 rounded-md'>Comment</button>
        </section>
      </div>
    </article>
  );
};

export default ClientBlogPost;