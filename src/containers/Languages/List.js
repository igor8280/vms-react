import React, { Component } from 'react';
import MainTemplate from '../Template/Main';
import axios from 'axios';

import { Table, Icon, Input, Row, Col, Button } from 'antd';
const Search = Input.Search;

class LanguagesList extends Component {
	state = {
		languages: [],
		selectedLanguages: [],
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

	componentDidMount() {
		this.getLanguages();
	}

	getLanguages() {
		this.setState({loading: true});
		let params = {
			'size': this.state.pagination.itemsByPage,
			'page': (this.state.pagination.currentPage - 1),
			'sort': this.state.sort.col + ',' + this.state.sort.order
		};

		if (this.state.search)
			params.q = 'like.' + this.state.search;

		axios.get('/proxy/languages/search', {params}).then((response) => {
			this.setState({
				languages: response.data.content,
				pagination: {
					currentPage: response.data.number + 1,
					totalElements: response.data.totalElements,
					itemsByPage: response.data.size
				},
				loading: false
			});
		});
	}

	getLanguagesBySearch(value) {
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

	updateItemsByPage(currentPage, itemsByPage) {
		let pagination = {...this.state.pagination};
		if (currentPage * itemsByPage > pagination.totalElements)
			pagination.currentPage = Math.floor(pagination.totalElements / itemsByPage) + 1;
		pagination.itemsByPage = itemsByPage;
		this.setState({pagination}, this.getLanguages);
	}

	rowSelection = {
		onChange: (selectedRowKeys) => {
			this.setState({selectedLanguages: selectedRowKeys})
		}
	};

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
				}, this.getLanguages)
			}
		}
	}

	render() {

		const columns = [{
			title: 'ID',
			dataIndex: 'id',
			sorter: true,
			sortOrder: this.sortOrder('id'),
			render: text => <a href="#">{text}</a>
		},{
			title: 'Name',
			dataIndex: 'name',
			sorter: true,
			sortOrder: this.sortOrder('name')
		}, {
			title: 'Iso Code',
			dataIndex: 'isoCodeTwoB',
			key: 'isoCodeTwoB',
			sorter: true,
			sortOrder: this.sortOrder('isoCodeTwoB')
		},{
			title: 'Description',
			dataIndex: 'description',
			key: 'description',
			sorter: true,
			sortOrder: this.sortOrder('description')
		}, {
			title: 'Shortlisted',
			dataIndex: 'shortlisted',
			align: 'center',
			sorter: true,
			sortOrder: this.sortOrder('shortlisted'),
			render: value => value ? <Icon style={{color: 'green'}} type="check" /> : <Icon style={{color: 'red'}} type="close" />
		}];

		return (
			<MainTemplate title="Languages">
				<Row>
					<Col span={6}>
						<Search
							placeholder="Search..."
							onSearch={value => this.getLanguagesBySearch(value)}
							enterButton
						/>
					</Col>
					<Col style={{textAlign: 'right'}}>
						<Button type="primary" icon="plus">Add new</Button>
						&nbsp;&nbsp;&nbsp;
						<Button type="danger" icon="close" disabled={!this.state.selectedLanguages.length}>Delete</Button>
					</Col>
				</Row>
				<br />
				<Table
					dataSource={this.state.languages}
					columns={columns}
					rowKey='id'
					rowSelection={this.rowSelection}
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

export default LanguagesList;