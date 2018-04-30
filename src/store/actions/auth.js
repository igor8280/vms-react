import * as actionTypes from './actionTypes';

export const updateAuth = ( auth ) => {
	console.log('action', auth);
	return {
		type: actionTypes.UPDATE_AUTH,
		auth: auth
	};
};

export const logout = () => {
	console.log('action logout');
	return {
		type: actionTypes.LOGOUT
	};
};