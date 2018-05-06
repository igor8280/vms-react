import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import Axios from 'axios';
import {Table, Input, Row, Col, Button, notification} from 'antd';
import MainHeader from '../Template/Main';

const Search = Input.Search;

class Countries extends Component {
	state = {
		countries: [],
		selectedRowKeys: [],
		loading: false,
		search: '',
		sort: {
			col: 'name',
			order: 'asc'
		},
		pagination: {
			currentPage: 1,
			itemsByPage: 10,
			totalElements: 1
		}
	};

	resource = '/proxy/countries/';

	componentDidMount() {
		this.getCountries();
	}

	getCountries() {
		this.setState({loading: true});
		let params = {
			'size': this.state.pagination.itemsByPage,
			'page': (this.state.pagination.currentPage - 1),
			'sort': this.state.sort.col + ',' + this.state.sort.order
		};

		if (this.state.search)
			params.q = 'like.' + this.state.search;

		Axios.get(this.resource + 'search', {params}).then(response => {
			this.setState({
				countries: response.data.content,
				pagination: {
					currentPage: response.data.number + 1,
					totalElements: response.data.totalElements,
					itemsByPage: response.data.size
				},
				selectedRowKeys: [],
				loading: false
			});
		})
	}

	getCountriesBySearch(value) {
		this.setState({
			search: value,
			pagination: {
				...this.state.pagination,
				currentPage: 1
			}
		}, this.getCountries);
	}

	updatePage(pageNumber) {
		let pagination = {...this.state.pagination};
		pagination.currentPage = pageNumber;
		this.setState({pagination}, this.getCountries);
	}

	updateItemsByPage(newPage, itemsByPage) {
		let pagination = {...this.state.pagination};
		pagination.currentPage = newPage;
		pagination.itemsByPage = itemsByPage;
		this.setState({pagination}, this.getCountries);
	}

	delete() {
		let length = this.state.selectedRowKeys.length;
		let resource = this.resource + (length === 1 ? this.state.selectedRowKeys[0] : '');
		let params = length === 1 ? {} : {ids: this.state.selectedRowKeys.join()};

		Axios.delete(resource, {params}).then(() => {
			let totalElements = this.state.pagination.totalElements - length;

			let totalPages = totalElements / this.state.pagination.itemsByPage;
			totalPages = Math.floor(totalPages) + Math.ceil(totalPages % 1);

			let currentPage = this.state.pagination.currentPage;
			if (!totalPages)
				currentPage = 1;
			else if (currentPage > totalPages)
				currentPage = totalPages;

			this.setState({
				pagination: {
					...this.state.pagination,
					totalElements,
					currentPage
				}
			}, this.getLanguages);
		}).catch((error) => {
			notification.error({
				message: 'Error',
				description: error.response.data.message
			});
		});
	}


	sortOrder(name) {
		return this.state.sort.col !== name ? null :
			this.state.sort.order === 'asc' ? 'ascend' : 'descend';
	}

	tableChange(pagination, filters, sorter) {
		if (Object.keys(sorter).length) {
			let order = sorter.order === 'ascend' ? 'asc' : 'desc';

			if (this.state.sort.order !== order || this.state.sort.col !== sorter.field) {
				this.setState({
					sort: {
						col: sorter.field,
						order
					}
				}, this.getCountries)
			}
		}
	}

	render() {
		const columns = [
			{
				title: 'ID',
				dataIndex: 'id',
				key: 'id',
				sorter: true,
				sortOrder: this.sortOrder('id'),
				render: id => (<NavLink to={'/countries/' + id}>{id}</NavLink>)
			},
			{
				title: 'Name',
				dataIndex: 'name',
				key: 'name',
				sorter: true,
				sortOrder: this.sortOrder('name')
			},
			{
				title: 'Iso Code Two',
				dataIndex: 'isoCodeTwo',
				key: 'isoCodeTwo',
				sorter: true,
				sortOrder: this.sortOrder('isoCodeTwo')
			},
			{
				title: 'Iso Code Three',
				dataIndex: 'isoCodeThree',
				key: 'isoCodeThree',
				sorter: true,
				sortOrder: this.sortOrder('isoCodeThree')
			},
			{
				title: 'Description',
				dataIndex: 'description',
				key: 'description',
				sorter: true,
				sortOrder: this.sortOrder('description')
			}];

		const {selectedRowKeys} = this.state;
		const rowSelection = {
			selectedRowKeys,
			onChange: (selectedRowKeys) => {
				this.setState({selectedRowKeys})
			}
		};

		return (
			<MainHeader title='Countries'>
				<Row>
					<Col span={6}>
						<Search
							placeholder="Search..."
							onSearch={value => this.getCountriesBySearch(value)}
							enterButton
						/>
					</Col>
					<Col style={{textAlign: 'right'}}>
						<NavLink to="/countries/create"><Button type="primary" icon="plus">Add new</Button></NavLink>
						&nbsp;&nbsp;&nbsp;
						<Button onClick={this.delete.bind(this)} type="danger" icon="close"
								disabled={!this.state.selectedRowKeys.length}>Delete</Button>
					</Col>
				</Row>
				<br/>
				<Table
					dataSource={this.state.countries}
					columns={columns}
					rowKey='id'
					rowSelection={rowSelection}
					bordered
					loading={this.state.loading}
					onChange={this.tableChange.bind(this)}
					pagination={{
						showTotal: total => `Total ${total} items`,
						showSizeChanger: true,
						showQuickJumper: true,
						total: this.state.pagination.totalElements,
						pageSize: this.state.pagination.itemsByPage,
						current: this.state.pagination.currentPage,
						onChange: this.updatePage.bind(this),
						onShowSizeChange: this.updateItemsByPage.bind(this),
						pageSizeOptions: ['10', '20', '50', '100']
					}}
				/>
			</MainHeader>
		)
	}
}

export default Countries;
