import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import axios from 'axios';

const initialState = {
	isLoggedIn: false,
	accessToken: '',
	refreshToken: ''
};

const currentData = JSON.parse(localStorage.getItem('vms'));
if (currentData && currentData.auth)
	Object.assign(initialState, currentData.auth);

const updateAuth = (state, action) => {
	console.log('reducer', action);
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + action.auth.accessToken;
	return updateObject(state, action.auth);
};

const logout = () => {
	delete axios.defaults.headers.common['Authorization'];
	return {
		isLoggedIn: false,
		accessToken: '',
		refreshToken: ''
	}
};

const reducer = ( state = initialState, action ) => {
	switch ( action.type ) {
		case actionTypes.UPDATE_AUTH: return updateAuth( state, action );
		case actionTypes.LOGOUT: return logout(state, action);
		default: return state;
	}
};

export default reducer;