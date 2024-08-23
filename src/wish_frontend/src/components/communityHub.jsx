import React, { useEffect, useState } from 'react';
import communityHubActor from '../../../dfx/index2';

const CommunityHub = () => {
  const [posts, setPosts] = useState([]);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await communityHubActor.getPosts();
        setPosts(posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Failed to fetch posts. Please try again.');
      }
    };

    const fetchTokenBalance = async () => {
      try {
        const balance = await communityHubActor.getTokenBalance();
        setTokenBalance(balance);
      } catch (error) {
        console.error('Error fetching token balance:', error);
      }
    };

    fetchPosts();
    fetchTokenBalance();
  }, []); // Ensure the dependency array is empty

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!author || !content) {
      setError('Author and content are required.');
      return;
    }
    try {
      const result = await communityHubActor.createPost(author, content);
      setMessage(result);
      setAuthor('');
      setContent('');
      const updatedPosts = await communityHubActor.getPosts();
      setPosts(updatedPosts);
      setError('');
    } catch (error) {
      console.error('Error creating post:', error);
      setError('Failed to create post. Please try again.');
    }
  };

  const handleUpvote = async (id) => {
    try {
      await communityHubActor.upvote(id);
      const updatedPosts = await communityHubActor.getPosts();
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error upvoting post:', error);
      setError('Failed to upvote post. Please try again.');
    }
  };

  const handleDownvote = async (id) => {
    try {
      await communityHubActor.downvote(id);
      const updatedPosts = await communityHubActor.getPosts();
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error downvoting post:', error);
      setError('Failed to downvote post. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="header">
        <span>Token Balance: {tokenBalance} Wish Coins</span>
      </div>

      <div className="create-post-section">
        <h2>Create a Post</h2>
        <form onSubmit={handleCreatePost}>
          <div>
            <label>Author:</label>
            <input value={author} onChange={(e) => setAuthor(e.target.value)} />
          </div>
          <div>
            <label>Content:</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} />
          </div>
          {error && <p className="error">{error}</p>}
          {message && <p className="message">{message}</p>}
          <button type="submit">Create Post</button>
        </form>
      </div>

      <div className="posts-section">
        <h1>Community Posts</h1>
        {error && <p className="error">{error}</p>}
        {posts.map(post => (
          <div key={post.id} className="post">
            <h2>{post.author}</h2>
            <p>{post.content}</p>
            <button onClick={() => handleUpvote(post.id)}>Upvote ({post.upvotes})</button>
            <button onClick={() => handleDownvote(post.id)}>Downvote ({post.downvotes})</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityHub;
