import initialState from './state';

const reducer = (state = initialState, action) => {
	if (action.type === 'SET_TITLE') {
		return {
			...state,
			title: action.title
		}
	}

	if (action.type === 'TOGGLE_NAV') {
		return {
			...state,
			navigationCollapsed: !state.navigationCollapsed
		}
	}

	if (action.type === 'SET_HEADER') {
		return {
			...state,
			headerType: action.header
		}
	}

	return state;
};

export default reducer;