import React, { useState } from 'react';
import communityHubActor from '../../../../dfx/index2';

const CreatePost = () => {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!author || !content) {
      setError('Author and content are required.');
      return;
    }
    try {
      await communityHubActor.createPost(author, content);
      setAuthor('');
      setContent('');
      setError('');
    } catch (error) {
      console.error('Error creating post:', error);
      setError('Failed to create post. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: '20px' }}>
      <div>
        <label>Author:</label>
        <input value={author} onChange={(e) => setAuthor(e.target.value)} />
      </div>
      <div>
        <label>Content:</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Create Post</button>
    </form>
  );
};

export default CreatePost;
