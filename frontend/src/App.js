import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // In Codespaces, we need to find the backend's address dynamically
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
        const response = await axios.get('https://brownmikesbrand-blog.onrender.com/api/posts');
        setPosts(response.data);
      } catch (err) {
        console.error("There was an error fetching the posts", err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="App" style={{ backgroundColor: '#282c34', color: 'white', minHeight: '100vh' }}>
      <header style={{ padding: '20px', textAlign: 'center' }}>
        <h1>The Balanced Grind</h1>
        <h2>- Brownmikes Brand -</h2>
      </header>

      <main style={{ padding: '20px' }}>
        {posts.length > 0 ? (
          posts.map(post => (
            <div key={post._id} style={{ border: '1px solid gray', borderRadius: '8px', margin: '20px auto', padding: '20px', maxWidth: '700px', textAlign: 'left', backgroundColor: '#3c4049' }}>
              <h3>{post.title}</h3>
              <p style={{ color: 'lightgray' }}>by {post.author}</p>
            </div>
          ))
        ) : (
          <p>No posts yet... but the journey is just beginning.</p>
        )}
      </main>
    </div>
  );
}

export default App;