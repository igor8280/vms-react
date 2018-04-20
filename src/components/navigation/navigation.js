import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import Aux from '../../hoc/aux';
import { Menu, Icon } from 'antd';
import './navigation.css';
const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;

class Navigation extends Component {
	handleClick = (e) => {
		this.props.history.push(e.item.props.path);
	}
	render() {
		let key = 0;
		let subKey = 'sub0';
		let getSubKey = () => {
			let currentKey = subKey;
			subKey = 'sub' + (+subKey.slice(3)+1);
			return currentKey;
		};
		return (
			<Aux>
				<div onClick={() => this.props.history.push('/')} className="logo" />
				<Menu
					onClick={this.handleClick.bind(this)}
					mode="inline"
					theme="dark"
				>
					<SubMenu key={getSubKey()} title={<span><Icon type="home" /><span>Home</span></span>}>
						<Menu.Item key={key++} path="/setup">Setup SP & Community</Menu.Item>
						<Menu.Item key={key++} path="/landing-page-management">Home screen</Menu.Item>
						<Menu.Item key={key++} path="/banner-definition">Banner definition</Menu.Item>
						<Menu.Item key={key++} path="/external-link">External link</Menu.Item>
						<Menu.Item key={key++} path="/community-definition/copy/list">Community copy manager</Menu.Item>
						<Menu.Item key={key++} path="/copy-home-banner">Copy banner</Menu.Item>
					</SubMenu>
					<SubMenu key={getSubKey()} title={<span><Icon type="folder" /><span>Asset</span></span>}>
						<Menu.Item key={key++} path="/assets">List</Menu.Item>
					</SubMenu>
					<SubMenu key={getSubKey()} title={<span><Icon type="desktop" /><span>Channel</span></span>}>
						<Menu.Item key={key++} path="/detail-ingest/tv">Detail ingest</Menu.Item>
						<Menu.Item key={key++} path="/bouquet-order">Bouquet / Order</Menu.Item>
						<Menu.Item key={key++} path="/community-assign	">Community assign</Menu.Item>
						<Menu.Item key={key++} path="/channel-epg-source-management">Epg source managment</Menu.Item>
					</SubMenu>
					{/*<SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>*/}
						{/*<Menu.Item key="5">Option 5</Menu.Item>*/}
						{/*<Menu.Item key="6">Option 6</Menu.Item>*/}
						{/*<SubMenu key="sub3" title="Submenu">*/}
							{/*<Menu.Item key="7">Option 7</Menu.Item>*/}
							{/*<Menu.Item key="8">Option 8</Menu.Item>*/}
						{/*</SubMenu>*/}
					{/*</SubMenu>*/}
				</Menu>
			</Aux>
		);
	}
}

export default withRouter(Navigation);