import React, { Component } from 'react';
import Axios from 'axios';
import { Row, Col, Form, Input, Select, Switch, notification, Spin } from 'antd';
import EditTemplate from '../Template/Edit';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class LanguagesForm extends Component {
	state = {
		loading: true,
		language: {
			name: '',
			isoCodeTwoB: '',
			description: '',
			shortlisted: false
		},
		isoCodes: []
	}

	resource = '/proxy/languages/';

	componentDidMount(){
		this.id = this.props.match.params.id;

		this.getIsoCodes().then(() => {
			if(this.id !== 'create')
				this.getLanguage();
			else
				this.setState({loading: false});
		});
	}

	getIsoCodes() {
		return Axios.get(this.resource + '?size=10000&sort=name,asc').then((response) => {
			this.setState({
				isoCodes: response.data.content
			});
		});
	}

	getLanguage() {
		Axios.get(this.resource + this.id).then((response) => {
			this.setState({
				language: response.data,
				loading: false
			});
		});
	}

	saveLanguage(data) {
		Axios.post(this.resource, data).then(() => {
			notification.success({
				message: 'Success',
				description: 'Language created successfully'
			});
			window.history.back();
		}).catch((error) => {
			notification.error({
				message: 'Error',
				description: error.response.data.message
			});
		});
	}

	updateLanguage(data) {
		Axios.put(this.resource + this.id, {
			...this.state.language,
			...data
		}).then(() => {
			notification.success({
				message: 'Success',
				description: 'Language edited successfully'
			});
			window.history.back();
		}).catch((error) => {
			notification.error({
				message: 'Error',
				description: error.response.data.message
			});
		});
	}

	submit() {
		this.props.form.validateFields((err, values) => {
			if (!err) {
				if (this.id === 'create')
					this.saveLanguage(values);
				else
					this.updateLanguage(values);
			}
		});
	}

	render() {
		const title = this.id === 'create' ? 'Add new language' : 'Edit language';
		const isoCodeOptions = this.state.isoCodes.map(code => {
			return <Option value={code.isoCodeTwoB} key={code.isoCodeTwoB}>
				{code.isoCodeTwoB + ' - ' + code.name}
			</Option>
		});
		const { getFieldDecorator } = this.props.form;

		return(
			<Spin tip="Loading" spinning={this.state.loading}>
				<EditTemplate title={title} onSubmit={this.submit.bind(this)}>
					<Form>
						<Row>
							<Col span={4}>
								<FormItem label="Language name">
									{getFieldDecorator('name', {
										initialValue: this.state.language.name,
										rules: [{ required: true, message: 'The language name is required.' }],
									})(
										<Input/>
									)}
								</FormItem>
							</Col>
							<Col span={4} offset={1}>
								<FormItem label="ISO Code">
									{getFieldDecorator('isoCodeTwoB', {
										initialValue: this.state.language.isoCodeTwoB,
										rules: [{ required: true, message: 'The ISO Code is required.' }],
									})(
										<Select showSearch
												filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
											{isoCodeOptions}
										</Select>
									)}
								</FormItem>
							</Col>
							<Col span={4} offset={1}>
								<FormItem label="Short listed" style={{marginLeft:10}}>
									{getFieldDecorator('shortlisted',{
										initialValue: this.state.language.shortlisted,
										valuePropName: 'checked'
									})(
										<Switch/>
									)}
								</FormItem>
							</Col>
							<Col span={4} offset={1}>
								<FormItem label="Description">
									{getFieldDecorator('description',{
										initialValue: this.state.language.description
									})(
										<TextArea rows={1} />
									)}
								</FormItem>
							</Col>
						</Row>
					</Form>
				</EditTemplate>
			</Spin>
		)
	}
}

export default Form.create()(LanguagesForm);