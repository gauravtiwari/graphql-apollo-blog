import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import registerComponents from './register';
import renderComponents from './renderer';
// Call to register and render all components
registerComponents();

