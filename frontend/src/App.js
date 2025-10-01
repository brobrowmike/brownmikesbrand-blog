import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';

// Component for the Homepage (list of posts)
function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const backendUrl = 'https://brownmikesbrand-blog.onrender.com';
        const response = await axios.get(`${backendUrl}/api/posts`);
        setPosts(response.data);
      } catch (err) {
        console.error("There was an error fetching the posts", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return <main style={{ padding: '20px' }}><p>Loading posts...</p></main>;
  }

  return (
    <main style={{ padding: '20px' }}>
      {posts.length > 0 ? (
        posts.map(post => (
          <div key={post._id} style={{ border: '1px solid gray', borderRadius: '8px', margin: '20px auto', padding: '20px', maxWidth: '700px', textAlign: 'left', backgroundColor: '#3c4049' }}>
            <Link to={`/posts/${post._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <h3>{post.title}</h3>
            </Link>
            <p style={{ color: 'lightgray' }}>by {post.author}</p>
          </div>
        ))
      ) : (
        <p>No posts yet... but the journey is just beginning.</p>
      )}
    </main>
  );
}

// Placeholder for the Single Post Page
function PostPage() {
  return (
    <main style={{ padding: '20px', textAlign: 'left' }}>
      <h2>Single Post Page</h2>
      <p>This is where the full content of an article will go.</p>
      <Link to="/">Back to Home</Link>
    </main>
  );
}

// Main App component now handles routing
function App() {
  return (
    <div className="App" style={{ backgroundColor: '#282c34', color: 'white', minHeight: '100vh' }}>
      <header style={{ padding: '20px', textAlign: 'center' }}>
        <h1>The Balanced Grind</h1>
        <h2>- Brownmikes Brand -</h2>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts/:postId" element={<PostPage />} />
      </Routes>
    </div>
  );
}

export default App; // This was the missing line