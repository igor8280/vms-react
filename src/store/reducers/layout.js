import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	showNav: false,
	collapsed: true,
	header: 'main',
	title: ''
};

const currentData = JSON.parse(localStorage.getItem('vms'));
if (currentData && currentData.layout)
	Object.assign(initialState, currentData.layout);

const showNav = (state, show) => {
	return updateObject(state, {
		showNav: show
	});
};

const toggleNav = (state) => {
	return updateObject(state, {
		collapsed: !state.collapsed
	});
};

const setHeader = (state, header) => {
	return updateObject(state, {
		header: header
	});
};

const setTitle = (state, title) => {
	return updateObject(state, {
		title: title
	});
};

const reducer = ( state = initialState, action ) => {
	switch ( action.type ) {
		case actionTypes.SHOW_NAV: return showNav( state, action.show );
		case actionTypes.TOGGLE_NAV: return toggleNav( state );
		case actionTypes.SET_HEADER: return setHeader( state, action.header );
		case actionTypes.SET_TITLE: return setTitle( state, action.title );
		default: return state;
	}
};

export default reducer;