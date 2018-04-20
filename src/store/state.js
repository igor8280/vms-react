const initialState = {
	title: '',
	headerType: 'main',
	navigationCollapsed: false
};

const oldState = JSON.parse(window.localStorage.getItem('vms'));

Object.assign(initialState, oldState);

export default initialState;