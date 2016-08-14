import gql from 'graphql-tag';

const PostsQuery = gql` query getPosts($page: Int!) {
  posts_count,
  posts(page: $page) {
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
