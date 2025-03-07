import React, { useState, useEffect } from 'react';
import { Post, PostInput } from '../types';
import { Scroll, Send, X } from 'lucide-react';

interface PostFormProps {
  post?: Post;
  onSubmit: (post: PostInput) => void;
  onCancel: () => void;
}

const PostForm: React.FC<PostFormProps> = ({ post, onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
    }
  }, [post]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      body,
      userId: post?.userId || 1,
    });
    setTitle('');
    setBody('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg shadow-xl p-6 border border-cyan-500/30 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-6">
        <Scroll className="text-cyan-400" size={24} />
        <h2 className="text-2xl font-bold text-cyan-300">
          {post ? 'Edit Quest' : 'New Quest'}
        </h2>
      </div>
      
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-cyan-300 mb-1">
          Quest Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 bg-gray-700 border border-cyan-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-cyan-100 placeholder-gray-400"
          required
          placeholder="Enter your quest title..."
        />
      </div>
      
      <div className="mb-6">
        <label htmlFor="body" className="block text-sm font-medium text-cyan-300 mb-1">
          Quest Description
        </label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={4}
          className="w-full px-4 py-2 bg-gray-700 border border-cyan-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-cyan-100 placeholder-gray-400"
          required
          placeholder="Describe your quest..."
        />
      </div>
      
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center gap-2 px-4 py-2 text-gray-300 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
        >
          <X size={18} />
          Cancel
        </button>
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-2 text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-cyan-500/50"
        >
          <Send size={18} />
          {post ? 'Update Quest' : 'Create Quest'}
        </button>
      </div>
    </form>
  );
};

export default PostForm;