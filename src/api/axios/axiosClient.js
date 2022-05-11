import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
	baseURL: `${process.env.REACT_APP_BASE_URL}`,
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': 'http://localhost:3000/',
		'Access-Control-Request-Headers': 'Content-Type',
	},
	withCredentials: false,
	paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use((config) => {
	const token = localStorage.getItem('access_token');
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
