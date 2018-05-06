const storageKey = 'vms';

const getLocalStorage = () => {
	let storage = localStorage.getItem(storageKey);
	if (!storage) {
		setLocalStorage({});
		return {};
	}

	return JSON.parse(storage);
};

const setLocalStorage = value => localStorage.setItem(storageKey, JSON.stringify(value));

const updateLocalStorage = value => {
	setLocalStorage({
		...getLocalStorage(),
		...value
	});
};

const getSessionStorage = () => {
	let storage = sessionStorage.getItem(storageKey);
	if (!storage) {
		setSessionStorage({});
		return {};
	}

	return JSON.parse(storage);
};

const setSessionStorage = value => sessionStorage.setItem(storageKey, JSON.stringify(value));

const updateSessionStorage = value => {
	setSessionStorage({
		...getSessionStorage(),
		...value
	});
};

export {
	getLocalStorage,
	setLocalStorage,
	updateLocalStorage,
	getSessionStorage,
	setSessionStorage,
	updateSessionStorage
}