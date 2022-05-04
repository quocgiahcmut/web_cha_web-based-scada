import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { useHistory } from 'react-router-dom';

import './sidebar.css';

import logo from '../../assets/images/favicon.png';

import sidebar_items from '../../assets/JsonData/sidebar_routes.json';

import { Link, NavLink } from 'react-router-dom';

import { setActiveMenu } from '../../redux/slice/SideBarSlice';

const SidebarItem = (props) => {
	const active = props.active ? 'active' : '';
	return (
		<div className="sidebar__item">
			<div className="sidebar__item-flex">
				<Link to={props.route}>
					<div className={` sidebar__item-inner ${active}`}>
						<i className={props.icon}></i>
						<span>{props.title}</span>
					</div>
				</Link>
				{props.subNav.length > 0 && (
					<div className={`sidebar__item--inner-sub`}>
						{props.subNav.map((item, index) => (
							<NavLink className="sidebar__item--sub-container" key={index} to={item.route}>
								<i className={item.icon}></i>
								<span>{item.display_name}</span>
							</NavLink>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

function Sidebar(props) {
	const sideBarReducer = useSelector((state) => state.sidebar);
	const activeMenu = sideBarReducer.active;
	const dispatch = useDispatch();
	const handleMenuClick = () => {
		dispatch(setActiveMenu(activeMenu === '' ? 'active' : ''));
	};

	const activeItem = sidebar_items.findIndex((item) => {
		if (item.route.includes('/injection/')) {
			return props.location.pathname.includes('/injection/');
		} else {
			return item.route === props.location.pathname;
		}
	});

	return (
		<>
			<div className={`sidebar ${activeMenu}`}>
				<button type="button" className="sidebar__btn" onClick={() => handleMenuClick()}>
					<i className="bx bx-x"></i>
				</button>
				<div className="sidebar__logo">
					<img src={logo} alt="logo cong ty" />
				</div>
				{sidebar_items.map((item, index) => {
					const subItem = (
						<SidebarItem
							key={index}
							route={item.route}
							location={props.location.pathname}
							subNav={item.subNav}
							title={item.display_name}
							icon={item.icon}
							active={index === activeItem}
						/>
					);
					return subItem;
				})}
			</div>
			{activeMenu !== 'active' && <div className="sidebar__obscure-filter" onClick={handleMenuClick}></div>}
			{activeMenu === 'active' ? (
				<button type="button" className="sidebar__btn--inactive" onClick={() => handleMenuClick()}>
					<i className="bx bx-menu"></i>
				</button>
			) : null}
		</>
	);
}

export default Sidebar;
