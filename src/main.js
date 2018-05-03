import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import { BrowserRouter } from 'react-router-dom';

store.subscribe(() => {
	window.localStorage.setItem('vms', JSON.stringify(store.getState()));
});

import App from './containers/app';
import './styles/app.global.css';

const app = (
	<Provider store={store}>
		<BrowserRouter>
			<App/>
		</BrowserRouter>
	</Provider>
)

ReactDOM.render(app, document.getElementById('root'));
// registerServiceWorker();