import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, Link } from 'react-router-dom'; // Import new tools
import './App.css';

// Component for the Homepage (list of posts)
function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // 1. Add a new state for loading

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const backendUrl = 'https://brownmikesbrand-blog.onrender.com';
        const response = await axios.get(`${backendUrl}/api/posts`);
        setPosts(response.data);
      } catch (err) {
        console.error("There was an error fetching the posts", err);
      } finally {
        setLoading(false); // 2. When the fetch is done, set loading to false
      }
    };
    fetchPosts();
  }, []);

  // 3. If we are loading, show a simple message
  if (loading) {
    return <main style={{ padding: '20px' }}><p>Loading posts...</p></main>;
  }

  // 4. If not loading, show the posts (or the 'no posts' message)
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