import React from 'react';

const PostPreview = ({ post }) => (
  <div className="post">
    <h2>{post.title}</h2>
    <p>{post.body}</p>
  </div>
);

export default PostPreview;
