import React from 'react';
import ApolloClient from 'apollo-client';
import PostPreview from './postPreview';
import PostsQuery from './query';

let runApolloTimeout;

const client = new ApolloClient();
const postsQuery = new PostsQuery({first: 80});

class PostsIndexComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: props.posts,
			server: true,
		};
	}

	componentWillUnmount() {
		clearTimeout(runApolloTimeout);
	}

	componentDidMount() {
		runApolloTimeout = setTimeout(() => {
			this.runApolloQuery();
		}, 10000);
	}

	runApolloQuery() {
		const handle = client.query(
			postsQuery
		);
		handle.then((graphQLResult) => {
		  const { errors, data } = graphQLResult;

		  if (data) {
		  	this.setState({
		  		posts: data.posts,
		  		server: false
		  	});
		  }

		  if (errors) {
		    console.log('got some GraphQL execution errors', errors);
		  }
		});
	}

	render() {
		const postList = this.state.posts.map((post) => {
			return <PostPreview key={post.id} post={post} />;
		});

		const text = this.state.server ? 'Loaded from server' : 'Loaded via Graphql'

		return(
			<div className="postsList">
				<h1> List of Posts: {text} </h1>
				<hr />
				{postList}
			</div>
		);
	}
}

module.exports = PostsIndexComponent;
