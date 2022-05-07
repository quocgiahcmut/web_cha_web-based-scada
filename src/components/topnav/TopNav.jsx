import React from 'react';

// import Dropdown from '../dropdown/DropDown';

import { NavLink } from 'react-router-dom';

import './topnav.css';

// import notifications from '../../assets/JsonData/notification.json';

// import { Link } from 'react-router-dom';

// import user_image from '../../assets/images/user.jpg';

import data_results from '../../assets/JsonData/sidebar_routes.json';

// import user_menu from '../../assets/JsonData/user_menus.json';

import { useSelector } from 'react-redux';

// const curr_user = {
// 	display_name: 'Tri Hoang',
// 	image: user_image,
// };

// const renderNotificationItem = (item, index) => (
// 	<div className="notification-item" key={index}>
// 		<i className={item.icon}></i>
// 		<span>{item.content}</span>
// 	</div>
// );

// const renderUserToggle = (user) => (
// 	<div className="topnav__right-user">
// 		<div className="topnav__right-user__image">
// 			<img src={curr_user.image} alt="ảnh người dùng" />
// 		</div>
// 		<div className="topnav__right-user__name">{user.display_name}</div>
// 	</div>
// );

// const renderUserMenu = (item, i) => {
// 	return (
// 		<Link to="/" key={i}>
// 			<div className="notification-item">
// 				<i className={item.icon}></i>
// 				<span>{item.content}</span>
// 			</div>
// 		</Link>
// 	);
// };

const Topnav = () => {
	const [filteredData, setFilteredData] = React.useState([]);
	const [wordEntered, setWordEntered] = React.useState('');
	const sideBarReducer = useSelector((state) => state.sidebar);
	const activeMenu = sideBarReducer.active === undefined ? '' : sideBarReducer.active;
	const handleChange = (e) => {
		const searchWord = e.target.value;
		setWordEntered(searchWord);
		const newFilter = data_results.filter((value) => {
			return value.display_name.toLowerCase().includes(searchWord.toLowerCase());
		});

		if (searchWord === '') {
			setFilteredData([]);
		} else {
			setFilteredData(newFilter);
		}
	};

	const clearInput = () => {
		setFilteredData([]);
		setWordEntered('');
	};
	return (
		<div className={`topnav ${activeMenu === '' ? '' : 'active'}`}>
			<div className="topnav__search">
				<div className="topnav__search-input">
					<input value={wordEntered} type="text" placeholder="Tìm kiếm ở đây" onChange={handleChange} />
					<i className="bx bx-search"></i>
				</div>
				{filteredData.length > 0 && (
					<div className="topnav__search-result">
						<div className="topnav__search-result-header">
							<span>Kết quả tìm kiếm</span>
						</div>
						{filteredData.map((item, i) => {
							return (
								<NavLink onClick={clearInput} to={item.route} className="search-result__container">
									<div className="search-result__item">
										<i className={item.icon}></i>
										<span>{item.display_name}</span>
									</div>
								</NavLink>
							);
						})}
					</div>
				)}
			</div>
			<div className="topnav__right">
				<div className="topnav__right-item">
					{/* <Dropdown
						// icon="bx bx-user"
						customToggle={() => renderUserToggle(curr_user)}
						contentData={user_menu}
						renderItems={(item, i) => renderUserMenu(item, i)}
					/> */}
					{/* {drop down here} */}
				</div>
				<div className="topnav__right-item">
					{/* <Dropdown
						icon="bx bx-bell"
						badge="12"
						contentData={notifications}
						renderItems={(item, index) => renderNotificationItem(item, index)}
						renderFooter={() => <Link to="/">View All</Link>}
					/> */}
				</div>
				{/* <div className="topnav__right-item">
					<ThemeMenu />
				</div> */}
			</div>
		</div>
	);
};

export default Topnav;
