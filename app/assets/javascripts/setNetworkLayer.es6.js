import ApolloClient, { createNetworkInterface } from 'apollo-client';
import App from './helpers/app.es6.js';
const AppInstance = new App;

// Send headers with network interface
const networkInterface = createNetworkInterface('/graphql', {
  credentials: 'same-origin',
  headers: {
    'X-CSRF-Token': AppInstance.csrfToken(),
  }
});

export default networkInterface;
