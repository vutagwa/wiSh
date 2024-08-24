import React, { useEffect, useState } from 'react';
import communityHubActor from '../../../dfx/index2';

const CommunityHub = () => {
  const [posts, setPosts] = useState([]);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [content, setContent] = useState('');
  const [mediaUrl, setMediaUrl] = useState(''); // State for multimedia URL
  const [description, setDescription] = useState(''); // State for description
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false); // State to manage form visibility
  const [file, setFile] = useState(null); // State to manage file input

  useEffect(() => {
    const savedContent = localStorage.getItem('content') || '';
    const savedMediaUrl = localStorage.getItem('mediaUrl') || '';
    const savedDescription = localStorage.getItem('description') || '';

    setContent(savedContent);
    setMediaUrl(savedMediaUrl);
    setDescription(savedDescription);

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
  }, []);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!content && !file) {
      setError('Content or media file is required.');
      return;
    }
    try {
      let mediaUrl = '';
      if (file) {
        // Upload file and get the URL (this depends on your backend implementation)
        // Example: const result = await uploadFile(file);
        // mediaUrl = result.fileUrl;
      }

      const result = await communityHubActor.createPost(content, mediaUrl, description);
      setMessage(result);
      setContent('');
      setMediaUrl('');
      setDescription('');
      setFile(null);
      localStorage.removeItem('content');
      localStorage.removeItem('mediaUrl');
      localStorage.removeItem('description');
      const updatedPosts = await communityHubActor.getPosts();
      setPosts(updatedPosts);
      setError('');
      setShowForm(false); // Hide form after successful post
    } catch (error) {
      console.error('Error creating post:', error);
      setError('Failed to create post. Please try again.');
    }
  };

  const handleSaveDraft = () => {
    localStorage.setItem('content', content);
    localStorage.setItem('mediaUrl', mediaUrl);
    localStorage.setItem('description', description);
  };

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
        // Create a URL for the selected file
        setMediaUrl(URL.createObjectURL(file));
        setFile(file);
      } else {
        setError('Please upload an image or video file.');
        e.target.value = ''; // Clear the file input
      }
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
        <button className="create-post-btn" onClick={handleShowForm}>
          {showForm ? 'Hide Post Form' : 'Create Post'}
        </button>
      </div>

      {showForm && (
        <div className="create-post-section">
          <h2>Create a Post</h2>
          <form onSubmit={handleCreatePost}>
            <div>
              <label>Content:</label>
              <textarea value={content} onChange={(e) => setContent(e.target.value)} />
            </div>
            <div className="media-section">
              <label>Media (optional):</label>
              <input 
                type="file" 
                accept="image/*,video/*" 
                onChange={handleFileChange} 
              />
              {mediaUrl && (
                <div className="preview">
                  {mediaUrl.endsWith('.mp4') ? (
                    <video src={mediaUrl} controls />
                  ) : (
                    <img src={mediaUrl} alt="Post media preview" />
                  )}
                </div>
              )}
            </div>
            <div>
              <label>Description:</label>
              <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Enter a description (optional)" 
              />
            </div>
            {error && <p className="error">{error}</p>}
            {message && <p className="message">{message}</p>}
            <button type="submit">Create Post</button>
            <button type="button" onClick={handleSaveDraft}>Save as Draft</button>
          </form>
        </div>
      )}

      <div className="posts-section">
        <h1>Community Posts</h1>
        {error && <p className="error">{error}</p>}
        {posts.map(post => (
          <div key={post.id} className="post">
            <p>{post.content}</p>
            {post.mediaUrl && (
              <div className="media">
                {post.mediaUrl.endsWith('.mp4') ? (
                  <video src={post.mediaUrl} controls />
                ) : (
                  <img src={post.mediaUrl} alt="Post media" />
                )}
              </div>
            )}
            {post.description && <p>{post.description}</p>}
            <button onClick={() => handleUpvote(post.id)}>Upvote ({post.upvotes})</button>
            <button onClick={() => handleDownvote(post.id)}>Downvote ({post.downvotes})</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityHub;
