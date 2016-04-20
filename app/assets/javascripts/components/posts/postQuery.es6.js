class postQuery {
  constructor(variables) {
    const query = {
      query: `
        query getPost($id: Int!) {
          post(id: $id) {
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

export default postQuery;
