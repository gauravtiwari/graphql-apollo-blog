/**
 * @param component
 * @returns {boolean}
*/
export default function generatorFunction(component) {
  if (!component.prototype) {
    return false;
  }
  // es5 or es6 React Component
  const es5OrEs6ReactComponent = component.prototype.isReactComponent;
  return !es5OrEs6ReactComponent;
}
