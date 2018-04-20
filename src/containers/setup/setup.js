import React, {Component} from 'react'
import {connect} from "react-redux";

class Setup extends Component {
	componentDidMount() {
		this.props.setTitle('Setup SP & Community');
		this.props.setHeader('edit');
	}
	render() {
		return (
			<div>
				<p align="center">Setup page</p>
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

export default connect(null, mapDispatchToProps)(Setup);