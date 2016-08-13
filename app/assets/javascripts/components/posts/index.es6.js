import React from 'react';
import PostsQuery from './postsQuery';
import { graphql } from 'react-apollo';

import { ListItem, List } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { darkBlack } from 'material-ui/styles/colors';

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Turbolinks from 'turbolinks';

import App from '../../helpers/app.es6.js';
const AppInstance = new App;

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

class PostsIndexComponent extends React.Component {
  constructor(props) {
    super(props);
    this.loadMore = this.loadMore.bind(this);
    this.state = {
      loading: false,
      page: 0,
      start: 0,
      fetching: false,
    };
  }

  getChildContext() {
    return {
      muiTheme: getMuiTheme(baseTheme),
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.loadMore);
  }

  _showPost(id) {
    Turbolinks.visit(`/posts/${id}`);
  }

  loadMore() {
    if (AppInstance.scrolledToBottom() && !this.props.data.loading) {
      this.props.data.fetchMore({
        variables: { start: this.props.data.variables.start + 20 },
        updateQuery: (oldProps, { newProps }) => {
          const newPosts = newProps.data.posts;
          return {
            posts: [...oldProps.posts, ...newPosts],
          };
        },
      });
    }
  }

  render() {
    const { data } = this.props;
    let postList;

    if (data.loading) {
      postList = 'Loading...';
    } else {
      postList = data.posts.map((post) => {
        return (
          <ListItem
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
              <span
                className="count"
                style={metaItemStyles}
              >
                Comments: {post.comments_count}
              </span>
            </div>
          </ListItem>
        );
      });
    }

    return (
      <div className="postsList">
        <h1>List of Posts</h1>
        <hr/>
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

PostsIndexComponent.propTypes = {
  data: React.PropTypes.object.isRequired,
};

const PostsWithData = graphql(PostsQuery, {
  options: () => ({
    variables: {
      first: 20,
      start: 0,
    },
  }),
})(PostsIndexComponent);

export default PostsWithData;
