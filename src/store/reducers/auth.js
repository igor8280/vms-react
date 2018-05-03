import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	isLoggedIn: false,
	accessToken: '',
	refreshToken: ''
};

const currentData = JSON.parse(localStorage.getItem('vms'));
if (currentData && currentData.auth)
	Object.assign(initialState, currentData.auth);

const updateAuth = (state, action) => {
	return updateObject(state, action.auth);
};

const reducer = ( state = initialState, action ) => {
	switch ( action.type ) {
		case actionTypes.UPDATE_AUTH: return updateAuth( state, action );
		default: return state;
	}
};

export default reducer;