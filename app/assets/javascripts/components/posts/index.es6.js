import React from 'react';
import PostsQuery from './postsQuery';
import { connect } from 'react-apollo';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Colors from 'material-ui/lib/styles/colors';

const postsQuery = new PostsQuery({
  first: 20,
});

class PostsIndexComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  _showPost(id) {
    Turbolinks.visit("/posts/" + id);
  }

	render() {
    const { posts } = this.props;
    let postList;

    if (posts.loading) {
      postList = "Loading...";
    } else {
      postList = posts.result.posts.map((post) => {
        return <ListItem
            primaryText={post.title}
            key={post.id}
            onClick={this._showPost.bind(this, post.id)}
            secondaryText={
              <p>
                <span style={{color: Colors.darkBlack}}>{post.user.name}</span> --
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

function mapQueriesToProps({ ownProps, state }) {
  return {
    posts: postsQuery,
  };
};

const PostsWithData = connect({
  mapQueriesToProps,
})(PostsIndexComponent);

export default PostsWithData;
