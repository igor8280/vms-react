import React from 'react';
import {Menu, Icon} from 'antd';
const SubMenu = Menu.SubMenu;
import { NavLink, withRouter } from 'react-router-dom';
import './nav.global.css';

const handleClick = (e, props) => {
	console.log(e, props);
}

let handleTitleClick = (e) => {
	let subMenu = document.querySelector(`.ant-menu-submenu-title[aria-owns="${e.key}$Menu"]`);
	let sider = document.querySelector('.ant-layout-sider');
	if(subMenu.getAttribute('aria-expanded') == 'false') {
		setTimeout(() => {
			sider.scroll({
				top: subMenu.offsetTop,
				behavior: 'smooth'
			});
		}, 300);
	}
}

const Navigation = (props) => {
	return (
		<Menu
			mode="inline"
			theme="dark"
			style={{ height: '100%' }}
			onClick={(e) => handleClick(e, props)}>

			<SubMenu
				title={<span><Icon type="home" /><span>Home</span></span>}
				onTitleClick={handleTitleClick}>

				<Menu.Item>
					<NavLink to="/countries">Countries</NavLink>
				</Menu.Item>
				<Menu.Item>
					<NavLink to="/setup">Setup SP & Community</NavLink>
				</Menu.Item>
				<Menu.Item>
					<NavLink to="/landing-page-management">Home screen</NavLink>
				</Menu.Item>
				<Menu.Item>
					<NavLink to="/banner-definition">Banner definition</NavLink>
				</Menu.Item>
				<Menu.Item>
					<NavLink to="/external-link">External link</NavLink>
				</Menu.Item>
				<Menu.Item>
					<NavLink to="/community-definition/copy/list">Community copy manager</NavLink>
				</Menu.Item>
				<Menu.Item>
					<NavLink to="/copy-home-banner">Copy banner</NavLink>
				</Menu.Item>

			</SubMenu>

			<SubMenu
				title={<span><Icon type="folder" /><span>Asset</span></span>}
				onTitleClick={handleTitleClick}>

				<Menu.Item>
					<NavLink to="/assets">List</NavLink>
				</Menu.Item>

			</SubMenu>

			<SubMenu
				title={<span><Icon type="desktop" /><span>Channel</span></span>}
				onTitleClick={handleTitleClick}>

				<Menu.Item>
					<NavLink to="/detail-ingest/tv">Detail ingest</NavLink>
				</Menu.Item>
				<Menu.Item>
					<NavLink to="/bouquet-order">Bouquet / Order</NavLink>
				</Menu.Item>
				<Menu.Item>
					<NavLink to="/community-assign">Community assign</NavLink>
				</Menu.Item>
				<Menu.Item>
					<NavLink to="/channel-epg-source-management">Epg source managment</NavLink>
				</Menu.Item>

			</SubMenu>

			{/*<SubMenu title={<span>Link</span>} onTitleClick={handleTitleClick}>*/}

				{/*<Menu.Item >Link {Math.round(Math.random()*50)}</Menu.Item>*/}
				{/*<Menu.Item >Link {Math.round(Math.random()*50)}</Menu.Item>*/}
				{/*<Menu.Item >Link {Math.round(Math.random()*50)}</Menu.Item>*/}
				{/*<Menu.Item >Link {Math.round(Math.random()*50)}</Menu.Item>*/}
				{/*<Menu.Item >Link {Math.round(Math.random()*50)}</Menu.Item>*/}

			{/*</SubMenu>*/}

		</Menu>
	);
}

export default withRouter(Navigation);
