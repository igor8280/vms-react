import React, { Component } from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import MainHeader from '../Header/Main';
import less from '../app.less';

const { Header, Content } = Layout;

class MainTemplate extends Component {
	render() {
		let appClasses = [less.app, this.props.collapsed ? less.siderClosed : less.siderOpened];

		return (
			<Layout>
				<Header className={less.header}>
					<MainHeader title={this.props.title} />
				</Header>
				<Layout>
					<Content className={appClasses.join(' ')}>
						{this.props.children}
					</Content>
				</Layout>
			</Layout>
		);
	}
}
const mapStateToProps = state => {
	return {
		collapsed: state.layout.collapsed
	};
};

export default connect(mapStateToProps)(MainTemplate);
