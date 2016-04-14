import React from 'react';

const PostPreview = ({ post }) => (
  <div className="post">
    <h2>
    	<a href={post.url}>
    		{post.title}
    	</a>
    </h2>
    <p>{post.body}</p>
  </div>
);

export default PostPreview;
