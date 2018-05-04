import React, { Component } from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import LoginForm from './Login/Form';
import Navigation from '../components/Navigation/Navigation';
// import MainTemplate from './Template/Main';
// import EditTemplate from './Template/edit';
import LanguagesList from './Languages/List';
import { setupHeader } from '../services/Auth';
import less from './app.less';

const { Sider } = Layout;

class App extends Component {
	constructor(props) {
		super(props);

		if (this.props.isLoggedIn)
			setupHeader();
	}
	render() {
		if (!this.props.isLoggedIn)
			return (<LoginForm/>);

		let appClasses = [less.app];
		if (this.props.showNav)
			appClasses.push(this.props.collapsed ? less.siderClosed : less.siderOpened);

		return (
			<Layout>
				<Sider
					className={less.siderNav}
					width={300}
					collapsible
					collapsed={this.props.collapsed}
					collapsedWidth={100}
					trigger={null}
					hidden={!this.props.showNav}
				>
					<Navigation/>
				</Sider>
				<LanguagesList/>
				{/*<EditTemplate title="Edit title">*/}
					{/*Content*/}
				{/*</EditTemplate>*/}
			</Layout>
		);
	}
}
const mapStateToProps = state => {
	return {
		isLoggedIn: state.auth.isLoggedIn,
		showNav: state.layout.showNav,
		collapsed: state.layout.collapsed
	};
};


export default connect(mapStateToProps)(App);
