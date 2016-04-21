/*
  Server: Entry file for webpack
*/

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import registerComponents from './register';

// Call to register all components
registerComponents();

