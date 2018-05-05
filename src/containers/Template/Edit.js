import React, { Component } from 'react';
import { Layout } from 'antd';
import EditHeader from '../Header/Edit';
import less from '../App.less';

const { Header, Content } = Layout;

class EditTemplate extends Component {
	render() {
		return (
			<Layout>
				<Header className={less.header}>
					<EditHeader
						title={this.props.title}
						onSubmit={this.props.onSubmit}
					/>
				</Header>
				<Layout>
					<Content className={less.app}>
						{this.props.children}
					</Content>
				</Layout>
			</Layout>
		);
	}
}

export default EditTemplate;
