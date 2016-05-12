import gql from 'apollo-client/gql';
class postQuery {
  constructor(variables) {
    const query = {
      query: gql`
        query getLoggedInUser {
          current_user {
            id,
            name,
            email,
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

export default postQuery;
