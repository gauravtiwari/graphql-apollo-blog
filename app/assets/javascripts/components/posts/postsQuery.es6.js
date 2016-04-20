class PostsQuery {
	constructor(variables) {
		const query = {
			query: `
		    query getPosts {
		  		posts {
		  			id
		  			title,
		  			body,
		  			url,
		  			user {
		  				id,
		  				name,
		  				email
		  			}
		  		}
		  	}
		  `,
			variables: variables,
			forceFetch: false,
			returnPartialData: false,
		};
		return query;
	}
}

export default PostsQuery;
