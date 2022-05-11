import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from 'oidc-react';
function ProtectedRoute({ children, component: Component, ...rest }) {
	const { userData } = useAuth();
	React.useEffect(() => {
		if (userData) {
			if (userData.access_token) localStorage.setItem('access_token', userData.access_token);
		}
	}, [userData]);
	return userData ? <Route {...rest} component={Component} /> : <Redirect to={'/login'} />;
}

export default ProtectedRoute;
