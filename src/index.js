import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/index';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import reducer from './store/reducer';
import { Provider } from 'react-redux';

const store = createStore(reducer);

store.subscribe(() => {
	window.localStorage.setItem('vms', JSON.stringify(store.getState()));
});

const app = (
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
