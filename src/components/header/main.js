import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Row, Col } from 'antd';
import './main.css';

class Header extends Component {
	render() {
		return (
			<Row className="header-content">
				<Col className="sider">
					<Button type="primary" onClick={this.props.toggle}>
						<Icon type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'} />
					</Button>
				</Col>
				<Col>
					<h2>{this.props.title}</h2>
				</Col>
			</Row>
		)
	}
};

const mapStateToProps = state => {
	return {
		title: state.title,
		collapsed: state.navigationCollapsed
	};
};

const mapDispatchToProps = dispatch => {
	return {
		toggle: () => dispatch({type: 'TOGGLE_NAV'})
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);