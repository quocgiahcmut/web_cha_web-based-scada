import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from 'oidc-react';
function ProtectedRoute({ children, component: Component, ...rest }) {
	const { userData } = useAuth();

	return userData ? <Route {...rest} component={Component} /> : <Redirect to={'/login'} />;
}

export default ProtectedRoute;
