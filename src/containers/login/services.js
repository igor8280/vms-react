import store from '../../store/store';
import * as actions from '../../store/actions/index';
import axios from 'axios';
const qs = require('qs');

const auth = () => store.getState().auth;
const AUTH_URL = '/proxy/oauth/token';
const AUTH_BASIC_HEADERS = {
	headers: {
		Authorization: 'Basic dm1zLXVpOg==' // Base64(client_id:client_secret) "demoapp:demopass"
	}
};

const login = credentials => {
	let data = qs.stringify({
		grant_type: 'password',
		...credentials
	});
	return axios.post(AUTH_URL, data, AUTH_BASIC_HEADERS).then((response) => {
		storeToken(response);
		setupHeader();
	});
};

const storeToken = response => {
	store.dispatch(actions.updateAuth({
		isLoggedIn: true,
		accessToken: response.data.access_token,
		refreshToken: response.data.refresh_token
	}));
};

axios.interceptors.response.use(response => {
	return response;
}, error => {
	if (error.response.status === 401 && error.config.url !== AUTH_URL)
		return refreshToken(error.config);

	return Promise.reject(error);
});

const refreshToken = originalRequest => {
	const params = qs.stringify({
		grant_type: 'refresh_token',
		refresh_token: auth().refreshToken
	});
	return axios.post(AUTH_URL, params, AUTH_BASIC_HEADERS).then((response) => {
		storeToken(response);
		setupHeader();
		originalRequest.headers['Authorization'] = 'Bearer ' + response.data.access_token;
		return axios(originalRequest);
	}).catch((error) => {
		logout();
		return Promise.reject(error);
	});
};

const setupHeader = () => {
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + auth().accessToken;
};

const removeHeader = () => {
	delete axios.defaults.headers.common['Authorization'];
};

const logout = () => {
	removeHeader();
	store.dispatch(actions.updateAuth({
		isLoggedIn: false,
		accessToken: '',
		refreshToken: ''
	}));
};

export {
	login,
	setupHeader,
	logout
};