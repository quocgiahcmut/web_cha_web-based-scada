import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './redux/store/store';
import 'react-toastify/dist/ReactToastify.css';
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import './assets/css/grid.css';
import './assets/css/index.css';
import './assets/css/theme.css';
import { AuthProvider } from 'oidc-react';
// import { OidcProvider } from '@axa-fr/react-oidc';
import Layout from './components/layout/Layout';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
	Chart,
	Filler,
	ArcElement,
	Tooltip,
	Legend,
	CategoryScale,
	BarElement,
	LinearScale,
	Title,
	LineElement,
	PointElement,
} from 'chart.js';
import Login from './pages/login/Login';
import SignInOidc from './pages/signInOidc/SignInOidc';
import SignOutOidc from './pages/signOutOidc/SignOutOidc';
import { Redirect } from 'react-router-dom';
Chart.defaults.set('plugins.datalabels', {
	color: 'black',
	labels: {
		title: {
			font: {
				weight: 'bold',
			},
		},
		value: {
			font: {
				weight: 'bold',
			},
		},
	},
});

Chart.register(
	ArcElement,
	Tooltip,
	Filler,
	Legend,
	ChartDataLabels,
	CategoryScale,
	BarElement,
	LinearScale,
	Title,
	LineElement,
	PointElement
);
const queryClient = new QueryClient();
const oidcConfig = {
	onSignIn: () => {
		// Redirect?
		console.log('onSignIn');
	},
	authority: 'https://authenticationserver20220111094343.azurewebsites.net',
	clientId: 'react-client',
	redirectUri: 'http://localhost:3000/signin-oidc',
	scope: 'openid profile native-client-scope',
	responseType: 'id_token token',
	postLogoutRedirectUri: 'http://localhost:3000/signout-oidc',
};
ReactDOM.render(
	<React.StrictMode>
		<AuthProvider {...oidcConfig}>
			<QueryClientProvider client={queryClient}>
				<Provider store={store}>
					<BrowserRouter>
						<Switch>
							<Redirect exact from="/" to="/layout/dashboard" />
							<Route path="/login" exact component={Login} />
							<Route path="/signin-oidc" exact component={SignInOidc} />
							<Route path="/signout-oidc" exact component={SignOutOidc} />
							<Route path="/layout" component={Layout} />
						</Switch>
					</BrowserRouter>
				</Provider>
				<ReactQueryDevtools position="bottom-right" initialIsOpen={false} />
			</QueryClientProvider>
		</AuthProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
