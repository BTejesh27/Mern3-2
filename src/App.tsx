import React, { useState, useEffect } from 'react';
import { Plus, Sword, Palette, Sparkles } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import { Post, PostInput, Theme, ThemeColors } from './types';

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | undefined>();
  const [theme, setTheme] = useState<Theme>('orange');
  const [rainbowActive, setRainbowActive] = useState(false);

  const themeColors: Record<Theme, ThemeColors> = {
    orange: {
      primary: 'from-orange-100/95 via-white/90 to-orange-50/95',
      accent: 'bg-orange-500',
      hover: 'hover:bg-orange-600',
      text: 'text-orange-600',
      border: 'border-orange-200',
      shadow: 'shadow-orange-500/20',
    },
    purple: {
      primary: 'from-purple-100/95 via-white/90 to-purple-50/95',
      accent: 'bg-purple-500',
      hover: 'hover:bg-purple-600',
      text: 'text-purple-600',
      border: 'border-purple-200',
      shadow: 'shadow-purple-500/20',
    },
    blue: {
      primary: 'from-blue-100/95 via-white/90 to-blue-50/95',
      accent: 'bg-blue-500',
      hover: 'hover:bg-blue-600',
      text: 'text-blue-600',
      border: 'border-blue-200',
      shadow: 'shadow-blue-500/20',
    },
    green: {
      primary: 'from-green-100/95 via-white/90 to-green-50/95',
      accent: 'bg-green-500',
      hover: 'hover:bg-green-600',
      text: 'text-green-600',
      border: 'border-green-200',
      shadow: 'shadow-green-500/20',
    },
    rainbow: {
      primary: 'from-orange-100/95 via-purple-100/90 to-blue-100/95',
      accent: 'bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500',
      hover: 'hover:from-orange-600 hover:via-purple-600 hover:to-blue-600',
      text: 'text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-purple-600 to-blue-600',
      border: 'border-orange-200',
      shadow: 'shadow-orange-500/20',
    },
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (rainbowActive) {
      const themes: Theme[] = ['orange', 'purple', 'blue', 'green'];
      let currentIndex = 0;
      
      const interval = setInterval(() => {
        currentIndex = (currentIndex + 1) % themes.length;
        setTheme(themes[currentIndex]);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [rainbowActive]);

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
      toast.success('Post created successfully! 🎨');
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
      toast.success('Post updated successfully! 🎨');
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
      toast.success('Post deleted successfully! 🎨');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete post';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${themeColors[theme].primary} flex items-center justify-center`}>
        <div className={`text-xl ${themeColors[theme].text} animate-pulse flex items-center gap-2`}>
          <Sword className="animate-bounce w-6 h-6" />
          Loading your posts...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${themeColors[theme].primary} flex items-center justify-center`}>
        <div className="text-xl text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80')] bg-cover bg-fixed bg-center">
      <div className={`min-h-screen bg-gradient-to-br ${themeColors[theme].primary} backdrop-blur-sm p-4 sm:p-6 animate-gradient-x transition-colors duration-1000`}>
        <Toaster position="top-right" />
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <h1 className={`text-3xl sm:text-4xl font-bold ${themeColors[theme].text} font-gaming`}>
              Posts Collection
            </h1>
            <div className="flex gap-3">
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => setRainbowActive(!rainbowActive)}
                  className={`w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500 flex items-center justify-center ${rainbowActive ? 'ring-2 ring-offset-2' : ''} transition-all duration-200 animate-rainbow-spin`}
                  title="Toggle rainbow mode"
                >
                  <Sparkles className="w-5 h-5 text-white" />
                </button>
                {!rainbowActive && (Object.keys(themeColors) as Theme[]).filter(t => t !== 'rainbow').map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`w-8 h-8 rounded-full ${themeColors[t].accent} ${theme === t ? 'ring-2 ring-offset-2' : ''} transition-all duration-200`}
                    title={`Switch to ${t} theme`}
                  />
                ))}
              </div>
              <button
                onClick={() => setShowForm(true)}
                className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 ${themeColors[theme].accent} text-white rounded-lg ${themeColors[theme].hover} transform hover:scale-105 transition-all duration-200 shadow-lg ${themeColors[theme].shadow}`}
              >
                <Plus className="w-5 h-5" />
                New Post
              </button>
            </div>
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
                theme={theme}
                themeColors={themeColors[theme]}
              />
            </div>
          )}

          <PostList
            posts={posts}
            onEdit={setEditingPost}
            onDelete={handleDelete}
            theme={theme}
            themeColors={themeColors[theme]}
          />
        </div>
      </div>
    </div>
  );
}

export default App;