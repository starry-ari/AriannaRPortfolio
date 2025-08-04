import React, { useState, useEffect } from 'react';

export default function Contact() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/api/timeline_post')
      .then(res => res.json())
      .then(data => setPosts(data.timeline_posts || []));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    fetch('/api/timeline_post', {
      method: 'POST',
      body: formData,
    })
    .then(res => res.json())
    .then(newPost => {
      setPosts([newPost, ...posts]);
      e.target.reset();
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Name:</h3>
        <input name="name" required />
        <h3>Email:</h3>
        <input name="email" type="email" required />
        <h3>Content:</h3>
        <input name="content" required />
        <button type="submit">Submit</button>
      </form>

      <h2>Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <b>{post.name}</b> ({post.email}): {post.content}
            <br />
            <small>{new Date(post.created_at).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
