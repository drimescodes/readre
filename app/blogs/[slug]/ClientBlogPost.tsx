// app/blogs/[slug]/ClientBlogPost.tsx
"use client";

import { useState } from 'react';
import Comment from '@/components/Comment';
import LikeButton from '@/components/LikeButton';

interface ClientBlogPostProps {
  slug: string;
}

const ClientBlogPost = ({ slug }: ClientBlogPostProps) => {
  const [comments, setComments] = useState([
    {
      id: 1,
      text: 'Great post!',
      author: 'Alice',
      replies: [
        { id: 3, text: 'Yeah!', author: 'Bob', liked: false }
      ],
      liked: false,
    },
    {
      id: 2,
      text: 'Thanks for sharing!',
      author: 'Bob',
      replies: [],
      liked: false,
    },
  ]);
  
  const [newCommentText, setNewCommentText] = useState('');

  const handleAddComment = () => {
    setComments([...comments, { id: comments.length + 1, text: newCommentText, author: 'You', replies: [], liked: false }]);
    setNewCommentText('');
  };

  const handleDeleteComment = (id: number) => {
    setComments(comments.filter(comment => comment.id !== id));
  };

  const handleEditComment = (id: number, text: string) => {
    setComments(comments.map(comment => comment.id === id ? { ...comment, text } : comment));
  };

  const handleReplyComment = (parentId: number, text: string) => {
    setComments(comments.map(comment => 
      comment.id === parentId 
        ? {
            ...comment,
            replies: [...comment.replies, { id: Date.now(), text, author: 'You', liked: false }]
          } 
        : comment
    ));
  };

  const handleLikeComment = (id: number) => {
    setComments(comments.map(comment => comment.id === id ? { ...comment, liked: !comment.liked } : comment));
  };

  return (
    <div>
      <h1>{slug}</h1>
      <p>Hey 2 2 1 2</p>
      <LikeButton />
      <div>
        <h2 className='pt-8'>Comments</h2>
        {comments.map(comment => (
  <Comment
    key={comment.id}
    {...comment}
    onDelete={handleDeleteComment}
    onEdit={handleEditComment}
    onReply={handleReplyComment}
    onLike={handleLikeComment}
    replies={comment.replies.map(reply => ({
      ...reply,
      onDelete: handleDeleteComment,
      onEdit: handleEditComment,
      onReply: handleReplyComment,
      onLike: handleLikeComment,
      replies: [], // Replies don't have their own replies
    }))}
  />
))}
        <textarea
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
          placeholder="Add a comment"
          className="w-full"
        />
        <button onClick={handleAddComment}>Comment</button>
      </div>
    </div>
  );
};

export default ClientBlogPost;
