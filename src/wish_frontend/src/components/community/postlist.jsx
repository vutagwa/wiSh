import React, { useEffect, useState } from 'react';
import communityHubActor from '../../../../dfx/index2';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await communityHubActor.getPosts();
      setPosts(posts);
    };
    fetchPosts();
  }, []);

  const handleUpvote = async (id) => {
    await communityHubActor.upvote(id);
    const updatedPosts = await communityHubActor.getPosts();
    setPosts(updatedPosts);
  };

  const handleDownvote = async (id) => {
    await communityHubActor.downvote(id);
    const updatedPosts = await communityHubActor.getPosts();
    setPosts(updatedPosts);
  };

  return (
    <div>
      <h1>Community Posts</h1>
      {posts.map(post => (
        <div key={post.id}>
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
