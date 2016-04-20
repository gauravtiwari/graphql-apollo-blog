import React from 'react';
import PostPreview from './postPreview';
import PostQuery from './postQuery';
import { connect } from 'react-apollo';

const postQuery = new PostsQuery({
  id: 20,
});

class PostsShowComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { post } = this.props;

    let postPreview;

    if (post.loading) {
      postPreview = "Loading...";
    } else {
      postPreview = <PostPreview key={post.result.id} post={post.result} />;
    }

    return(
      <div className="postsShow">
        {postPreview}
      </div>
    );
  }
}

function mapQueriesToProps({ ownProps, state }) {
  return {
    post: postQuery,
  };
};

const PostWithData = connect({
  mapQueriesToProps,
})(PostsShowComponent);

export default PostWithData;
