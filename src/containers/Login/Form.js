import React, { Component } from 'react';
import { Form, Input, Icon, Button, Row, Col } from 'antd';
import { login } from '../../services/Auth';
const FormItem = Form.Item;

class LoginForm extends Component {
	state = {
		loginFail: false
	}
	handleSubmit(e) {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err)
				login(values).catch(() => this.setState({loginFail: true}));
		});
	}
	render() {
		const getFieldDecorator = this.props.form.getFieldDecorator;
		const loginFailMsg = this.state.loginFail ? (<p style={{color: 'red'}}>Wrong username or password!</p>) : null;
		return (
			<div>
				<h1 style={{textAlign:'center'}}>Webpack - ReactJS</h1>
				<Row>
					<Col span={6} offset={9}>
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
					</Col>
				</Row>
			</div>
		);
	}
}

export default Form.create()(LoginForm);