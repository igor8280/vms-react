import * as Storage from './Storage';

const getPagination = (name) => {
	let localStorage = Storage.getLocalStorage();
	let sessionStorage = Storage.getSessionStorage();

	if (!localStorage.pagination)
		localStorage.pagination = {};

	if (!localStorage.pagination[name]) {
		localStorage.pagination[name] = {
			itemsByPage: 10
		}
		Storage.updateLocalStorage({pagination: localStorage.pagination});
	}

	if (!sessionStorage.pagination)
		sessionStorage.pagination = {};

	if (!sessionStorage.pagination[name]) {
		sessionStorage.pagination[name] = {
			currentPage: 1,
			totalElements: 1
		}
		Storage.updateSessionStorage({pagination: sessionStorage.pagination});
	}

	return {
		...localStorage.pagination[name],
		...sessionStorage.pagination[name]
	};
};

const setPagination = (name, value) => {
	let localStorage = Storage.getLocalStorage();
	localStorage.pagination[name].itemsByPage = value.itemsByPage;
	Storage.updateLocalStorage({
		pagination: localStorage.pagination
	});

	let sessionStorage = Storage.getSessionStorage();
	sessionStorage.pagination[name].currentPage = value.currentPage;
	sessionStorage.pagination[name].totalElements = value.totalElements;
	Storage.updateSessionStorage({
		pagination: sessionStorage.pagination
	});
};

export {
	getPagination,
	setPagination
}