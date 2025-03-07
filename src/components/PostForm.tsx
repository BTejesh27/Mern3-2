import React, { useState, useEffect } from 'react';
import { Post, PostInput, Theme } from '../types';
import { Scroll, Send, X } from 'lucide-react';

interface PostFormProps {
  post?: Post;
  onSubmit: (post: PostInput) => void;
  onCancel: () => void;
  theme: Theme;
  themeColors: {
    primary: string;
    accent: string;
    hover: string;
    text: string;
    border: string;
    shadow: string;
  };
}

const PostForm: React.FC<PostFormProps> = ({ post, onSubmit, onCancel, theme, themeColors }) => {
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
    <form onSubmit={handleSubmit} className={`bg-white rounded-lg shadow-xl p-4 sm:p-6 border ${themeColors.border} backdrop-blur-sm`}>
      <div className="flex items-center gap-2 mb-6">
        <Scroll className={`${themeColors.text} w-6 h-6 flex-shrink-0`} />
        <h2 className={`text-2xl font-bold ${themeColors.text}`}>
          {post ? 'Edit Post' : 'New Post'}
        </h2>
      </div>
      
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Post Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full px-4 py-2 bg-opacity-50 border ${themeColors.border} rounded-lg focus:outline-none focus:ring-2 ring-offset-2 ring-${theme}-500 text-gray-800 placeholder-gray-400`}
          required
          placeholder="Enter your post title..."
        />
      </div>
      
      <div className="mb-6">
        <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">
          Post Content
        </label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={4}
          className={`w-full px-4 py-2 bg-opacity-50 border ${themeColors.border} rounded-lg focus:outline-none focus:ring-2 ring-offset-2 ring-${theme}-500 text-gray-800 placeholder-gray-400`}
          required
          placeholder="Write your post content..."
        />
      </div>
      
      <div className="flex flex-col sm:flex-row justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center justify-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <X className="w-4 h-4" />
          Cancel
        </button>
        <button
          type="submit"
          className={`flex items-center justify-center gap-2 px-6 py-2 text-white ${themeColors.accent} rounded-lg ${themeColors.hover} transform hover:scale-105 transition-all duration-200 shadow-lg ${themeColors.shadow}`}
        >
          <Send className="w-4 h-4" />
          {post ? 'Update Post' : 'Create Post'}
        </button>
      </div>
    </form>
  );
};

export default PostForm;