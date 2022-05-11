import React from 'react';

import './layout.css';

import Sidebar from '../sidebar/Sidebar';
import Routes from '../Routes';
import TopNav from '../topnav/TopNav';

import { accessToken } from '../../utils/utils';
import { setLogin } from '../../redux/slice/LoginSlice';

import { Route } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from 'oidc-react';
const Layout = () => {
	const { userData } = useAuth();
	const [token, setToken] = React.useState('');
	const themeReducer = useSelector((state) => state.theme);

	const dispatch = useDispatch();
	React.useEffect(() => {
		setToken(accessToken);
	}, []);
	React.useEffect(() => {
		token
			? dispatch(
					setLogin({
						user: null,
						isLoggedIn: true,
					})
			  )
			: dispatch(setLogin({ user: null, isLoggedIn: false }));
	}, [token, dispatch]);
	return (
		<Route
			render={(props) => (
				<div className={`layout ${themeReducer.mode} ${themeReducer.color}`}>
					<Sidebar {...props} />
					<div className={`layout__content`}>
						<pre
							style={{
								display: 'none',
							}}
						>
							<code>{JSON.stringify(userData, null, 2)}</code>
						</pre>
						<TopNav />
						<div className="layout__content-main">
							<Routes />
						</div>
					</div>
				</div>
			)}
		/>
	);
};
export default Layout;
