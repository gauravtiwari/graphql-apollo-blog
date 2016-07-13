import React from 'react';
import PostsQuery from './postsQuery';
import { connect } from 'react-apollo';

import { ListItem, List } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { darkBlack } from 'material-ui/styles/colors';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const postsQuery = new PostsQuery({
  first: 20,
});

class PostsIndexComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  getChildContext() {
    return {
      muiTheme: getMuiTheme(baseTheme)
    };
  }

  _showPost(id) {
    Turbolinks.visit("/posts/" + id);
  }

  render() {
    const { data } = this.props;
    let postList;

    if (data.loading) {
      postList = "Loading...";
    } else {
      postList = data.posts.map((post) => {
      return <ListItem
              primaryText={post.title}
              key={post.id}
              onClick={this._showPost.bind(this, post.id)}
              secondaryText={
              <p>
              <span style={{color: darkBlack}}>{post.user.name}</span> --
              {post.body}
              </p>
              }
              secondaryTextLines={2}
            />;
      });
    }

    return(
      <div className="postsList">
        <h1>List of Posts</h1>
        <List>
          {postList}
        </List>
        <Divider inset={true} />
      </div>
    );
  }
}

PostsIndexComponent.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};


function mapQueriesToProps({ ownProps, state }) {
  return {
    data: postsQuery,
  };
};

const PostsWithData = connect({
  mapQueriesToProps,
})(PostsIndexComponent);

export default PostsWithData;
