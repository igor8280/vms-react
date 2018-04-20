import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Icon, Row, Col } from 'antd';
import './edit.css';

class Header extends Component {
	goBack() {
		this.props.history.goBack();
	}
	render() {
		return (
			<Row>
				<Col span={16}>
					<Button onClick={this.goBack.bind(this)} className="back" style={{ marginBottom: 16 }}>
						<Icon type='left' />
					</Button>
					<h2 className="title">{this.props.title}</h2>
				</Col>
				<Col span={8} className="save">
					<Button type="primary" className="btn-save" style={{ marginBottom: 16 }}>
						Save
						<Icon type='save' />
					</Button>
				</Col>
			</Row>
		)
	}
};

const mapStateToProps = state => {
	return {
		title: state.title
	};
};

export default withRouter(connect(mapStateToProps)(Header));