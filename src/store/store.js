import { createStore, combineReducers } from 'redux';
import authReducer from './reducers/auth';
import layoutReducer from './reducers/layout';

const rootReducer = combineReducers({
	auth: authReducer,
	layout: layoutReducer
});

const store = createStore(rootReducer);

export default store;