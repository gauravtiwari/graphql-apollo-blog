import context from './context';
import ComponentRegistery from './componentRegistry';

const ctx = context();
ctx.reactComponent = {
	// Register the components to a Javascript Map()
	register(components) {
		return ComponentRegistery.register(components);
	},

	// Retrive component object from Map()
	getComponent(name) {
		return ComponentRegistery.get(name);
	},
};

export default ctx.reactComponent;
