import React, { useState } from 'react';

const CommunityHub = () => {
  const [posts, setPosts] = useState([
    {
        id: 1,
        title: 'Lorem ipsum dolor',
        content: 'JLorem ipsum dolor sit amet consectetur adipisicing elit. Autem, deleniti sapiente? Numquam reprehenderit officiis, nihil dolore est soluta, saepe placeat odio sit maiores tenetur. Vitae sequi nemo laudantium voluptatibus magni.',
      comments: [
       ],
    },
    {
        id: 2,
      title: 'Lorem ipsum dolor',
      content: 'JLorem ipsum dolor sit amet consectetur adipisicing elit. Autem, deleniti sapiente? Numquam reprehenderit officiis, nihil dolore est soluta, saepe placeat odio sit maiores tenetur. Vitae sequi nemo laudantium voluptatibus magni.',comments: [
       ],
    },
    {
        id: 3,
      title: 'Lorem ipsum dolor',
      content: 'JLorem ipsum dolor sit amet consectetur adipisicing elit. Autem, deleniti sapiente? Numquam reprehenderit officiis, nihil dolore est soluta, saepe placeat odio sit maiores tenetur. Vitae sequi nemo laudantium voluptatibus magni.',
      comments: [
        
        ],
    },
    {
        id: 4,
      title: 'Lorem ipsum dolor',
      content: 'JLorem ipsum dolor sit amet consectetur adipisicing elit. Autem, deleniti sapiente? Numquam reprehenderit officiis, nihil dolore est soluta, saepe placeat odio sit maiores tenetur. Vitae sequi nemo laudantium voluptatibus magni.',
      comments: [
        ],
    },
    {
        id: 5,
      title: 'Lorem ipsum dolor',
      content: 'JLorem ipsum dolor sit amet consectetur adipisicing elit. Autem, deleniti sapiente? Numquam reprehenderit officiis, nihil dolore est soluta, saepe placeat odio sit maiores tenetur. Vitae sequi nemo laudantium voluptatibus magni.',
      comments: [
        ],
    },
    {
        id: 6,
      title: 'Lorem ipsum dolor',
      content: 'JLorem ipsum dolor sit amet consectetur adipisicing elit. Autem, deleniti sapiente? Numquam reprehenderit officiis, nihil dolore est soluta, saepe placeat odio sit maiores tenetur. Vitae sequi nemo laudantium voluptatibus magni.',
      comments: [
        ],
    },
    {
        id: 7,
      title: 'Lorem ipsum dolor',
      content: 'JLorem ipsum dolor sit amet consectetur adipisicing elit. Autem, deleniti sapiente? Numquam reprehenderit officiis, nihil dolore est soluta, saepe placeat odio sit maiores tenetur. Vitae sequi nemo laudantium voluptatibus magni.',
      comments: [
       ],
    },
    {
        id: 8,
      title: 'Lorem ipsum dolor',
      content: 'JLorem ipsum dolor sit amet consectetur adipisicing elit. Autem, deleniti sapiente? Numquam reprehenderit officiis, nihil dolore est soluta, saepe placeat odio sit maiores tenetur. Vitae sequi nemo laudantium voluptatibus magni.',
      comments: [
        ],
    },
  ]);

  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newComment, setNewComment] = useState({ postId: null, text: '' });
  const [balance, setBalance] = useState(0);

  const handleNewPost = (e) => {
    e.preventDefault();
    if (newPostTitle && newPostContent) {
      const newPost = {
        id: posts.length + 1,
        title: newPostTitle,
        content: newPostContent,
        comments: [],
      };
      setPosts([...posts, newPost]);
      setNewPostTitle('');
      setNewPostContent('');
      setBalance(balance + 5); // Add 5 shillings for a new post
    }
  };

  const handleCommentChange = (e, postId) => {
    setNewComment({ ...newComment, postId: postId, text: e.target.value });
  };

  const handleComment = (e, postId) => {
    e.preventDefault();
    const post = posts.find((post) => post.id === postId);
    if (post && newComment.text) {
      setPosts(
        posts.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              comments: [...post.comments, { id: post.comments.length + 1, text: newComment.text }],
            };
          }
          return post;
        })
      );
      setNewComment({ postId: null, text: '' });
      setBalance(balance + 2); // Add 2 shillings for a new comment
    }
  };

  return (
    <div className="community-feed-container">
      <div className="header">
        <h1 className="intro-header">Welcome to Wish</h1>
        <div className="wallet">
          <span className="wallet-icon">💰</span>
          <span className="wallet-balance">{balance} Shillings</span>
        </div>
      </div>
      <div className="intro-section">
        <p className="intro-text">
          Wish aggregates personal stories and events on social issues, raising awareness and promoting education. 
          By sharing informative resources and humanizing statistics, we empower users to drive change.
        </p>
      </div>
      <div className="feed">
        <form className="new-post-form" onSubmit={handleNewPost}>
          <input
            type="text"
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
            placeholder="What’s on your mind?"
            className="input-field"
          />
          <textarea
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder="Share your thoughts..."
            className="textarea-field"
          />
          <button type="submit" className="submit-button">Post</button>
        </form>
        <div className="posts-feed">
          {posts.length > 0 && (
            <div className="grid-container">
              {posts.map((post) => (
                <div key={post.id} className="post-card">
                  <h3 className="post-title">{post.title}</h3>
                  <p className="post-content">{post.content}</p>
                  <div className="post-comments">
                    {post.comments.length > 0 && (
                      <ul className="comments-list">
                        {post.comments.map((comment) => (
                          <li key={comment.id} className="comment-item">{comment.text}</li>
                        ))}
                      </ul>
                    )}
                    <form className="comment-form" onSubmit={(e) => handleComment(e, post.id)}>
                      <input
                        type="text"
                        value={newComment.postId === post.id ? newComment.text : ''}
                        onChange={(e) => handleCommentChange(e, post.id)}
                        placeholder="Add a comment..."
                        className="input-field"
                      />
                      <button type="submit" className="submit-button">Comment</button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunityHub;