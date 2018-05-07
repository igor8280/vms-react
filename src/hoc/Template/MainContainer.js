import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import MainHeader from './Header/Main';
import * as Utils from '../../utils/index';
import less from '../../containers/App.less';

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

export { Utils };
