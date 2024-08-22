import React from 'react';
import CreatePost from './community/createpost';
import PostList from './community/postlist';

function CommunityHub() {
  return (
    <div>
      <CreatePost />
      <PostList />
    </div>
  );
}

export default CommunityHub;
