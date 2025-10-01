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

// Upgraded Single Post Page component
function PostPage() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { postId } = useParams(); // 1. Get the postId from the URL

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const backendUrl = 'https://brownmikesbrand-blog.onrender.com';
        // 2. Use the postId to ask the backend for one specific post
        const response = await axios.get(`${backendUrl}/api/posts/${postId}`);
        setPost(response.data);
      } catch (err) {
        console.error("There was an error fetching the post", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]); // 3. Re-run this if the postId ever changes

  if (loading) {
    return <main style={{ padding: '20px' }}><p>Loading post...</p></main>;
  }

  if (!post) {
    return <main style={{ padding: '20px' }}><p>Post not found.</p></main>;
  }

  // 4. Display the full title and content
  return (
    <main style={{ padding: '20px', maxWidth: '800px', margin: '20px auto', textAlign: 'left', lineHeight: '1.6' }}>
      <h1>{post.title}</h1>
      <p style={{ color: 'lightgray', fontStyle: 'italic' }}>by {post.author}</p>
      <div style={{ marginTop: '40px', whiteSpace: 'pre-wrap' }}>
        {post.content}
      </div>
      <Link to="/" style={{ display: 'block', marginTop: '40px', color: '#61dafb' }}>← Back to Home</Link>
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