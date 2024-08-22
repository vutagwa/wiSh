import React, { useEffect, useState } from 'react';
import communityHubActor from '../../../../dfx/index2';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

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
    fetchPosts();
  }, []);

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
    <div style={{ margin: '20px' }}>
      <h1>Community Posts</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {posts.map(post => (
        <div key={post.id} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '10px' }}>
          <h2>{post.author}</h2>
          <p>{post.content}</p>
          <button onClick={() => handleUpvote(post.id)}>Upvote ({post.upvotes})</button>
          <button onClick={() => handleDownvote(post.id)}>Downvote ({post.downvotes})</button>
        </div>
      ))}
    </div>
  );
};

export default PostList;
