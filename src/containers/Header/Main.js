import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Button, Icon } from 'antd';

import {toggleNav, showNav} from "../../store/actions";
import { logout } from '../../services/Auth';
import less from './Main.less';

class MainHeader extends Component {
	componentDidMount() {
		this.props.showNav(true);
	}
	render() {
		let logoClasses =  [less.logo, this.props.collapsed ? less.close : less.open];
		let middleClasses =  [less.middle, logoClasses[1]];
		return (
			<div className={less.main}>
				<div className={logoClasses.join(' ')}>
					<Icon
						type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
						onClick={this.props.toggleNav}
						className={less.toggleNav}
					/>
					<NavLink to="/"><img src={require('assets/images/react_logo_512x512.png')} /></NavLink>
				</div>
				<div className={middleClasses.join(' ')}>
					<h1>{this.props.title}</h1>
				</div>
				<div className={less.logout}>
					<Button onClick={logout}>Logout</Button>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		collapsed: state.layout.collapsed
	}
};

const mapDispatchToProps = dispatch => {
	return {
		toggleNav: () => dispatch(toggleNav()),
		showNav: (value) => dispatch(showNav(value))
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(MainHeader);
