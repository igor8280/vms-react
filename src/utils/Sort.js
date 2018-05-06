import { getLocalStorage, updateLocalStorage } from './Storage';

const getSort = (name, sort) => {
	let storage = getLocalStorage();

	if (!storage.sort)
		storage.sort = {};

	if (!storage.sort[name]) {
		storage.sort[name] = sort;
		updateLocalStorage({sort: storage.sort});
	}

	return storage.sort[name];
};

const setSort = (name, sort) => {
	let storage = getLocalStorage();
	storage.sort[name] = sort;
	updateLocalStorage({
		sort: storage.sort
	});
};

const updateSort = (name, sorter, cb) => {
	if (Object.keys(sorter).length) {
		let currentSort = getSort(name);
		let newSort = sorter.field + ',' + (sorter.order === 'ascend' ? 'asc' : 'desc');
		if (currentSort !== newSort) {
			setSort(name, newSort);
			cb(newSort);
		}
	}
};

const sortOrder = (column, sort) => {
	sort = sort.split(',');
	let field = sort[0];
	let order = sort[1] === 'asc' ? 'ascend' : 'descend';
	return column === field ? order : null;
};

export {
	getSort,
	setSort,
	updateSort,
	sortOrder
}