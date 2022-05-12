import axios from 'axios';
import queryString from 'query-string';
import Cookies from 'js-cookie';

const axiosClient = axios.create({
	baseURL: process.env.REACT_APP_WAREHOUSE_SERVER,
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': 'http://localhost:3000/',
	},
	withCredentials: false,
	paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use((config) => {
	const token = Cookies.get('token');
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

axiosClient.interceptors.response.use(
	(response) => {
		if (response && response.data) {
			return response.data;
		}
		return response;
	},
	(error) => {
		if (error && error.response && error.response.data) {
			return error.response.data;
		}
		return error;
	}
);

export default axiosClient;
