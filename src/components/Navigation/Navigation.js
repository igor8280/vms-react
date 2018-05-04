import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import {Menu, Icon} from 'antd';
import './Nav.global.css';

const SubMenu = Menu.SubMenu;
const handleClick = (e, props) => {
	console.log(e, props);
};

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
};

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
					<NavLink to="/languages">Languages</NavLink>
				</Menu.Item>

			</SubMenu>

		</Menu>
	);
};

export default withRouter(Navigation);
