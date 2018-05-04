import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store/store';

store.subscribe(() => {
	window.localStorage.setItem('vms', JSON.stringify(store.getState()));
});

import App from './containers/App';
import './styles/App.global.css';

const app = (
	<Provider store={store}>
		<BrowserRouter>
			<App/>
		</BrowserRouter>
	</Provider>
)

ReactDOM.render(app, document.getElementById('root'));
