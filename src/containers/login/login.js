import React, { Component } from 'react';
import { Form, Input, Icon, Button } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import axios from 'axios';
var qs = require('qs');
const FormItem = Form.Item;

const AUTH_BASIC_HEADERS = {
	// 'Content-Type': 'application/x-www-form-urlencoded',
	// 'X-Requested-With': 'XMLHttpRequest',
	headers: {
		'Authorization': 'Basic dm1zLXVpOg==' // Base64(client_id:client_secret) "demoapp:demopass"
	}
};

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

class LoginForm extends Component {
	state = {
		loginFail: false
	}
	handleSubmit(e) {
		e.preventDefault();
		console.log(this.props.form);
		this.props.form.validateFields((err, values) => {
			if (!err) {
				let data = {
					grant_type: 'password',
					...values
				};
				console.log(qs.stringify(data));
				axios.post('/proxy/oauth/token', qs.stringify(data), AUTH_BASIC_HEADERS).then((response) => {
					console.log(response);
					this.props.updateAuth({
						isLoggedIn: true,
						accessToken: response.data.access_token,
						refreshToken: response.data.refresh_token
					});
				})
				.catch((error) => {
					console.log(error);
					this.setState({loginFail: true});
				});
			}
		});
	}
	render() {
		const getFieldDecorator = this.props.form.getFieldDecorator;
		const loginFailMsg = this.state.loginFail ? (<p style={{color: 'red'}}>Wrong username or password!</p>) : null;
		return (
			<Form onSubmit={(e) => this.handleSubmit(e)} className="login-form">
				{ loginFailMsg }
				<FormItem>
					{getFieldDecorator('username', {
						rules: [{ required: true, message: 'Please input your username!' }],
					})(
						<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
					)}
				</FormItem>
				<FormItem>
					{getFieldDecorator('password', {
						rules: [{ required: true, message: 'Please input your Password!' }],
					})(
						<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
					)}
				</FormItem>
				<FormItem style={{textAlign: 'center'}}>
					<Button type="primary" htmlType="submit" className="login-form-button">
						Log in
					</Button>
				</FormItem>
			</Form>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		updateAuth: (auth) => dispatch(actions.updateAuth(auth))
	};
};

export default connect(null, mapDispatchToProps)(Form.create()(LoginForm));