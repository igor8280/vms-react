import { getSessionStorage, updateSessionStorage } from './Storage';

if (!getSessionStorage().cache)
	updateSessionStorage({cache: {}});

const getCache = name => {
	let storage = getSessionStorage();

	if (!storage.cache[name]) {
		storage.cache[name] = {};
		updateSessionStorage({cache: storage.cache});
	}

	return storage.cache[name];
};

const setCache = (name, value) => {
	let storage = getSessionStorage();
	storage.cache[name] = value;
	updateSessionStorage({cache: storage.cache});
};

const updateCache = (name, value) => {
	let storage = getSessionStorage();
	storage.cache[name] = {
		...storage.cache[name],
		...value
	};
	updateSessionStorage({cache: storage.cache});
};

export {
	getCache,
	setCache,
	updateCache
}