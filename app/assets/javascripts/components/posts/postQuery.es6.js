import gql from 'graphql-tag';

const postQuery = gql` query getPost($id: ID!) {
  post(id: $id) {
    id
    title,
    body,
    url,
    excerpt,
    comments_count,
    comments {
    id,
    body,
    created_at,
      user {
        id,
        name,
      }
    }
    user {
      id,
      name,
      email
    }
  }
}`;

export default postQuery;
