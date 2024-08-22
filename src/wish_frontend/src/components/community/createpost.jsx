import React, { useState } from 'react';
import communityHubActor from '../../../../dfx/index2';

const CreatePost = () => {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await communityHubActor.createPost(author, content);
    setAuthor('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Author:</label>
        <input value={author} onChange={(e) => setAuthor(e.target.value)} />
      </div>
      <div>
        <label>Content:</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      </div>
      <button type="submit">Create Post</button>
    </form>
  );
};

export default CreatePost;
