import React, {Component} from 'react'
import {connect} from "react-redux";

class Asset extends Component {
	componentDidMount() {
		this.props.setTitle('Assets');
		this.props.setHeader('main');
	}
	render() {
		return (
			<div>
				<p align="center">Assets page</p>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		setTitle: (title) => dispatch({type:'SET_TITLE',title: title}),
		setHeader: (type) => dispatch({type:'SET_HEADER',header: type})
	};
};

export default connect(null, mapDispatchToProps)(Asset);