import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'antd';
import {showNav} from "../../store/actions";
import less from './Edit.less';

class EditHeader extends Component {
	componentDidMount() {
		this.props.showNav(false);
	}
	goBack() {
		window.history.back();
	}
	render() {
		return (
			<div className={less.editHeader}>
				<div className={less.back}>
					<Button onClick={this.goBack.bind(this)}>
						<Icon type="left" />
					</Button>
					<h1>{this.props.title}</h1>
				</div>
				<div className={less.save}>
					<Button type="primary" onClick={this.props.onSubmit}>
						Save
					</Button>
				</div>
			</div>
		)
	}
}


const mapDispatchToProps = dispatch => {
	return {
		showNav: (value) => dispatch(showNav(value))
	}
};

export default connect(null, mapDispatchToProps)(EditHeader);
