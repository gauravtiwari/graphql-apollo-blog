import gql from 'graphql-tag';

const CurrentUserQuery = gql` query getLoggedInUser {
  current_user {
    id,
    name,
    email,
  }
}
`;

export default CurrentUserQuery;
