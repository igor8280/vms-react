import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Axios from 'axios';
import { Table, Icon, Input, Row, Col, Button, notification } from 'antd';
import MainTemplate, { Utils } from '../../hoc/Template/MainContainer';

const Search = Input.Search;

class Languages extends Component {
	state = {
		languages: [],
		selectedRowKeys: [],
		loading: false,
		search: Utils.getCache('languages').search || '',
		sort: Utils.getSort('languages', 'name,asc'),
		pagination: Utils.getPagination('languages')
	};

	resource = '/proxy/languages/';

	componentDidMount() {
		this.getLanguages();
	}

	getLanguages() {
		this.setState({loading: true});
		let params = {
			'size': this.state.pagination.itemsByPage,
			'page': (this.state.pagination.currentPage - 1),
			'sort': this.state.sort
		};

		if (this.state.search)
			params.q = 'like.' + this.state.search;

		Axios.get(this.resource + 'search', {params}).then((response) => {
			this.setState({
				languages: response.data.content,
				pagination: {
					currentPage: response.data.number + 1,
					totalElements: response.data.totalElements,
					itemsByPage: response.data.size
				},
				selectedRowKeys: [],
				loading: false
			}, () => Utils.setPagination('languages', this.state.pagination));
		});
	}

	getLanguagesBySearch(value) {
		Utils.updateCache('languages', {search: value});
		this.setState({
			search: value,
			pagination: {
				...this.state.pagination,
				currentPage: 1
			}
		}, this.getLanguages);
	}

	updatePage(pageNumber) {
		let pagination = {...this.state.pagination};
		pagination.currentPage = pageNumber;
		this.setState({pagination}, this.getLanguages);
	}

	updateItemsByPage(newPage, itemsByPage) {
		let pagination = {...this.state.pagination};
		pagination.currentPage = newPage;
		pagination.itemsByPage = itemsByPage;
		this.setState({pagination}, this.getLanguages);
	}

	delete() {
		let length = this.state.selectedRowKeys.length;
		let resource = this.resource + (length === 1 ?  this.state.selectedRowKeys[0] : '');
		let params = length === 1 ? {} : {ids: this.state.selectedRowKeys.join()};

		Axios.delete(resource, {params}).then(() => {
			let totalElements = this.state.pagination.totalElements - length;
			let totalPages = Math.ceil(totalElements / this.state.pagination.itemsByPage);
			let currentPage = this.state.pagination.currentPage;

			if (!totalPages)
				currentPage = 1;
			else if(currentPage > totalPages)
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

	tableChange(pagination, filters, sorter) {
		Utils.updateSort('languages', sorter, (sort) => {
			this.setState({sort}, this.getLanguages)
		});
	}

	render() {
		const columns = [{
			title: 'ID',
			dataIndex: 'id',
			sorter: true,
			sortOrder: Utils.sortOrder('id', this.state.sort),
			render: id => <NavLink to={'/languages/'+id}>{id}</NavLink>
		},{
			title: 'Name',
			dataIndex: 'name',
			sorter: true,
			sortOrder: Utils.sortOrder('name', this.state.sort)
		}, {
			title: 'Iso Code',
			dataIndex: 'isoCodeTwoB',
			key: 'isoCodeTwoB',
			sorter: true,
			sortOrder: Utils.sortOrder('isoCodeTwoB', this.state.sort)
		},{
			title: 'Description',
			dataIndex: 'description',
			key: 'description',
			sorter: true,
			sortOrder: Utils.sortOrder('description', this.state.sort)
		}, {
			title: 'Shortlisted',
			dataIndex: 'shortlisted',
			align: 'center',
			sorter: true,
			sortOrder: Utils.sortOrder('shortlisted', this.state.sort),
			render: value => value ? <Icon style={{color: 'green'}} type="check" /> : <Icon style={{color: 'red'}} type="close" />
		}];

		const { selectedRowKeys } = this.state;
		const rowSelection = {
			selectedRowKeys,
			onChange: (selectedRowKeys) => {
				this.setState({selectedRowKeys})
			}
		};
		return (
			<MainTemplate title="Languages">
				<Row>
					<Col span={6}>
						<Search
							placeholder="Search..."
							defaultValue={this.state.search}
							onSearch={value => this.getLanguagesBySearch(value)}
							enterButton
						/>
					</Col>
					<Col style={{textAlign: 'right'}}>
						<NavLink to="/languages/create">
							<Button type="primary" icon="plus">Add new</Button>
						</NavLink>
						&nbsp;&nbsp;&nbsp;
						<Button onClick={this.delete.bind(this)}
								type="danger"
								icon="close"
								disabled={!this.state.selectedRowKeys.length}>
							Delete
						</Button>
					</Col>
				</Row>
				<br />
				<Table
					dataSource={this.state.languages}
					columns={columns}
					rowKey='id'
					rowSelection={rowSelection}
					bordered={true}
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
						onShowSizeChange: this.updateItemsByPage.bind(this)
					}}>
				</Table>
			</MainTemplate>
		)
	}
}

export default Languages;
