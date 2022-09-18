import { createStore, Store, applyMiddleware } from 'redux';
import reducer from './reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

const middleware = [thunk]
// TODO: https://webpack.js.org/plugins/environment-plugin/ might not be working
// if (process.env.NODE_ENV !== 'production') {
//   middleware.push(createLogger({ collapsed: true }) as any);
// }
const store: Store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
