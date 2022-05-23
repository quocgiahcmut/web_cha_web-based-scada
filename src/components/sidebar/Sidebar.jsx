import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import './sidebar.css';

// import logo from '../../assets/images/favicon.png';

import sidebar_items from '../../assets/JsonData/sidebar_routes.json';

import { Link, NavLink } from 'react-router-dom';

import { setActiveMenu } from '../../redux/slice/SideBarSlice';

import { useHistory } from 'react-router-dom';

import { useAuth } from 'oidc-react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Button } from 'reactstrap';

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
	const [open, setOpen] = React.useState(false);
	const { user } = useSelector((state) => state.login);
	const { signOut } = useAuth();
	const history = useHistory();
	const onClick = async () => {
		await signOut();
		setOpen(false);
		history.push('/login');
	};
	const handleClose = () => {
		setOpen((prev) => !prev);
	};
	const sideBarReducer = useSelector((state) => state.sidebar);
	const activeMenu = sideBarReducer.active;
	const dispatch = useDispatch();
	const handleMenuClick = () => {
		dispatch(setActiveMenu(activeMenu === '' ? 'active' : ''));
	};

	const activeItem = sidebar_items.findIndex((item) => {
		if (item.route.includes('/layout/injection/')) {
			return props.location.pathname.includes('/layout/injection/');
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
				<div className="sidebar__logo">{/* <img src={logo} alt="logo cong ty" /> */}</div>
				<div className="sidebar__user">
					<span className="sidebar__user-name">{user.lastName + ' ' + user.firstName}</span>
					<span
						style={{
							fontStyle: 'italic',
						}}
						className="sidebar__user-role"
					>
						{user.roles}
					</span>
					<span
						style={{
							fontStyle: 'italic',
						}}
						className="sidebar__user-id"
					>
						{user.id}
					</span>
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
				<div onClick={handleClose} className="sidebar__item sidebar__item--logout">
					<div className="sidebar__item-flex">
						<div className={` sidebar__item-inner`}>
							<i className="bx bx-log-out"></i>
							<span>Đăng xuất</span>
						</div>
					</div>
				</div>
			</div>
			{activeMenu !== 'active' && <div className="sidebar__obscure-filter" onClick={handleMenuClick}></div>}
			{activeMenu === 'active' ? (
				<button type="button" className="sidebar__btn--inactive" onClick={() => handleMenuClick()}>
					<i className="bx bx-menu"></i>
				</button>
			) : null}
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{'Thông báo'}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">Bạn có chắc muốn đăng xuất?</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={async () => {
							await onClick();
						}}
						autoFocus
						color="primary"
					>
						Đồng ý
					</Button>
					<Button onClick={handleClose} autoFocus>
						Quay lại
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

export default React.memo(Sidebar);
