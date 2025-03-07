import React, { useState, useEffect } from 'react';
import { Plus, Sword } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import { Post, PostInput } from './types';

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | undefined>();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!response.ok) throw new Error('Failed to fetch posts');
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (postInput: PostInput) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(postInput),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      if (!response.ok) throw new Error('Failed to create post');
      const newPost = await response.json();
      setPosts([newPost, ...posts]);
      setShowForm(false);
      toast.success('Post created successfully! 🎮');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create post';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleUpdate = async (postInput: PostInput) => {
    if (!editingPost) return;
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${editingPost.id}`,
        {
          method: 'PUT',
          body: JSON.stringify(postInput),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      );
      if (!response.ok) throw new Error('Failed to update post');
      const updatedPost = await response.json();
      setPosts(posts.map((p) => (p.id === editingPost.id ? updatedPost : p)));
      setEditingPost(undefined);
      toast.success('Post updated successfully! 🎯');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update post';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete post');
      setPosts(posts.filter((p) => p.id !== id));
      toast.success('Post deleted successfully! 💥');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete post';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-xl text-cyan-400 animate-pulse flex items-center gap-2">
          <Sword className="animate-bounce" />
          Loading your quest log...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-xl text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 bg-[url('https://images.unsplash.com/photo-1538370965046-79c0d6907d47?w=1920&q=80')] bg-cover bg-fixed bg-center bg-blend-overlay p-6">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-cyan-400 font-gaming">Quest Log</h1>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-cyan-500/50"
          >
            <Plus size={20} />
            New Quest
          </button>
        </div>

        {(showForm || editingPost) && (
          <div className="mb-8">
            <PostForm
              post={editingPost}
              onSubmit={editingPost ? handleUpdate : handleCreate}
              onCancel={() => {
                setShowForm(false);
                setEditingPost(undefined);
              }}
            />
          </div>
        )}

        <PostList
          posts={posts}
          onEdit={setEditingPost}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default App