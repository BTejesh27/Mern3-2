import React from 'react';
import { Pencil, Trash2, Shield } from 'lucide-react';
import { Post } from '../types';

interface PostListProps {
  posts: Post[];
  onEdit: (post: Post) => void;
  onDelete: (id: number) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <div 
          key={post.id} 
          className="bg-gray-800 rounded-lg shadow-xl p-6 flex flex-col border border-cyan-500/30 backdrop-blur-sm hover:transform hover:scale-105 transition-all duration-200"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1538370965046-79c0d6907d47?w=400&q=80)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'overlay'
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Shield className="text-cyan-400" size={30} />
            <h2 className="text-xl font-bold text-cyan-300 line-clamp-2">{post.title}</h2>
          </div>
          <p className="text-cyan-100 mb-4 flex-grow line-clamp-3">{post.body}</p>
          <div className="flex justify-end space-x-2 pt-4 border-t border-cyan-500/30">
            <button
              onClick={() => onEdit(post)}
              className="p-2 text-cyan-400 hover:bg-cyan-900/50 rounded-full transition-colors"
              title="Edit Quest"
            >
              <Pencil size={25} />
            </button>
            <button
              onClick={() => onDelete(post.id)}
              className="p-2 text-red-400 hover:bg-red-900/50 rounded-full transition-colors"
              title="Delete Quest"
            >
              <Trash2 size={25} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;