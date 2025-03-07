import React from 'react';
import { Pencil, Trash2, BookOpen } from 'lucide-react';
import { Post, Theme } from '../types';

interface PostListProps {
  posts: Post[];
  onEdit: (post: Post) => void;
  onDelete: (id: number) => void;
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

const PostList: React.FC<PostListProps> = ({ posts, onEdit, onDelete, themeColors }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {posts.map((post) => (
        <div 
          key={post.id} 
          className={`bg-white rounded-lg shadow-xl p-4 sm:p-6 flex flex-col border ${themeColors.border} hover:transform hover:scale-102 transition-all duration-200`}
        >
          <div className="flex items-start gap-2 mb-3">
            <BookOpen className={`${themeColors.text} flex-shrink-0 w-5 h-5`} />
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 line-clamp-2">{post.title}</h2>
          </div>
          <p className="text-gray-600 mb-4 flex-grow line-clamp-3">{post.body}</p>
          <div className={`flex justify-end space-x-2 pt-4 border-t ${themeColors.border}`}>
            <button
              onClick={() => onEdit(post)}
              className={`p-2 ${themeColors.text} hover:${themeColors.accent} hover:text-white rounded-full transition-colors`}
              title="Edit Post"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(post.id)}
              className="p-2 text-red-600 hover:bg-red-500 hover:text-white rounded-full transition-colors"
              title="Delete Post"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;