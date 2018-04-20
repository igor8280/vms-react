import React, {Component} from 'react';
import { connect } from 'react-redux';
import MainHeader from '../components/header/main';
import EditHeader from '../components/header/edit';
import Navigation from '../components/navigation/navigation'
import RouterView from '../router/routes';
import { withRouter } from 'react-router-dom';
import { Layout } from 'antd';
const { Header, Sider, Content } = Layout;

class App extends Component {
	render() {
		let header = this.props.header === 'main' ? <MainHeader/> : <EditHeader/>;
		return (
			<Layout>
				<Sider
					collapsible
			  		collapsed={this.props.collapsed}
					collapsedWidth={0}
					trigger={null}
					hidden={this.props.header === 'edit'}
				>
					<Navigation collapsed={this.props.collapsed}/>
				</Sider>
				<Layout>
					<Header>
						{header}
					</Header>
					<Content style={{padding: '10px'}}>
						<RouterView/>
					</Content>
				</Layout>
			</Layout>
		);
	}
}

const mapStateToProps = state => {
	return {
		header: state.headerType,
		collapsed: state.navigationCollapsed
	};
};

export default withRouter(connect(mapStateToProps)(App));