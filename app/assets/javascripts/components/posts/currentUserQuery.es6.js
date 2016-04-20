class postQuery {
  constructor(variables) {
    const query = {
      query: `
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
