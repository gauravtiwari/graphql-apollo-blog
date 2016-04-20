import React from 'react';
import PostPreview from './postPreview';
import PostQuery from './postQuery';
import { connect } from 'react-apollo';

import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';

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
      postPreview = <Card>
                      <CardTitle
                        title={post.result.post.title}
                        subtitle={post.result.post.user.name}
                      />
                      <CardText>
                        {post.result.post.body}
                      </CardText>
                    </Card>;
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
