import * as actionTypes from './actionTypes';

export const updateAuth = ( auth ) => {
	return {
		type: actionTypes.UPDATE_AUTH,
		auth: auth
	};
};