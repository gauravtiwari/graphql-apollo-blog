import React from 'react';
import reactComponent from './reactComponent';
/**
 * Logic to either call the generatorFunction or call React.createElement to get the
 * React.Component
 * @param name
 * @param props
 * @returns {Element}
 */

export default function createReactElement(name, props, domNode) {
  const componentObj = reactComponent.getComponent(name);
  const { component, generatorFunction } = componentObj;

  if (generatorFunction) {
    return component(props);
  }

  return React.createElement(component, props);
}
