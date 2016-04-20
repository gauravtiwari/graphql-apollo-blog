import React from 'react';
import PostPreview from './postPreview';
import PostQuery from './postQuery';
import { connect } from 'react-apollo';

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
      postPreview = <PostPreview key={post.result.post.id} post={post.result.post} />;
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
    post: new PostQuery({id: ownProps.hydrated.id}),
  };
};

const PostWithData = connect({
  mapQueriesToProps,
})(PostsShowComponent);

export default PostWithData;
