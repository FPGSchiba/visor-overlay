import { configureStore, Store, AnyAction } from '@reduxjs/toolkit';
import reducer from './reducers';
import { thunk } from 'redux-thunk';

const middleware = [thunk]
const store: Store<any, AnyAction, unknown> = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
    devTools: true
});

export default store;
