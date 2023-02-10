import { createStore, Store, applyMiddleware } from 'redux';
import reducer from './reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

const middleware = [thunk]
const store: Store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
