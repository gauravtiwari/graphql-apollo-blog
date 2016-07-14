import ReactDOMServer from 'react-dom/server';
import createReactElement from './createReactElement';
import networkInterface  from '../setNetworkLayer.es6.js';
import createStore from './store';
import { renderToStringWithData } from 'react-apollo/server';

// Apollo client
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

export default function serverRenderComponent(options) {
  const { name, props } = options;
  let htmlResult = '';
  let errors = '';

  const client = new ApolloClient({
    networkInterface,
    ssrMode: true,
    ssrForceFetchDelay: 100,
  });

  const reactElement = createReactElement(name, props);

  const store = createStore({ client, reducers: { posts: props.posts }, store: props });

  const component = (
    <ApolloProvider client={client} store={store} children={reactElement} />
  );

  const markup = ReactDOMServer.renderToString(component);

  return markup;
}
