/*
	Expose all components to { window or global }
*/

// Utils
import reactComponent from './utils/reactComponent';

// Components/Views : Setup in order as Rails views
import PostsIndexComponent from './components/posts/index';
import PostsShowComponent from './components/posts/show';
import NavBar from './components/shared/navbar';

// Use the registered name in Rails Views as component names
export default function registerComponent() {
  reactComponent.register({
    PostsIndexComponent,
    PostsShowComponent,
    NavBar,
  });
}
