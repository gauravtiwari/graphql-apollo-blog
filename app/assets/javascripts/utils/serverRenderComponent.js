import ReactDOMServer from 'react-dom/server';
import createReactElement from './createReactElement';

// Apollo client
import ApolloClient from 'apollo-client';
import { Provider } from 'react-apollo';
const client = new ApolloClient();

export default function serverRenderComponent(options) {
  const { name, props } = options;
  let htmlResult = '';
  let errors = '';
  const reactElement = createReactElement(name, props);
  htmlResult = ReactDOMServer.renderToString(
    <Provider client={client} children={reactElement} />
  );

  return htmlResult;
}
