import React, { useState } from 'react';
import { useWishCoins } from './WishCoinsContext';
import { fetchWishCoinsFromBackend } from '../../dfx_generates/api';

const CommunityHub = () => {
    const { wishCoins, updateWishCoins } = useWishCoins();
    const [posts, setPosts] = useState([
        {
            id: 1,
            title: 'Lorem ipsum dolor',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, deleniti sapiente? Numquam reprehenderit officiis, nihil dolore est soluta, saepe placeat odio sit maiores tenetur. Vitae sequi nemo laudantium voluptatibus magni.',
            comments: [],
        },
        {
            id: 2,
            title: 'Lorem ipsum dolor',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, deleniti sapiente? Numquam reprehenderit officiis, nihil dolore est soluta, saepe placeat odio sit maiores tenetur. Vitae sequi nemo laudantium voluptatibus magni.',
            comments: [],
        },
        {
          id: 3,
          title: 'Lorem ipsum dolor',
          content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, deleniti sapiente? Numquam reprehenderit officiis, nihil dolore est soluta, saepe placeat odio sit maiores tenetur. Vitae sequi nemo laudantium voluptatibus magni.',
          comments: [],
      },{
        id: 4,
        title: 'Lorem ipsum dolor',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, deleniti sapiente? Numquam reprehenderit officiis, nihil dolore est soluta, saepe placeat odio sit maiores tenetur. Vitae sequi nemo laudantium voluptatibus magni.',
        comments: [],
    },{
      id: 5,
      title: 'Lorem ipsum dolor',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, deleniti sapiente? Numquam reprehenderit officiis, nihil dolore est soluta, saepe placeat odio sit maiores tenetur. Vitae sequi nemo laudantium voluptatibus magni.',
      comments: [],
  },{
    id: 6,
    title: 'Lorem ipsum dolor',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, deleniti sapiente? Numquam reprehenderit officiis, nihil dolore est soluta, saepe placeat odio sit maiores tenetur. Vitae sequi nemo laudantium voluptatibus magni.',
    comments: [],
},{
  id: 7,
  title: 'Lorem ipsum dolor',
  content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, deleniti sapiente? Numquam reprehenderit officiis, nihil dolore est soluta, saepe placeat odio sit maiores tenetur. Vitae sequi nemo laudantium voluptatibus magni.',
  comments: [],
},{
  id: 8,
  title: 'Lorem ipsum dolor',
  content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, deleniti sapiente? Numquam reprehenderit officiis, nihil dolore est soluta, saepe placeat odio sit maiores tenetur. Vitae sequi nemo laudantium voluptatibus magni.',
  comments: [],
},
    ]);

    const [newPostTitle, setNewPostTitle] = useState('');
    const [newPostContent, setNewPostContent] = useState('');
    const [newComment, setNewComment] = useState({ postId: null, text: '' });

    const handleNewPost = async (e) => {
        e.preventDefault();
        if (newPostTitle && newPostContent) {
            const newPost = {
                id: posts.length + 1,
                title: newPostTitle,
                content: newPostContent,
                comments: [],
            };
            setPosts((prevPosts) => [...prevPosts, newPost]);
            setNewPostTitle('');
            setNewPostContent('');
            try {
                await updateWishCoins(); // Update balance
            } catch (error) {
                console.error('Failed to update wish coins:', error);
            }
        }
    };

    const handleCommentChange = (e, postId) => {
        setNewComment({ ...newComment, postId, text: e.target.value });
    };

    const handleComment = (e, postId) => {
        e.preventDefault();
        if (newComment.text) {
            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post.id === postId
                        ? {
                              ...post,
                              comments: [...post.comments, { id: post.comments.length + 1, text: newComment.text }],
                          }
                        : post
                )
            );
            setNewComment({ postId: null, text: '' });
            try {
                updateWishCoins(); // Update balance
            } catch (error) {
                console.error('Failed to update wish coins:', error);
            }
        }
    };

    return (
        <div className="community-feed-container">
            <div className="header">
                <h1 className="intro-header">Welcome to Wish</h1>
                <div className="wallet">
                    <span className="wallet-icon">💰</span>
                    <span className="wallet-balance">{wishCoins} Wish Coins</span>
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
