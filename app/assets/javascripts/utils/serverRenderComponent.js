import ReactDOMServer from 'react-dom/server';
import createReactElement from './createReactElement';

// Apollo client
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

export default function serverRenderComponent(options) {
  const { name, props } = options;
  let htmlResult = '';
  let errors = '';

  const client = new ApolloClient();

  const reactElement = createReactElement(name, props);

  const initialState = client.initialState;

  htmlResult = ReactDOMServer.renderToStaticMarkup(
    <ApolloProvider initialState={initialState} client={client} children={reactElement} />
  );


  return htmlResult;
}
