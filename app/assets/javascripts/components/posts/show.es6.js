import React from 'react';
import PostQuery from './postQuery';
import { graphql } from 'react-apollo';

import {
  Card,
  CardHeader,
  CardTitle,
  CardText,
} from 'material-ui/Card';

import Divider from 'material-ui/Divider';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


const commentStyle = {
  marginTop: '20px',
};

const titleStyle = {
  boxSizing: 'border-box',
  color: 'rgba(0, 0, 0, 0.541176)',
  fontSize: '20px',
  fontWeight: '500',
  lineHeight: '48px',
  width: '100%',
};

class PostsShowComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  getChildContext() {
    return {
      muiTheme: getMuiTheme(baseTheme),
    };
  }


  render() {
    const { data } = this.props;
    let postPreview;
    let comments;

    if (data.loading) {
      postPreview = 'Loading...';
    } else {
      postPreview = (
        <Card>
          <CardTitle
            title={data.post.title}
            subtitle={data.post.user.name}
          />
          <CardText>
            {data.post.body}
          </CardText>
        </Card>
      );
      comments = data.post.comments.map((comment) => (
        <Card key={comment.id} style={commentStyle}>
          <CardHeader
            title={comment.user.name}
            subtitle={`Posted: ${comment.created_at}`}
          />
          <CardText>
            {comment.body}
          </CardText>
        </Card>
      ));
    }

    return (
      <div className="postsShow">
        {postPreview}
        <Divider inset={true} />

        <h1 style={titleStyle}>Recent Comments</h1>
        <Divider inset={true} />

        <div>
          {comments}
        </div>
      </div>
    );
  }
}

PostsShowComponent.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

PostsShowComponent.propTypes = {
  data: React.PropTypes.object.isRequired,
};

const PostWithData = graphql(PostQuery, {
  options: (ownProps) => ({
    variables: {
      id: ownProps.post.id,
      first: 20,
      start: 0,
    },
  }),
})(PostsShowComponent);

export default PostWithData;
