import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';
import { connect } from 'react-redux';
import LoginForm from './login/login';
import less from './app.less';
import axios from 'axios';
import * as actions from "../store/actions";

class App extends Component {
	test() {
		axios.get('/proxy/serviceproviders').then((response) => {
			console.log(response);
		}).catch((error) => {
			console.log(error);
		});
	}
	render() {
		if (this.props.isLoggedIn) {
			return (
				<div>
					Welcome
					<Button onClick={() => this.props.logout()}>Logout</Button>
					<Button onClick={this.test}>test</Button>
				</div>
			);
		}
		else {
			return (
				<div className={less.app}>
					<h1 className={less.title}>Webpack - ReactJS</h1>
					<Row>
						<Col span={6} offset={9}>
							<LoginForm/>
						</Col>
					</Row>
				</div>
			);
		}
	}
}
const mapStateToProps = state => {
	return {
		isLoggedIn: state.auth.isLoggedIn
	};
};

const mapDispatchToProps = dispatch => {
	return {
		logout: () => dispatch(actions.logout())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
