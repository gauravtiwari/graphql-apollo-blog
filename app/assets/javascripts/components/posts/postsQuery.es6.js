import gql from 'graphql-tag';

const PostsQuery = gql` query getPosts($page: Int!) {
  total_pages,
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
