/**
 * @param components { component1: component1, component2: component2, etc. }
 * Get the context, be it window or global
 * @returns { name, component, generatorFunction: boolean }
*/

import generatorFunction from './generatorFunction';
const _components = new Map();

export default {
  register(components) {
    Object.keys(components).forEach(name => {
      if (_components.has(name)) {
        console.warn('Called register for component that is already registered', name);
      }

      const component = components[name];
      if (!component) {
        throw new Error(`Called register with null component named ${name}`);
      }

      const isGeneratorFunction = generatorFunction(component);

      _components.set(name, {
        name,
        component,
        generatorFunction: isGeneratorFunction,
      });
    });
  },

  /**
   * @param name
   * @returns { name, component, generatorFunction }
   */
  get(name) {
    if (_components.has(name)) {
      return _components.get(name);
    } else {
      const keys = Array.from(_components.keys()).join(', ');
      throw new Error(
        `Could not find component registered with name ${name}. \
        Registered component names include [ ${keys} ].
        Maybe you forgot to register the component?`
      );
    }
  }
};
