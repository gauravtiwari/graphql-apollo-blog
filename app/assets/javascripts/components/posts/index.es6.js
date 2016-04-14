import React from 'react';
import ApolloClient from 'apollo-client';
import PostPreview from './postPreview';

const client = new ApolloClient();

const handle = client.watchQuery({
  query: `
    query getPosts($first: Int!) {
			posts {
				id
				title,
				body,
				user {
					id,
					name,
					email
				}
			}
  }
  `,
  variables: {
  	first: 20,
  },
  forceFetch: false,
  returnPartialData: true,
});

class PostsIndexComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: []
		}
		this.watchQueryResult();
	}

	watchQueryResult() {
		handle.onResult((graphQLResult) => {
		  const { errors, data } = graphQLResult;

		  if (data) {
		  	this.setState({
		  		posts: data.posts,
		  	})
		  }

		  if (errors) {
		    console.log('got some GraphQL execution errors', errors);
		  }
		});
	}

	render() {
		const postList = this.state.posts.map((post) => {
			return <PostPreview key={post.id} post={post} />
		});
		return(
			<div className="postsList">
				<h1> List of Posts </h1>
				<hr />
				{postList}
			</div>
		);
	}
}

module.exports = PostsIndexComponent;
