import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
// import registerServiceWorker from './registerServiceWorker';

import authReducer from './store/reducers/auth';

const rootReducer = combineReducers({
	auth: authReducer
});

const store = createStore(rootReducer);

store.subscribe(() => {
	window.localStorage.setItem('vms', JSON.stringify(store.getState()));
});

import App from './containers/app';
import './styles/global.css';

const app = (
	<Provider store={store}>
		<App/>
	</Provider>
)

ReactDOM.render(app, document.getElementById('root'));
// registerServiceWorker();