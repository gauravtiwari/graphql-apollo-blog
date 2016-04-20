// ES6 imports
import PostsIndexComponent from './components/posts/index.es6.js';
import $ from 'jquery';
import App from './app';
import currentUser from './current_user';
import Environment from './environment';

App.setTimeout = null;

// Expose components to global scope
App.PostsIndexComponent = PostsIndexComponent;
App.currentUser = currentUser;
App.Environment = Environment;

import ApolloClient from 'apollo-client';
import { Provider } from 'react-apollo';
const client = new ApolloClient();


document.addEventListener("turbolinks:load", function() {
  if(document.getElementById('posts') !== null) {
    ReactDOM.render(
      <Provider client={client}>
        <PostsIndexComponent />
      </Provider>,
      document.getElementById('posts')
    );
  }
});
