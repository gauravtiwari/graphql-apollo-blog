import React from 'react';
import PostsQuery from './postsQuery';
import { connect } from 'react-apollo';
import serialize from 'serialize-javascript';

import { ListItem, List } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { darkBlack } from 'material-ui/styles/colors';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const titleStyles = {
  padding: '0',
  lineHeight: '1.2',
  fontSize: '20px',
  fontWeight: '400',
};

const contentStyles = {
  padding: '0',
  lineHeight: '1.5',
  fontSize: '18px',
  fontWeight: '300',
  color: '#777',
};

const listItemStyles = {
  borderBottom: '1px solid #f2f2f2',
};

const metaStyles = {
  marginTop: '10px',
};

const metaItemStyles = {
  marginRight: '10px',
  color: darkBlack,
};

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
    const { data, store } = this.props;
    const storeData = store && serialize(store.getState());
    let postList;

    if (data.loading) {
      postList = "Loading...";
    } else {
      postList = data.posts.map((post) => {
      return <ListItem
              key={post.id}
              style={listItemStyles}
              onClick={this._showPost.bind(this, post.id)}
            >
              <h1 style={titleStyles} className="title">{post.title}</h1>
              <div className="content" style={contentStyles}>
                {post.excerpt}
              </div>
              <div className="meta" style={metaStyles}>
                <span style={metaItemStyles}>By: {post.user.name}</span>
                <span className="count" style={metaItemStyles}>Comments: {post.comments_count}</span>
              </div>
            </ListItem>;
      });
    }

    return(
      <div className="postsList">
        <h1>List of Posts</h1>
        <hr/>
        <List>
          {postList}
        </List>
        <Divider inset={true} />
        <script dangerouslySetInnerHTML={{__html: `window.__data=${storeData};`}} charSet="UTF-8"/>
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
