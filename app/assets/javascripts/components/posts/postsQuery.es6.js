import gql from 'graphql-tag';

const PostsQuery = gql` query getPosts($first: Int!, $start: Int!) {
  posts(first: $first, start: $start) {
    id,
    title,
    body,
    excerpt,
    url,
    comments_count,
    user {
      id,
      name,
      email,
    }
  }
}`;

export default PostsQuery;
