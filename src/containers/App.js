import React, { Component } from 'react';
import{ withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout } from 'antd';

import AppRouter from '../components/AppRouter/AppRouter';
import Navigation from '../components/Navigation/Navigation';
import LoginForm from './Login/Form';

import { setupHeader } from '../services/Auth';
import less from './App.less';

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
        <Switch>
          <AppRouter/>
          <Redirect to='/' />
        </Switch>
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


export default withRouter(connect(mapStateToProps)(App));
