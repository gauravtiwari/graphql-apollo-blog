/*
  Render all components to DOM based on [data-react-component]
*/

// React Specific
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import App from './helpers/app';
import createReactElement from './utils/createReactElement';

// Apollo client
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { Provider } from 'react-apollo';

// Send headers with network interface
const networkInterface = createNetworkInterface('/graphql', {
  credentials: 'same-origin',
  headers: {
    'X-CSRF-Token': App.csrfToken(),
  }
});

// UnMount component from a Node
function unmountComponents() {
  $('[data-react-component]').each(function(index, el) {
    ReactDOM.unmountComponentAtNode($(el)[0]);
  });
}

// Mount component at a Node
function mountComponents() {
  const nodes = document.querySelectorAll("[data-react-component]");
  for (let i = 0; i < nodes.length; ++i) {
    const node = nodes[i];
    const jsonProps = node.getAttribute('data-react-component-props');
    const componentName = node.getAttribute('data-react-component-name');

    const props = jsonProps && JSON.parse(jsonProps);

    const reactElement = createReactElement(
      componentName,
      props,
      node
    );

    // Initialize client with new network interface
    const client = new ApolloClient({
      networkInterface,
      initialState: props,
    });

    ReactDOM.render(
      <Provider client={client} children={reactElement} />,
      node
    );
  };
}

// Listen DOM events and { Mount, Unmount } react components
export default function renderComponents() {
  document.addEventListener('DOMContentLoaded', () => {
    if (!(typeof Turbolinks !== 'undefined')) {
      mountComponents();
    } else {
      if (typeof Turbolinks.controller !== 'undefined') {
        document.addEventListener('turbolinks:before-cache', unmountComponents);
        document.addEventListener('turbolinks:load', mountComponents);
      } else {
        document.addEventListener('page:before-unload', unmountComponents);
        document.addEventListener('page:change', mountComponents);
      }
    }
  });
}
