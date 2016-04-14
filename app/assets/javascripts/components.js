// ES6 imports
import PostsIndexComponent from './components/posts/index.es6.js';
import $ from 'jquery';
import App from './app';
import currentUser from './current_user';
import Environment from './environment';

// Expose components to global scope
App.PostsIndexComponent = PostsIndexComponent;
App.currentUser = currentUser;
App.Environment = Environment;
