import * as actionTypes from './actionTypes';

export const showNav = ( value ) => {
	return {
		type: actionTypes.SHOW_NAV,
		show: value
	};
};

export const toggleNav = () => {
	return {
		type: actionTypes.TOGGLE_NAV
	};
};

export const setHeader = ( value ) => {
	return {
		type: actionTypes.SET_HEADER,
		header: value
	};
};

export const setTitle = ( value ) => {
	return {
		type: actionTypes.SET_TITLE,
		title: value
	};
};