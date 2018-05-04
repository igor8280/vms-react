import React, { Component } from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import LoginForm from './login/login';
import Navigation from '../components/navigation';
import MainHeader from './header/main';
// import EditHeader from './header/edit';
import { withRouter, Route } from 'react-router-dom';
import { setupHeader } from './login/services';
import less from './app.less';

import Countries from './Countries/Countries';
import CountriesForm from './Countries/CountriesForm';

const { Header, Content, Sider } = Layout;
// const NavWithRouter = withRouter(Navigation);

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
				<Layout>
					<Header className={less.header}>
						<MainHeader/>
						{/*<EditHeader/>*/}
					</Header>
					<Layout>
						<Content className={appClasses.join(' ')}>
							<Route path="/countries" exact component={Countries}></Route>
              <Route path="/countries/:id" component={CountriesForm}></Route>
						</Content>
					</Layout>
				</Layout>
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
