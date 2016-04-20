import context from './context';
import ComponentRegistery from './componentRegistry';
import serverRenderComponent from './serverRenderComponent'

const ctx = context();
ctx.reactComponent = {
	// Register the components to a Javascript Map()
	register(components) {
		return ComponentRegistery.register(components);
	},

  // Server render component
  serverRenderReactComponent(options) {
    return serverRenderComponent(options);
  },

	// Retrive component object from Map()
	getComponent(name) {
		return ComponentRegistery.get(name);
	},
};

export default ctx.reactComponent;
