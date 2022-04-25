import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { Provider } from 'react-redux';
import store from './redux/store/store';
import 'react-toastify/dist/ReactToastify.css';
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import './assets/css/grid.css';
import './assets/css/index.css';
import './assets/css/theme.css';
// import { OidcProvider } from '@axa-fr/react-oidc-context';
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
// const configuration = {
// 	client_id: 'interactive.public.short',
// 	redirect_uri: 'http://localhost:4200/authentication/callback',
// 	silent_redirect_uri: 'http://localhost:4200/authentication/silent-callback',
// 	scope: 'openid profile email api offline_access',
// 	authority: 'https://demo.identityserver.io',
// 	service_worker_only: false,
// };

ReactDOM.render(
	<React.StrictMode>
		{/* <OidcProvider configuration={configuration}> */}
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<Layout />
			</Provider>
			<ReactQueryDevtools position="bottom-right" initialIsOpen={false} />
		</QueryClientProvider>
		{/* </OidcProvider> */}
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
