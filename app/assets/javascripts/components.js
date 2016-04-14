// ES6 imports
import PostsIndexComponent from './components/posts/index.es6.js';

// Setup a global app scope
var app = window.app = global.app = {};

// Expose components to global scope
app.PostsIndexComponent = PostsIndexComponent;
