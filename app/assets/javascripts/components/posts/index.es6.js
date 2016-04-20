import React from 'react';
import PostPreview from './postPreview';
import PostsQuery from './query';
import { connect } from 'react-apollo';

let runApolloTimeout;

const postsQuery = new PostsQuery({
	first: 20,
});

class PostsIndexComponent extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
    const { posts } = this.props;
    let postList;

    if (posts.loading) {
      postList = "Loading...";
    } else {
      postList = posts.result.posts.map((post) => {
        return <PostPreview key={post.id} post={post} />;
      });
    }

		return(
			<div className="postsList">
				<h1>List of Posts </h1>
        {postList}
			</div>
		);
	}
}

function mapQueriesToProps({ ownProps, state }) {
  return {
    posts: postsQuery,
  };
};

const PostsWithData = connect({
  mapQueriesToProps,
})(PostsIndexComponent);

export default PostsWithData;
