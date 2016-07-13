import gql from 'graphql-tag';

class PostsQuery {
  constructor(variables) {
    const query = {
    query: gql`
      query getPosts($first: Int!) {
        posts(first: $first) {
          id,
          title,
          body,
          url,
          user {
            id,
            name,
            email,
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
